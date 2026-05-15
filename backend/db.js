// Pedir el uso de MYSQL y generar las variables de entorno
const mysql = require("mysql2");
require('dotenv').config({ quiet: true });

// Crear la conexion a la base de datos
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'db_hidrocel',
  port: process.env.DB_PORT || 3306
});

console.log('📁 Directorio actual:', process.cwd());

// Intentar Conectarse a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('❌ Error conectando a MySQL:', err.message);
    console.log('⚠️ La app funcionará, pero la base de datos no estará disponible');
  } else {
    console.log('✅ Conectado a MySQL');
  }
});

// Exportacion de la conexion a la base de datos
module.exports = connection;