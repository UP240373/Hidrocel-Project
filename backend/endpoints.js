
// ============ IMPORTACIONES ============
const express = require("express");
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const logger = require('./logger');
const db = require("./db");
require('dotenv').config();  // Cargar variables de entorno

// Importanciones de ENDPOINTS
const authEndpoints = require('./routes/auth');
const adminsEndpoints = require('./routes/admins');
const repairsEndpoints = require('./routes/repairs');
const diagnosticsEndpoints = require('./routes/diagnostics');

// ============ CONFIGURACIÓN ============
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}));


// ============ ENDPOINTS API ============

// GET /api/test = Endpoint para testear la conexion a la API
app.get('/api/test', (req, res) => {
  logger.info("Se hizo una prueba", {
    endpoint: '/api/test',
    method: req.method,
    ip: req.ip,
    timestamp: new Date().toISOString()
  });
  res.status(200).json({ success: "true", message: "API funcionando" });
});

// Endpoints para admins
app.use('/admin', adminsEndpoints);
app.use('/auth', authEndpoints);
app.use('/repair', repairsEndpoints);
app.use('/diagnostic', diagnosticsEndpoints);

// ============ SERVIDOR NEXT.JS ============
// Servir archivos estáticos de Next.js
const nextStaticPath = path.join(__dirname, '../frontend/.next/static');
if (fs.existsSync(nextStaticPath)) {
  app.use('/_next/static', express.static(nextStaticPath));
  console.log('✅ Sirviendo estáticos de Next.js desde:', nextStaticPath);
} else {
  console.log('⚠️ No se encontró la carpeta de estáticos:', nextStaticPath);
}

// Servir archivos públicos
const publicPath = path.join(__dirname, '../frontend/public');
if (fs.existsSync(publicPath)) {
  app.use(express.static(publicPath));
}

// Función para servir archivos HTML
function serveHtmlFile(res, filePath, contentType = 'text/html') {
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', contentType);
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
    stream.on('error', (err) => {
      console.error('Error al leer archivo:', err);
      res.status(500).send('Error al leer el archivo');
    });
  return true;
  }
  return false;
}

// Middleware para manejar las rutas de Next.js
app.use((req, res, next) => {
  // Manejar archivos estáticos (favicon, imágenes, etc)
  if (req.path.match(/\.(ico|png|jpg|jpeg|gif|svg|css|js|json)$/)) {
    return next();
  } 
    
  // No interferir con rutas API o archivos estáticos de Next.js
  if (req.path.startsWith('/api') || req.path.startsWith('/_next')) {
    return next();
  }
    
  console.log(`📄 Solicitando: ${req.path}`);
    
  // Limpiar la ruta
  let cleanPath = req.path === '/' ? '' : req.path.replace(/^\//, '');
    
  // Posibles rutas del archivo
  const possiblePaths = [
    path.join(__dirname, '../frontend/.next/server/app', cleanPath, 'page.html'),
    path.join(__dirname, '../frontend/.next/server/app', `${cleanPath}.html`),
    path.join(__dirname, '../frontend/.next/server/app/index.html')
    ];
    
  let served = false;
  for (const htmlPath of possiblePaths) {
    if (fs.existsSync(htmlPath)) {
      console.log(`✅ Sirviendo: ${req.path}`);
      serveHtmlFile(res, htmlPath);
      served = true;
      break;
    }
  }
    
  if (!served) {
    const indexPath = path.join(__dirname, '../frontend/.next/server/app/index.html');
    if (fs.existsSync(indexPath)) {
      console.log(`🔄 Fallback a index.html`);
      serveHtmlFile(res, indexPath);
    } else {
      res.status(404).send(`
        <html>
        <body style="font-family: Arial; padding: 20px;">
          <h1>🔍 Página no encontrada</h1>
          <p>Next.js no está compilado correctamente.</p>
          <p>Ejecuta en la carpeta frontend: <code>npm run build</code></p>
        </body>
        </html>
      `);
    }
  }
});

// ============ INICIAR SERVIDOR ============
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📦 Modo: ${typeof process.pkg !== 'undefined' ? 'Empaquetado (EXE)' : 'Desarrollo'}`);
});
