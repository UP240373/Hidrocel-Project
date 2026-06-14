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

  /* =========== Admins log =========== */

  getAllAdmins: (usersCount, ip, userAgent) => {
    writeLog('admins_get_all', {
      action: 'GET_ALL_ADMINS',
      usersCount,
      ip,
      userAgent
    });
  },

  getAdminById: (adminId, found, ip, userAgent) => {
    writeLog('admins_get_by_id', {
      action: 'GET_ADMINS_BY_ID',
      adminId,
      found, // true/false
      ip,
      userAgent
    });
  },

  createAdmin: (userData, newUserId, ip, userAgent) => {
    // No guardar contraseña en logs
    const { password, ...safeUserData } = userData;
    writeLog('users_create', {
      action: 'CREATE_USER',
      userData: safeUserData,
      newUserId,
      ip,
      userAgent
    });
  },

  updateAdmin: (adminId, updatedData, ip, userAgent) => {
    // No guardar contraseña en logs
    const { password, ...safeData } = updatedData;
    writeLog('admins_update', {
      action: 'UPDATE_ADMIN',
      adminId,
      updatedData: safeData,
      ip,
      userAgent
    });
  },

  deleteAdmin: (adminId, deletedAdminData, ip, userAgent) => {
    writeLog('admins_delete', {
      action: 'DELETE_ADMIN',
      adminId,
      deletedAdminData: {
        id: deletedAdminData?.id,
        name: deletedAdminData?.name,
        administrator_type: deletedAdminData?.administrator_type
      },
      ip,
      userAgent
    });
  },

  /* =========== Repairs log =========== */

  getAllRepairs: (repairsCount, ip, userAgent) => {
    writeLog('repairs_get_all', {
      action: 'GET_ALL_REPAIRS',
      repairsCount,
      ip,
      userAgent
    });
  },

  getRepairById: (repairId, found, ip, userAgent) => {
    writeLog('repair_get_by_id', {
      action: 'GET_REPAIRS_BY_ID',
      repairId,
      found, // true/false
      ip,
      userAgent
    });
  },

  createRepair: (repairData, newRepairId, ip, userAgent) => {
    // No guardar contraseña en logs
    const { password, ...safeUserData } = repairData;
    writeLog('repairs_create', {
      action: 'CREATE_REPAIR',
      repairData: safeUserData,
      newRepairId,
      ip,
      userAgent
    });
  },

  updateRepair: (repairId, updatedData, ip, userAgent) => {
    // No guardar contraseña en logs
    const { password, ...safeData } = updatedData;
    writeLog('repairs_update', {
      action: 'UPDATE_REPAIR',
      repairId,
      updatedData: safeData,
      ip,
      userAgent
    });
  },

  deleteRepair: (repairId, deletedRepairData, ip, userAgent) => {
    writeLog('repairs_delete', {
      action: 'DELETE_REPAIR',
      repairId,
      deletedRepairData: {
        id: deletedRepairData?.id,
        name: deletedRepairData?.name,
        administrator_type: deletedRepairData?.administrator_type
      },
      ip,
      userAgent
    });
  },

  /* =========== Diagnostics log =========== */

  getAllDiagnostics: (diagnosticsCount, ip, userAgent) => {
    writeLog('diagnostics_get_all', {
      action: 'GET_ALL_DIAGNOSTICS',
      diagnosticsCount,
      ip,
      userAgent
    });
  },

  getDiagnosticByDevice: (diagnosticDevice, found, ip, userAgent) => {
    writeLog('diagnostic_get_by_device', {
      action: 'GET_DIAGNOSTIC_BY_DEVICE',
      diagnosticDevice,
      found, // true/false
      ip,
      userAgent
    });
  },

  createDiagnostic: (diagnosticData, newDiagnosticDevice, ip, userAgent) => {
    // No guardar contraseña en logs
    const { password, ...safeUserData } = diagnosticData;
    writeLog('diagnostics_create', {
      action: 'CREATE_DIAGNOSTIC',
      diagnosticData: safeUserData,
      newDiagnosticDevice,
      ip,
      userAgent
    });
  },

  updateDiagnostic: (diagnosticDevice, updatedData, ip, userAgent) => {
    // No guardar contraseña en logs
    const { password, ...safeData } = updatedData;
    writeLog('diagnostics_update', {
      action: 'UPDATE_DIAGNOSTIC',
      diagnosticDevice,
      updatedData: safeData,
      ip,
      userAgent
    });
  },

  deleteDiagnostic: (diagnosticDevice, deletedDiagnosticData, ip, userAgent) => {
    writeLog('diagnostics_delete', {
      action: 'DELETE_DIAGNOSTIC',
      diagnosticDevice,
      deletedDiagnosticData: {
        device: deletedDiagnosticData?.device,
        customerName: deletedDiagnosticData?.customerName,
        deliveryDate: deletedDiagnosticData?.delivery_date
      },
      ip,
      userAgent
    });
  },

  /* =========== Quotes log =========== */

  getAllQuotes: (quotesCount, ip, userAgent) => {
    writeLog('quotes_get_all', {
      action: 'GET_ALL_QUOTES',
      quotesCount,
      ip,
      userAgent
    });
  },

  getQuoteById: (quoteId, found, ip, userAgent) => {
    writeLog('quote_get_by_id', {
      action: 'GET_QUOTE_BY_ID',
      quoteId,
      found, // true/false
      ip,
      userAgent
    });
  },

  createQuote: (quoteData, newQuoteId, ip, userAgent) => {
    // No guardar contraseña en logs
    const { password, ...safeUserData } = quoteData;
    writeLog('quotes_create', {
      action: 'CREATE_QUOTE',
      quoteData: safeUserData,
      newQuoteId,
      ip,
      userAgent
    });
  },

  updateQuote: (quoteId, updatedData, ip, userAgent) => {
    // No guardar contraseña en logs
    const { password, ...safeData } = updatedData;
    writeLog('quotes_update', {
      action: 'UPDATE_QUOTE',
      quoteId,
      updatedData: safeData,
      ip,
      userAgent
    });
  },

  deleteQuote: (quoteId, deletedQuoteData, ip, userAgent) => {
    writeLog('quotes_delete', {
      action: 'DELETE_QUOTES',
      quoteId,
      deletedQuoteData: {
        id: deletedQuoteData?.id_quote,
        customerName: deletedQuoteData?.customerName,
        deliveryDate: deletedQuoteData?.delivery_date
      },
      ip,
      userAgent
    });
  },

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