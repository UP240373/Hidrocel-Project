
// ============ IMPORTACIONES ============
const express = require("express");
const logger = require('../logger');
const db = require("../db");
const router = express.Router();

// GET /admin = Endpoint para obtener todos los administradores
router.get('/', (req, res) => {
  const query = `SELECT * FROM administrators WHERE is_deleted = 0`;
  db.query(query, (err, admins) => {
    if (err) {
      logger.error("/admin", err, req.ip);
      return res.status(500).json({ success: false, error: "Database error", err });
    }

    logger.getAllAdmins(admins.length, req.ip, req.headers['user-agent']);
    res.status(200).json({ success: true, message: "Get admins successfully", admins });
  });
});

// GET /admin/{id} = Endpoint para obtener un admin por su ID
router.get('/:id', (req, res) => {
  const query = `SELECT * FROM administrators WHERE id_admin = ${req.params.id} AND is_deleted = 0`;

  db.query(query, (err, admin) => {
    if (err) {
      logger.error('GET_ADMIN_BY_ID', err, req.ip);
      return res.status(500).json({ error: "Database error", err });
    }

    if (admin.length === 0) {
      logger.getUserById(req.params.id, false, req.ip, req.headers['user-agent']);
      return res.status(404).json({ error: "The admin doesn't exists" });
    }

    const found = admin.length > 0;
    logger.getAdminById(req.params.id, found, req.ip, req.headers['user-agent']);
    res.status(200).json({ message: "Get admin successfully", admin});
  });
});

// POST /admin = Endpoint para crear un nuevo administrador
router.post('/', (req, res) => {
  const { name, last_name, phone, administrator_type, password } = req.body;

  const filter = `SELECT * FROM administrators WHERE password = "${password}"`;
  db.query(filter, (err, result) => {
    if (err) {
      logger.error('CREATE_ADMIN', err, req.ip);
      return res.status(500).json({ error: "Database error", err });
    }

    if (result.length > 0) {
      logger.getUserById(req.params.id, false, req.ip, req.headers['user-agent']);
      return res.status(409).json({ err: "The user already exists"});
    }

    const query = `INSERT INTO administrators (name, last_name, phone, administrator_type, password, is_deleted) VALUES ("${name}", "${last_name}", "${phone}", "${administrator_type}", "${password}", 0);`;
    db.query(query, (err, user) => {
      if (err) {
        logger.error('CREATE_ADMIN', err, req.ip);
        return res.status(500).json({ error: "Database error", err });
      }

      logger.createAdmin(req.body, req.body.id, req.ip, req.headers['user-agent']);
      res.status(201).json({ message: "The admin has been created successfully" });
    })
  });
});

// PUT /admin/{id} = Endpoint para editar el admin
router.put('/:id', (req, res) => {
  const filter = `SELECT * FROM administrators WHERE password = "${req.body.password}"`;
  db.query(filter, (err, user) => {
    if (err) {
      logger.error('UPDATE_ADMIN', err, req.ip);
      return res.status(500).json({ error: "Database error", err });
    }

    if (user.length > 0) {
      logger.getAdminById(req.params.id, false, req.ip, req.headers['user-agent']);
      return res.status(404).json({ error: "The password already exists" });
    }

    const search = `SELECT * FROM administrators WHERE id_admin = ${req.params.id} AND is_deleted = 0`;
    db.query(search, (err, user) => {
      if (err) {
        logger.error('UPDATE_ADMIN', err, req.ip);
        return res.status(500).json({ error: "Database error", err });
      }

      if (user.length === 0) {
        logger.getAdminById(req.params.id, false, req.ip, req.headers['user-agent']);
        return res.status(404).json({ error: "The admin doesn't exists" });
      }

      const newChanges = req.body;
      const query = `UPDATE administrators SET name = "${newChanges.name}", last_name = "${newChanges.last_name}", phone = "${newChanges.phone}", administrator_type = "${newChanges.administrator_type}", password = "${newChanges.password}" WHERE id_admin = ${req.params.id}`;
      db.query(query, (err, result) => {
        if (err) {
          logger.error('UPDATE_ADMIN', err, req.ip);
          return res.status(500).json({ error: "Database error", err });
        }
        logger.updateAdmin(req.params.id, req.body, req.ip, req.headers['user-agent']);
        res.status(200).json({ message: "The admin has been updated" });
      });

    });
  });
});

// DELETE /admin/{id} = Endpoint para eliminar un administrador
router.delete('/:id', (req, res) => {
  const search = `SELECT * FROM administrators WHERE id_admin = ${req.params.id} AND is_deleted = 0`;
  db.query(search, (err, admin) => {
    if (err) {
      logger.error('DELETE_ADMIN', err, req.ip);
      return res.status(500).json({ error: "Database error", err });
    }

    if (admin.length === 0) {
      logger.getAdminById(req.params.id, false, req.ip, req.headers['user-agent']);
      return res.status(404).json({ error: "The admin doesn't exists" });
    }

    const query = `UPDATE administrators SET is_deleted = 1 WHERE id_admin = ${req.params.id}`;
    db.query(query, (err, result) => {
      if (err) {
        logger.error('DELETE_ADMIN', err, req.ip);
        return res.status(500).json({ error: "Database error", err });
      }
      logger.deleteAdmin(req.params.id, result[0], req.ip, req.headers['user-agent']);
      res.status(200).json({ message: "The admin has been deleted." });
    });
  });
});

module.exports = router;