
// ============ IMPORTACIONES ============
const express = require("express");
const PDFDocument = require('pdfkit');
const logger = require('../logger');
const fs = require('fs');
const path = require('path');
const db = require("../db");
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD, // Debe ser una contraseña de aplicación
  },
});

router.post('/notes/:id', (req, res) => {
  try {
    // Obtencion de datos
    const query1 = `SELECT * FROM quotes WHERE id_quote = ${req.params.id} AND is_deleted = 0`;
    db.query(query1, async (err, quote) => {
      if (err) {
        logger.error("/notes", err, req.ip);
        return res.status(500).json({ success: false, error: "Database error", err });
      }

      if (quote.length === 0) {
        logger.getQuoteById(req.params.id, false, req.ip, req.headers['user-agent']);
        return res.status(404).json({ error: "The quote doesn't exists" });
      }

      const { id_quote, customer_name, contact_phone, device_brand, device, delivery_date, first_payment, remaining_money } = quote[0]

      const query2 = `SELECT r.name, r.labor_costs + qr.piece_cost AS cost FROM quote_repairs qr INNER JOIN repairs r ON qr.id_repair = r.id_repair WHERE id_quote = ${req.params.id}`;
      db.query(query2, async (err, repairs) => {
        if (err) {
          logger.error("/notes", err, req.ip);
          return res.status(500).json({ success: false, error: "Database error", err });
        }

        // Creacion y guardado de la nota
        const uploadDir = path.join(__dirname, '../uploads');
        saveDir(uploadDir);

        const nombreArchivo = `nota_de_remision-${req.params.id}-${Date.now()}.pdf`;
        const pdfPath = path.join(uploadDir, nombreArchivo);
        
        // Generar el PDF
        const doc = new PDFDocument({size: [306, 396],
                                      margins: { top: 20, bottom: 40, left: 40, right: 40 }
                                    });
        const writeStream = fs.createWriteStream(pdfPath);
        doc.pipe(writeStream);
        doc.lineWidth(0.5);

        /**
         * Logotipo
         */ 

        //doc.image('backend/public/logo.png', 100, 100, { width: 150 });
        
        /**
         * Encabezado
         */ 

        doc.font('Helvetica-Bold').fontSize(6).text('Hidrocell', { align: 'center' });
        doc.font('Helvetica').fontSize(6).text('Venta de celulares', { align: 'center' });
        doc.font('Helvetica').fontSize(6).text('Gral. Miguel Barragán #924', { align: 'center' });
        doc.fontSize(6).text('Col. Primavera CP. 20050', { align: 'center' });
        doc.fontSize(6).text('Tel. 449 803 2010', { align: 'center' });
        doc.moveDown();


        /**
         * Numero de folio y fecha
         */ 

        doc.rect(220, 15, 60, 9).stroke();
        doc.font('Helvetica-Bold').fontSize(6).text('FOLIO', 220, 18, { width: 60, align: 'center' });

        doc.rect(220, 24, 60, 9).stroke();
        doc.font('Helvetica').fontSize(7).text(`No.      ${id_quote}`, 220, 26, { width: 60, align: 'center' });

        doc.rect(220, 33, 60, 9).stroke();
        doc.font('Helvetica-Bold').fontSize(6).text('Fecha', 220, 35, { width: 60, align: 'center' });

        doc.rect(220, 42, 20, 9).stroke();
        doc.font('Helvetica').fontSize(7).text(delivery_date.toString().slice(8, 10), 220, 44, { width: 20, align: 'center' });
        doc.rect(240, 42, 20, 9).stroke();
        doc.font('Helvetica').fontSize(7).text(delivery_date.toString().slice(4, 7), 240, 44, { width: 20, align: 'center' });
        doc.rect(260, 42, 20, 9).stroke();
        doc.font('Helvetica').fontSize(7).text(delivery_date.toString().slice(11, 15), 260, 44, { width: 20, align: 'center' });

        /**
         * Datos del cliente
         */ 

        doc.rect(20, 65, 260, 9).stroke();
        doc.font('Helvetica-Bold').fontSize(6).text('Nombre:', 23, 68, { align: 'left' });
        doc.font('Helvetica').fontSize(6).text(customer_name, 49, 68, { align: 'left' });
        doc.font('Helvetica-Bold').fontSize(6).text('Marca:', 156, 68, { align: 'left' });
        doc.font('Helvetica').fontSize(6).text(device_brand, 177, 68, { align: 'left' });

        doc.rect(20, 74, 260, 9).stroke();
        doc.font('Helvetica-Bold').fontSize(6).text('Telefono:', 23, 77, { align: 'left' });
        doc.font('Helvetica').fontSize(6).text(contact_phone, 51, 77, { align: 'left' });
        doc.font('Helvetica-Bold').fontSize(6).text('Modelo:', 156, 77, { align: 'left' });
        doc.font('Helvetica').fontSize(6).text(device, 181, 77, { align: 'left' });

        doc.rect(20, 83, 260, 9).stroke();
        doc.font('Helvetica-Bold').fontSize(6).text('IMEI:', 23, 86, { align: 'left' });
        doc.font('Helvetica').fontSize(6).text('', 39, 86, { align: 'left' });

        /**
         * Reparaciones realizadas
         */ 

        doc.rect(20, 100, 200, 13).fill('black').stroke();
        doc.font('Helvetica-Bold').fontSize(10).fillColor('#ffffff').text('Descripcion', 20, 103, { width: 200, align: 'center' });
        doc.rect(220, 100, 60, 13).fill('black').stroke();
        doc.font('Helvetica-Bold').fontSize(10).fillColor('#ffffff').text('Total', 220, 103, { width: 60, align: 'center' });

        let startX = 20;          // Margen izquierdo
        let startY = 113;         // Posición inicial desde arriba

        repairs.map((repair) => {
          doc.rect(startX, startY, 200, 13).stroke().fill('white');
          doc.font('Helvetica').fontSize(10).fillColor('#000000').text(repair.name, startX + 3, startY + 3, { align: 'left' });
          doc.rect(startX + 200, startY, 60, 13).stroke();
          doc.font('Helvetica').fontSize(10).text(`$${repair.cost}`, startX + 198, startY + 3, { width: 60, align: 'right' });
          startY += 13;
        });

        emptySpace = 11 - repairs.length
        for(let i=0; i < emptySpace; i++) {
          doc.rect(startX, startY, 200, 13).stroke();
          doc.rect(startX + 200, startY, 60, 13).stroke();
          startY += 13;
        }

        doc.rect(20, startY, 200, 13).stroke();
        doc.font('Helvetica').fontSize(10).text('Anticipo', 23, startY + 3, { align: 'left' });
        doc.rect(startX + 200, startY, 60, 13).stroke();
        doc.font('Helvetica').fontSize(10).text(`-$${first_payment}`, 218, startY + 3, { width: 60, align: 'right' });

        doc.rect(170, startY + 13, 50, 13).fill('black').stroke();
        doc.font('Helvetica').fontSize(10).fillColor('#ffffff').text('Total', 173, startY + 16, { width: 50, align: 'center' });
        doc.rect(220, startY + 13, 60, 13).stroke();
        doc.font('Helvetica').fontSize(10).fillColor('#000000').text(`$${remaining_money}`, 218, startY + 16, { width: 60, align: 'right' });

        /**
         * Reparaciones realizadas
         */ 

        doc.font('Helvetica-Bold').fontSize(10).text('POLÍTICA DE GARANTÍA', 20, 290, { width: 260, align: 'center' });
        doc.rect(20, 300, 260, 60).stroke();
        doc.font('Helvetica').fontSize(8).text('1. En equipos seminuevos se otorga un mes de garantía en defectos de fábrica.', 23, 306, { width: 257, align: 'left' });
        doc.font('Helvetica').fontSize(8).text('NO APLICA si el equipo fue mojado o dañado por caída.', 23, 326, { width: 257, align: 'left' });
        doc.font('Helvetica').fontSize(8).text('2. En equipos nuevos se otorgan tres meses de garantía.', 23, 336, { width: 257, align: 'left' });
        doc.font('Helvetica').fontSize(8).text('3. Es necesario presentar la nota para aplicar garantía.', 23, 346, { width: 257, align: 'left' });

        doc.end();
      
        // Esperar a que se complete la escritura
        await new Promise((resolve, reject) => {
          writeStream.on('finish', resolve);
          writeStream.on('error', reject);
        });
        
        // Responder con éxito
        res.json({
          success: true,
          file: nombreArchivo,
          url: `/uploads/${nombreArchivo}`,
          path: pdfPath
        });
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Funcion para crear carpeta upload
const saveDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// POST /send/email = Endpoint para enviar ticket por correo
router.post('/email', async (req, res) => {

  if (!req.body.to || !req.body.subject || !req.body.message) {
    return res.status(400).json({
      success: false,
      error: 'Faltan campos obligatorios: destinatario, titulo del correo, cuerpo del gmail'
    });
    }

  let attachmentFiles = [];
  if (req.body.attachments && Array.isArray(req.body.attachments)) {
    for (const fileName of req.body.attachments) {
      // Construir la ruta completa al archivo
      const filePath = path.join(__dirname, '..', 'uploads', fileName);
        
      // Verificar si el archivo existe
      if (fs.existsSync(filePath)) {
        attachmentFiles.push({
          filename: fileName,
          path: filePath
        });
      } else {
        console.warn(`Archivo no encontrado: ${fileName}`);
      }
    }
  }

  const email = await transporter.sendMail({
    from: process.env.GMAIL_USERNAME,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.message,
    html: req.body.message,
    attachments: attachmentFiles
  });

  res.status(200).json({ 
    success: true, 
    message: 'Correo enviado correctamente',
    messageId: email.messageId 
  });
});

module.exports = router;