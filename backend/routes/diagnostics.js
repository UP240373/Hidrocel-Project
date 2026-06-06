
// ============ IMPORTACIONES ============
const express = require("express");
const logger = require('../logger');
const db = require("../db");
const router = express.Router();

// GET /diagnostic = Endpoint para obtener todos los diagnosticos
router.get('/', (req, res) => {
  const query = `SELECT * FROM diagnostics WHERE 1`;
  db.query(query, (err, diagnostics) => {
    if (err) {
      logger.error("/diagnostic", err, req.ip);
      return res.status(500).json({ success: false, error: "Database error", err });
    }

    logger.getAllDiagnostics(diagnostics.length, req.ip, req.headers['user-agent']);
    res.status(200).json({ success: true, message: "Get diagnostics successfully", diagnostics });
  });
});

// GET /diagnostic = Endpoint para obtener un diagnostico por su nombre y el del dueño
router.get('/query', (req, res) => {
  const query = `SELECT * FROM diagnostics WHERE device = "${req.query.device}" AND customer_name = "${req.query.customer_name}"`;

  db.query(query, (err, diagnostic) => {
    if (err) {
      logger.error('GET_DIAGNOSTIC_BY_DEVICE', err, req.ip);
      return res.status(500).json({ error: "Database error", err });
    }

    if (diagnostic.length === 0) {
      logger.getUserByDevice(req.params.device, false, req.ip, req.headers['user-agent']);
      return res.status(404).json({ error: "The diagnostic doesn't exists" });
    }

    const found = diagnostic.length > 0;
    logger.getDiagnosticByDevice(req.params.device, found, req.ip, req.headers['user-agent']);
    res.status(200).json({ message: "Get diagnostic successfully", diagnostic });
  });
});

// POST /diagnostic = Endpoint para crear un nuevo diagnostico
router.post('/', (req, res) => {
  const { device, device_brand, device_color, device_type, customer_name, contact_phone, device_password, first_payment, previous_diagnosis, technical_diagnosis, estimated_price, delivery_date, made_by } = req.body;

  const filter = `SELECT * FROM diagnostics WHERE device = "${device}" AND customer_name = "${customer_name}"`;
  db.query(filter, (err, result) => {
    if (err) {
      logger.error('CREATE_DIAGNOSTIC', err, req.ip);
      return res.status(500).json({ error: "Database error", err });
    }

    if (result.length > 0) {
      logger.getDiagnosticByDevice(req.params.device, false, req.ip, req.headers['user-agent']);
      return res.status(409).json({ err: "The diagnostic already exists"});
    }

    const query = `INSERT INTO diagnostics (device, device_brand, device_color, device_type, customer_name, contact_phone, device_password, first_payment, previous_diagnosis, technical_diagnosis, estimated_price, delivery_date, made_by) VALUES ("${device}", "${device_brand}", "${device_color}", "${device_type}", "${customer_name}", "${contact_phone}", "${device_password}", "${first_payment}", "${previous_diagnosis}", "${technical_diagnosis}", "${estimated_price}", STR_TO_DATE('${delivery_date}', '%Y-%m-%d %H:%i'), "${made_by}");`;
    db.query(query, (err, diagnostic) => {
      if (err) {
        logger.error('CREATE_DIAGNOSTIC', err, req.ip);
        return res.status(500).json({ error: "Database error", err });
      }

      logger.createDiagnostic(req.body, req.body.device, req.ip, req.headers['user-agent']);
      res.status(201).json({ message: "The diagnostic has been created successfully" });
    })
  });
});

// PUT /diagnostic = Endpoint para editar el diagnostico
router.put('/', (req, res) => {
  const filter = `SELECT * FROM diagnostics WHERE device = '${req.query.device}' AND customer_name = '${req.query.customer_name}'`;
  db.query(filter, (err, diagnostic) => {
    if (err) {
      logger.error('UPDATE_DIAGNOSTIC', err, req.ip);
      return res.status(500).json({ error: "Database error", err });
    }

    if (diagnostic.length > 1) {
      logger.getDiagnosticByDevice(req.params.device, false, req.ip, req.headers['user-agent']);
      return res.status(404).json({ error: "The diagnostic already exists" });
    }

    const search = `SELECT * FROM diagnostics WHERE device = "${req.query.device}" AND customer_name = "${req.query.customer_name}"`;
    db.query(search, (err, diagnostic) => {
      if (err) {
        logger.error('UPDATE_DIAGNOSTIC', err, req.ip);
        return res.status(500).json({ error: "Database error", err });
      }

      if (diagnostic.length === 0) {
        logger.getDiagnosticByDevice(req.params.device, false, req.ip, req.headers['user-agent']);
        return res.status(404).json({ error: "The diagnostic doesn't exists" });
      }

      const newChanges = req.body;
      const query = `UPDATE diagnostics SET device = "${newChanges.device}", device_brand = "${newChanges.device_brand}", device_color = "${newChanges.device_color}", device_type = "${newChanges.device_type}", customer_name = "${newChanges.customer_name}", contact_phone = "${newChanges.contact_phone}", device_password = "${newChanges.device_password}", first_payment = ${newChanges.first_payment}, previous_diagnosis = "${newChanges.previous_diagnosis}", technical_diagnosis = "${newChanges.technical_diagnosis}", estimated_price = ${newChanges.estimated_price}, delivery_date = STR_TO_DATE('${newChanges.delivery_date}', '%Y-%m-%d %H:%i'), made_by = ${newChanges.made_by} WHERE device = "${req.query.device}" AND customer_name = "${req.query.customer_name}"`;
      db.query(query, (err, result) => {
        if (err) {
          logger.error('UPDATE_DIAGNOSTIC', err, req.ip);
          return res.status(500).json({ error: "Database error", err });
        }
        logger.updateDiagnostic(req.params.device, req.body, req.ip, req.headers['user-agent']);
        res.status(200).json({ message: "The device has been updated" });
      });

    });
  });
});

// DELETE /diagnostic = Endpoint para eliminar un diagnostico
router.delete('/', (req, res) => {
  const search = `SELECT * FROM diagnostics WHERE device = "${req.query.device}" AND customer_name = "${req.query.customer_name}"`;
  db.query(search, (err, diagnostic) => {
    if (err) {
      logger.error('DELETE_DIAGNOSTIC', err, req.ip);
      return res.status(500).json({ error: "Database error", err });
    }

    if (diagnostic.length === 0) {
      logger.getDiagnosticByDevice(req.params.device, false, req.ip, req.headers['user-agent']);
      return res.status(404).json({ error: "The diagnostic doesn't exists" });
    }

    const query = `DELETE FROM diagnostics WHERE device = "${req.query.device}" AND customer_name = "${req.query.customer_name}"`;
    db.query(query, (err, result) => {
      if (err) {
        logger.error('DELETE_DIAGNOSTICS', err, req.ip);
        return res.status(500).json({ error: "Database error", err });
      }
      logger.deleteDiagnostic(req.params.device, result[0], req.ip, req.headers['user-agent']);
      res.status(200).json({ message: "The diagnostic has been deleted." });
    });
  });
});

module.exports = router;