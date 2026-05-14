// backend/logger.js
const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const writeLog = (type, data) => {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const logFile = path.join(logsDir, `${type}-${dateStr}.log`);
  
  const logEntry = {
    timestamp: now.toISOString(),
    ...data
  };
  
  fs.appendFile(logFile, JSON.stringify(logEntry) + '\n', (err) => {
    if (err) console.error('Error writing log:', err);
  });
};

const logger = {
  // Error general
  error: (endpoint, error, ip) => {
    writeLog('users_error', {
      action: 'ERROR',
      endpoint,
      error: error.message,
      ip
    });
  }
};

module.exports = logger;