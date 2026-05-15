// backend/logger.js
const fs = require('fs');
const path = require('path');

// Detectar si está ejecutándose desde un ejecutable pkg
const isPkg = typeof process.pkg !== 'undefined';

// Definir ruta base para logs
let logsDir;
if (isPkg) {
  // Cuando está empaquetado, usar la carpeta actual o temporal
  // Opción 1: En la misma carpeta del .exe
  logsDir = path.join(process.cwd(), 'logs');
    
  // Opción 2: En la carpeta temporal de Windows (descomentar si prefieres)
  // logsDir = path.join(process.env.TEMP || process.env.TMP, 'hidrocel-logs');
} else {
  // En desarrollo, usar la ruta relativa al backend
  logsDir = path.join(__dirname, 'logs');
}

// Crear directorio de logs si no existe
try {
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
    console.log(`Directorio de logs creado en: ${logsDir}`);
  }
} catch (err) {
  console.error(`No se pudo crear directorio de logs: ${err.message}`);
  console.log(`Los logs se mostrarán solo en consola`);
}

const writeLog = (type, data) => {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const logFile = path.join(logsDir, `${type}-${dateStr}.log`);
    
  const logEntry = {
    timestamp: now.toISOString(),
    ...data
  };

  // Intentar escribir en archivo, si falla solo mostrar en consola
  try {
    fs.appendFile(logFile, JSON.stringify(logEntry) + '\n', (err) => {
      if (err) {
        console.error('Error writing log file:', err.message);
        console.log('Log entry (console):', logEntry);
      }
        });
  } catch (err) {
    console.error('Error writing log:', err.message);
    console.log('Log entry (console):', logEntry);
  }
};

const logger = {
  // Error general
  error: (endpoint, error, ip) => {
    writeLog('users_error', {
      action: 'ERROR',
      endpoint,
      error: error.message || String(error),
      ip,
      isPkg: isPkg // Para depuración
    });
  },

  // Método adicional para logs de info
  info: (message, data) => {
    writeLog('info', {
      action: 'INFO',
      message,
      ...data
    });
  }
};

module.exports = logger;