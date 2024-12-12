// Import des modules nécessaires
const express = require('express');
const mysql = require('mysql2');
const ModbusRTU = require("modbus-serial");

const app = express();
app.use(express.json());
const port = 5001;

// Crée une connexion à la base de données MySQL
const db = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'hackathon',
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
    return;
  }
  console.log("Connecté à la base de données MariaDB !");
});

// Route pour ajouter un automate
app.post('/add-automate', (req, res) => {
  const { name, ip } = req.body;
  const query = "INSERT INTO Automate (nom, ip) VALUES (?, ?)";
  db.query(query, [name, ip], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'ajout de l'automate :", err);
      res.status(500).send("Erreur lors de l'ajout de l'automate.");
    } else {
      res.status(201).send({ id: result.insertId, name, ip });
    }
  });
});

// Route pour récupérer tous les automates
app.get('/get-automates', (req, res) => {
  const query = "SELECT * FROM Automate";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des automates :", err);
      res.status(500).send("Erreur lors de la récupération des automates.");
    } else {
      res.status(200).json(results);
    }
  });
});

// Route pour ajouter une variable
app.post('/add-variable', (req, res) => {
  const { automateId, coilAddress, refreshRate } = req.body;
  const query = "INSERT INTO Variable (automate_id, coil_address, refresh_rate) VALUES (?, ?, ?)";
  db.query(query, [automateId, coilAddress, refreshRate], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'ajout de la variable :", err);
      res.status(500).send("Erreur lors de l'ajout de la variable.");
    } else {
      res.status(201).send({ id: result.insertId, automateId, coilAddress, refreshRate });
    }
  });
});

// Lancement du serveur Express
app.listen(port, () => {
  console.log(`Backend démarré et accessible à http://localhost:${port}`);
});
