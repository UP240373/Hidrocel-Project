
// ============ IMPORTACIONES ============
const express = require("express");
const logger = require('../logger');
const db = require("../db");
const router = express.Router();

// GET /history = Endpoint para obtener todas las cotizaciones
router.get('/', (req, res) => {
  const query = `SELECT * FROM history_quotes WHERE is_deleted = 0`;
  db.query(query, (err, quotes) => {
    if (err) {
      logger.error("/history", err, req.ip);
      return res.status(500).json({ success: false, error: "Database error", err });
    }

    logger.getAllQuotes(quotes.length, req.ip, req.headers['user-agent']);
    res.status(200).json({ success: true, message: "Get quotes successfully", quotes });
  });
});

// GET /history/{id} = Endpoint para obtener una cotizacion por su ID
router.get('/:id', (req, res) => {
  const query = `SELECT * FROM history_quotes WHERE id_quote = ${req.params.id} AND is_deleted = 0`;

  db.query(query, (err, quote) => {
    if (err) {
      logger.error('GET_QUOTE_BY_ID', err, req.ip);
      return res.status(500).json({ error: "Database error", err });
    }

    if (quote.length === 0) {
      logger.getQuoteById(req.params.id, false, req.ip, req.headers['user-agent']);
      return res.status(404).json({ error: "The quote doesn't exists" });
    }

    db.query(`SELECT id_repair FROM quote_repairs WHERE id_quote = ${quote[0].id_quote}`, (err, repair) => { 
      const repairs = [];
      for(let i = 0; i < repair.length; i++) { 
        repairs.push(repair[i].id_repair); 
      } 

      const found = quote.length > 0;
      logger.getQuoteById(req.params.id, found, req.ip, req.headers['user-agent']);
      res.status(200).json({ message: "Get quote successfully", quote, repairs });
    });
  });
});

// POST /history = Endpoint para guardar la cotizacion en el historial
router.post('/', (req, res) => {
  const { id_quote, device, device_brand, device_color, device_type, customer_name, contact_phone, first_payment, previous_diagnosis, technical_diagnosis, repairs, repair_cost, piece_cost, final_price, is_paid, payment_method, status } = req.body;

  const filter = `SELECT * FROM history_quotes WHERE (device = "${device}" AND customer_name = "${customer_name}") OR id_quote = ${id_quote}`;
  db.query(filter, (err, result) => {
    if (err) {
      logger.error('CREATE_QUOTE', err, req.ip);
      return res.status(500).json({ error: "Database error", err });
    }

    if (result.length > 0) {
      logger.getQuoteById(req.params.id, false, req.ip, req.headers['user-agent']);
      return res.status(409).json({ err: "The quote already exists"});
    }

    const query = `INSERT INTO history_quotes (id_quote, device, device_brand, device_color, device_type, customer_name, contact_phone, first_payment, previous_diagnosis, technical_diagnosis, repairs, repair_cost, piece_cost, final_price, is_paid, payment_method, status, delivery_date, is_deleted) VALUES (${id_quote}, "${device}", "${device_brand}", "${device_color}", "${device_type}", "${customer_name}", ${contact_phone}, ${first_payment}, "${previous_diagnosis}", "${technical_diagnosis}", "${repairs}", ${repair_cost}, ${piece_cost}, ${final_price}, ${is_paid}, "${payment_method}", "${status}", STR_TO_DATE(NOW(), '%Y-%m-%d %H:%i'), 0);`;
    db.query(query, (err, quote) => {
      if (err) {
        logger.error('CREATE_ADMIN', err, req.ip);
        return res.status(500).json({ error: "Database error", err });
      }

      const queryDelete = `DELETE FROM quotes WHERE id_quote = ${id_quote}`;
      db.query(queryDelete, (err, result) => {});

      logger.createQuote(req.body, req.body.id, req.ip, req.headers['user-agent']);
      res.status(201).json({ message: "The quote has been created successfully" });
    })
  });
});

module.exports = router;