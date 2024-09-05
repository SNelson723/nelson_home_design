import express from "express";
import ViteExpress from "vite-express";
import path from 'path';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

import db from './db/index.js';
const { Clients, Blueprints, Sales, ContactInquiries } = db;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientPath = path.resolve(__dirname, '../dist');
app.use(express.static(clientPath));

// Clients route handling
app.get('/clients', async (req, res) => {
  try {
    const clients = await Clients.findAll();
    res.status(200).send(clients);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post('/clients', async (req, res) => {
  try {
    const newClient = await Clients.create(req.body);
    res.status(201).send(newClient);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Blueprints route handling
app.get('/blueprints', async (req, res) => {
  try {
    const blueprints = await Blueprints.findAll();
    res.status(200).send(blueprints);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.post('/blueprints', async (req, res) => {
  try {
    const newBlueprint = await Blueprints.create(req.body);
    res.status(201).send(newBlueprint);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Sales route handling
app.get('/sales', async (req, res) => {
  try {
    const sales = await Sales.findAll();
    res.status(200).send(sales);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.post('/sales', async (req, res) => {
  try {
    const newSale = await Sales.create(req.body);
    res.status(201).send(newSale);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// ContactInquiries route handling
app.get('/contactInquiries', async (req, res) => {
  try {
    const contactInquiries = await ContactInquiries.findAll();
    res.status(200).send(contactInquiries);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.post('/contactInquiries', async (req, res) => {
  try {
    const newContactInquiry = await ContactInquiries.create(req.body);
    res.status(200).send(newContactInquiry);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Send an email via Email sending route
app.post('/sendEmail', async (req, res) => {
  const { firstName, lastName, email, subject, message } = req.body;
  console.log(req.body);

  // Create a transporter using SMTP
  var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.EMAIL_USER, // Use server-specific env vars
      pass: process.env.EMAIL_PW
    }
  });

  try {
    let info = await transporter.sendMail({
      from: `"Test User" <${email}>`,
      to: "stephenn649@gmail.com",
      subject: subject,
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}`,
      html: `<p><strong>Name:</strong> ${firstName} ${lastName}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`
    });

    // console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  } finally {
    const newContactInquiry = await ContactInquiries.create({
      name: `${firstName} ${lastName}`,
      email: email,
      subject: subject,
      message: message
    });
    res.status(200).send(newContactInquiry);
  }
});

// Start the server using ViteExpress
// At the top of your server.js file
const isProduction = process.env.NODE_ENV === 'production';
let PORT = isProduction ? process.env.PORT : 3000;

ViteExpress.listen(app, PORT, () =>
  console.log(`Server is listening at ${PORT}`),
);

export default app;