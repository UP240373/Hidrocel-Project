
// ============ IMPORTACIONES ============
const express = require("express");
const logger = require('../logger');
const db = require("../db");
const router = express.Router();

// GET /repair = Endpoint para obtener todos los tipos de reparaciones que se realizan
router.get('/', (req, res) => {
  const query = `SELECT * FROM repairs WHERE is_deleted = 0`;
  db.query(query, (err, repairs) => {
    if (err) {
      logger.error("/repair", err, req.ip);
      return res.status(500).json({ success: false, error: "Database error", err });
    }

    logger.getAllRepairs(repairs.length, req.ip, req.headers['user-agent']);
    res.status(200).json({ success: true, message: "Get repairs successfully", repairs });
  });
});

// GET /repair/{id} = Endpoint para obtener un tipo de reparacion por su ID
router.get('/:id', (req, res) => {
  const query = `SELECT * FROM repairs WHERE id_repair = ${req.params.id} AND is_deleted = 0`;

  db.query(query, (err, repair) => {
    if (err) {
      logger.error('GET_REPAIR_BY_ID', err, req.ip);
      return res.status(500).json({ error: "Database error", err });
    }

    if (repair.length === 0) {
      logger.getRepairById(req.params.id, false, req.ip, req.headers['user-agent']);
      return res.status(404).json({ error: "The repair doesn't exists" });
    }

    const found = repair.length > 0;
    logger.getRepairById(req.params.id, found, req.ip, req.headers['user-agent']);
    res.status(200).json({ message: "Get repair successfully", repair });
  });
});

// POST /repair = Endpoint para crear un nuevo tipo de reparaciones
router.post('/', (req, res) => {
  const { name, device, material, tools, description, type_of_service, labor_costs, approximate_time } = req.body;

  const filter = `SELECT * FROM repairs WHERE name = "${name}" AND device = "${device}"`;
  db.query(filter, (err, result) => {
    if (err) {
      logger.error('CREATE_REPAIR', err, req.ip);
      return res.status(500).json({ error: "Database error", err });
    }

    if (result.length > 0) {
      logger.getRepairById(req.params.id, false, req.ip, req.headers['user-agent']);
      return res.status(409).json({ err: "The repair already exists"});
    }

    const query = `INSERT INTO repairs (name, device, material, tools, description, type_of_service, labor_costs, approximate_time, is_deleted) VALUES ("${name}", "${device}", "${material}", "${tools}", "${description}", "${type_of_service}", ${labor_costs}, ${approximate_time}, 0);`;
    db.query(query, (err, user) => {
      if (err) {
        logger.error('CREATE_REPAIR', err, req.ip);
        return res.status(500).json({ error: "Database error", err });
      }

      logger.createRepair(req.body, req.body.id, req.ip, req.headers['user-agent']);
      res.status(201).json({ message: "The repair has been created successfully" });
    })
  });
});

// PUT /repair/{id} = Endpoint para editar el tipo de reparacion
router.put('/:id', (req, res) => {
  const filter = `SELECT * FROM repairs WHERE name = "${req.body.name}" AND device = "${req.body.device}"`;
  db.query(filter, (err, repair) => {
    if (err) {
      logger.error('UPDATE_REPAIR', err, req.ip);
      return res.status(500).json({ error: "Database error", err });
    }

    if (repair.length > 1) {
      logger.getRepairById(req.params.id, false, req.ip, req.headers['user-agent']);
      return res.status(404).json({ error: "The repair already exists" });
    }

    const search = `SELECT * FROM repairs WHERE id_repair = ${req.params.id} AND is_deleted = 0`;
    db.query(search, (err, user) => {
      if (err) {
        logger.error('UPDATE_REPAIR', err, req.ip);
        return res.status(500).json({ error: "Database error", err });
      }

      if (user.length === 0) {
        logger.getRepairById(req.params.id, false, req.ip, req.headers['user-agent']);
        return res.status(404).json({ error: "The repair doesn't exists" });
      }

      const newChanges = req.body;
      const query = `UPDATE repairs SET name = "${newChanges.name}", device = "${newChanges.device}", material = "${newChanges.material}", tools = "${newChanges.tools}", description = "${newChanges.description}", type_of_service = "${newChanges.type_of_service}", labor_costs = ${newChanges.labor_costs}, approximate_time = ${newChanges.approximate_time} WHERE id_repair = ${req.params.id}`;
      db.query(query, (err, result) => {
        if (err) {
          logger.error('UPDATE_REPAIRS', err, req.ip);
          return res.status(500).json({ error: "Database error", err });
        }
        logger.updateRepair(req.params.id, req.body, req.ip, req.headers['user-agent']);
        res.status(200).json({ message: "The repair has been updated" });
      });

    });
  });
});

// DELETE /repair/{id} = Endpoint para eliminar un tipo de reparacion
router.delete('/:id', (req, res) => {
  const search = `SELECT * FROM repairs WHERE id_repair = ${req.params.id} AND is_deleted = 0`;
  db.query(search, (err, repair) => {
    if (err) {
      logger.error('DELETE_REPAIR', err, req.ip);
      return res.status(500).json({ error: "Database error", err });
    }

    if (repair.length === 0) {
      logger.getRepairById(req.params.id, false, req.ip, req.headers['user-agent']);
      return res.status(404).json({ error: "The repair doesn't exists" });
    }

    const query = `UPDATE repairs SET is_deleted = 1 WHERE id_repair = ${req.params.id}`;
    db.query(query, (err, result) => {
      if (err) {
        logger.error('DELETE_REPAIR', err, req.ip);
        return res.status(500).json({ error: "Database error", err });
      }
      logger.deleteRepair(req.params.id, result[0], req.ip, req.headers['user-agent']);
      res.status(200).json({ message: "The repair has been deleted." });
    });
  });
});

module.exports = router;