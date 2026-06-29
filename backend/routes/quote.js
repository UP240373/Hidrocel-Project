
// ============ IMPORTACIONES ============
const express = require("express");
const logger = require('../logger');
const db = require("../db");
const router = express.Router();

// GET /quote = Endpoint para obtener todas las cotizaciones
router.get('/', (req, res) => {
  //const query = `SELECT q.id_quote, q.device, q.device_brand, q.device_color, q.device_type, q.customer_name, q.contact_phone, q.device_password, q.first_payment, q.previous_diagnosis, q.technical_diagnosis, SUM(r.labor_costs) AS labor_costs, q.piece_cost, (SUM(r.labor_costs) + q.piece_cost) AS final_price, (SUM(r.labor_costs) + q.piece_cost) - q.first_payment AS remaining_money, q.payment_method, q.status, q.delivery_date, q.made_by, TRIM(TRAILING ', ' FROM REPLACE(GROUP_CONCAT(r.name, ", "), ", ,", ", ")) AS repairs FROM quotes q LEFT JOIN quote_repairs qr ON q.id_quote = qr.id_quote RIGHT JOIN repairs r ON qr.id_repair = r.id_repair WHERE qr.id_quote IS NOT NULL AND qr.id_repair IS NOT NULL AND r.name != '' AND q.is_deleted = 0 GROUP BY q.id_quote`;
  const query = `SELECT * FROM quotes WHERE is_deleted = 0`;
  db.query(query, (err, quotes) => {
    if (err) {
      logger.error("/quotes", err, req.ip);
      return res.status(500).json({ success: false, error: "Database error", err });
    }

    logger.getAllQuotes(quotes.length, req.ip, req.headers['user-agent']);
    res.status(200).json({ success: true, message: "Get quotes successfully", quotes });
  });
});

// GET /quote/{id} = Endpoint para obtener una cotizacion por su ID
router.get('/:id', (req, res) => {
  const query = `SELECT * FROM quotes WHERE id_quote = ${req.params.id} AND is_deleted = 0`;

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

// POST /quote = Endpoint para crear una nueva cotizacion
router.post('/', (req, res) => {
  const { device, device_brand, device_color, device_type, customer_name, contact_phone, device_password, first_payment, previous_diagnosis, technical_diagnosis, repair_cost, piece_cost, final_price, remaining_money, payment_method, status, past_days, made_by, repairs } = req.body;

  const filter = `SELECT * FROM quotes WHERE device = "${device}" AND customer_name = "${customer_name}"`;
  db.query(filter, (err, result) => {
    if (err) {
      logger.error('CREATE_QUOTE', err, req.ip);
      return res.status(500).json({ error: "Database error", err });
    }

    if (result.length > 0) {
      logger.getQuoteById(req.params.id, false, req.ip, req.headers['user-agent']);
      return res.status(409).json({ err: "The quote already exists"});
    }

    const query = `INSERT INTO quotes (device, device_brand, device_color, device_type, customer_name, contact_phone, device_password, first_payment, previous_diagnosis, technical_diagnosis, repair_cost, piece_cost, final_price, remaining_money, payment_method, status, delivery_date, made_by, is_deleted) VALUES ("${device}", "${device_brand}", "${device_color}", "${device_type}", "${customer_name}", ${contact_phone}, "${device_password}", ${first_payment}, "${previous_diagnosis}", "${technical_diagnosis}", ${repair_cost}, ${piece_cost}, ${final_price}, ${remaining_money}, "${payment_method}", "${status}", STR_TO_DATE((DATE_ADD(NOW(), INTERVAL ${past_days} DAY)), '%Y-%m-%d %H:%i'), ${made_by}, 0);`;
    db.query(query, (err, quote) => {
      if (err) {
        logger.error('CREATE_ADMIN', err, req.ip);
        return res.status(500).json({ error: "Database error", err });
      }

      const search = `SELECT * FROM quotes WHERE device = "${device}" AND customer_name = "${customer_name}"`;
      db.query(search, (err, result) => {
        for (let i = 0; i < req.body.repairs.length; i++) {
          db.query(`INSERT INTO quote_repairs (id_quote, id_repair, piece_cost) VALUES (${result[0].id_quote}, ${req.body.repairs[i].id_repair}, ${req.body.repairs[i].piece_cost})`, (err, result) => {});
        }
      });

      const queryDelete = `DELETE FROM diagnostics WHERE device = "${device}" AND customer_name = "${customer_name}"`;
      db.query(queryDelete, (err, result) => {});

      const find = `SELECT * FROM quotes WHERE device = "${device}" AND customer_name = "${customer_name}"`;
      db.query(find, (err, quoteFind) => {
        logger.createQuote(req.body, req.body.id, req.ip, req.headers['user-agent']);
        res.status(201).json({ message: "The quote has been created successfully", id_quote: quoteFind[0].id_quote });
      });
    })
  });
});

// PUT /quote/{id} = Endpoint para editar la cotizacion
router.put('/:id', (req, res) => {
  const search = `SELECT * FROM administrators WHERE id_admin = ${req.params.id} AND is_deleted = 0`;
  db.query(search, (err, quote) => {
    if (err) {
      logger.error('UPDATE_QUOTE', err, req.ip);
      return res.status(500).json({ error: "Database error", err });
    }

    if (quote.length === 0) {
      logger.getQuoteById(req.params.id, false, req.ip, req.headers['user-agent']);
      return res.status(404).json({ error: "The quote doesn't exists" });
    }

    const newChanges = req.body;
    const query = `UPDATE quotes SET first_payment = ${newChanges.first_payment}, technical_diagnosis = "${newChanges.technical_diagnosis}" WHERE id_quote = ${req.params.id}`;
    db.query(query, (err, result) => {
      if (err) {
        logger.error('UPDATE_QUOTE', err, req.ip);
        return res.status(500).json({ error: "Database error", err });
      }
      logger.updateQuote(req.params.id, req.body, req.ip, req.headers['user-agent']);
      res.status(200).json({ message: "The quote has been updated" });
    });
  });
});

module.exports = router;