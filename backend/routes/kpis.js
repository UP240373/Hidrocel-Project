
// ============ IMPORTACIONES ============
const express = require("express");
const logger = require('../logger');
const db = require("../db");
const router = express.Router();

// GET /kpi/employee = Endpoint para obtener los mejores empleados
router.get('/employee', (req, res) => {
  const query = `SELECT a.name, a.last_name, SUM(q.final_price) AS Dinero_generado FROM administrators a JOIN quotes q ON a.id_admin = q.made_by WHERE q.is_deleted = 0 AND q.status != 'cancelado' GROUP BY a.id_admin ORDER BY Dinero_generado DESC`;
  db.query(query, (err, employees) => {
    if (err) {
      logger.error("/kpi/employee", err, req.ip);
      return res.status(500).json({ success: false, error: "Database error", err });
    }

    res.status(200).json({ success: true, message: "Get employees successfully", employees });
  });
});

// GET /kpi/service = Endpoint para obtener los tipos de servicios mas realizados
router.get('/service', (req, res) => {
  const query = `SELECT r.type_of_service, COUNT(qr.id_quote) AS Realizado FROM repairs r JOIN quote_repairs qr ON r.id_repair = qr.id_repair JOIN quotes q ON qr.id_quote = q.id_quote WHERE r.is_deleted = 0 AND q.is_deleted = 0 GROUP BY r.type_of_service ORDER BY Realizado DESC`;
  db.query(query, (err, services) => {
    if (err) {
      logger.error("/kpi/service", err, req.ip);
      return res.status(500).json({ success: false, error: "Database error", err });
    }

    res.status(200).json({ success: true, message: "Get services successfully", services });
  });
});

// GET /kpi/client = Endpoint para obtener los clientes con mayor adeudo
router.get('/client', (req, res) => {
  const query = `SELECT customer_name, final_price, first_payment, remaining_money FROM quotes WHERE is_deleted = 0 AND status = 'pendiente' AND remaining_money > 0 ORDER BY remaining_money DESC`;
  db.query(query, (err, clients) => {
    if (err) {
      logger.error("/kpi/client", err, req.ip);
      return res.status(500).json({ success: false, error: "Database error", err });
    }

    res.status(200).json({ success: true, message: "Get clients successfully", clients });
  });
});

// GET /kpi/brand = Endpoint para obtener las marcas mas frecuentes
router.get('/brand', (req, res) => {
  const query = `SELECT q.device_brand, COUNT(q.id_quote) AS total_repairs FROM quotes q WHERE q.is_deleted = 0 GROUP BY q.device_brand ORDER BY total_repairs DESC`;
  db.query(query, (err, brands) => {
    if (err) {
      logger.error("/kpi/brand", err, req.ip);
      return res.status(500).json({ success: false, error: "Database error", err });
    }

    res.status(200).json({ success: true, message: "Get brands successfully", brands });
  });
});

module.exports = router;