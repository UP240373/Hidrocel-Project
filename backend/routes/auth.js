
// ============ IMPORTACIONES ============
const express = require("express");
const logger = require('../logger');
const db = require("../db");
const router = express.Router();

// POST /auth = Endpoint para verificar que es un administrador o gerente
router.post('/', (req, res) => {
  const search = `SELECT * FROM administrators WHERE password = "${req.body.password}" AND is_deleted = 0`;
  db.query(search, (err, admin) => {
    if (err) {
      logger.error("/auth", err, req.ip);
      return res.status(500).json({ success: false, error: "Database error", err });
    }

    if (admin.length === 0) {
      logger.getAdminById(req.params.id, false, req.ip, req.headers['user-agent']);
      return res.status(404).json({ error: "The user doesn't exists" });
    }

    logger.getAdminById(admin.length, req.ip, req.headers['user-agent']);
    res.status(200).json({ success: true, message: "Get user successfully", admin });
  });
});

// POST /auth/admin = Endpoint para verificar que es un administrador
router.post('/admin', (req, res) => {
  const search = `SELECT * FROM administrators WHERE password = "${req.body.password}" AND administrator_type = "Admin" AND is_deleted = 0`;
  db.query(search, (err, admin) => {
    if (err) {
      logger.error("/auth/admin", err, req.ip);
      return res.status(500).json({ success: false, error: "Database error", err });
    }

    if (admin.length === 0) {
      logger.getAdminById(req.params.id, false, req.ip, req.headers['user-agent']);
      return res.status(404).json({ error: "The admin doesn't exists" });
    }

    logger.getAdminById(admin.length, req.ip, req.headers['user-agent']);
    res.status(200).json({ success: true, message: "Get admin successfully", admin });
  });
});

module.exports = router;