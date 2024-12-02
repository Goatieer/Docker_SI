// Import des modules nécessaires
const express = require('express');
const mysql = require('mysql2');
const ModbusRTU = require("modbus-serial");

const app = express();
const port = 5001;

// Crée une connexion à la base de données MySQL (actuellement en commentaire)

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
    return;
  }
  console.log("Connecté à la base de données MariaDB !");
});

// Crée un client Modbus
const client = new ModbusRTU();

// Ouvre une connexion TCP à l'automate
client.connectTCP("172.16.1.24", { port: 502 })
  .then(() => {
    console.log("Connexion réussie à l'automate Modbus");
    client.setID(1);

    // Lire les valeurs des registres toutes les secondes
    setInterval(() => {
      client.readCoils(514, 1, (err, data) => {
        if (err) {
          console.error("Erreur lors de la lecture des registres :", err);
        } else {
          console.log("Données lues :", data.data);
        }
      });
    }, 1000);
  })
  .catch((err) => {
    console.error("Erreur lors de la connexion à l'automate :", err);
  });

// Route principale pour vérifier le backend
app.get('/', (req, res) => {
  res.send('Le backend fonctionne correctement, y compris la connexion Modbus !');
});

// Lancement du serveur Express
app.listen(port, () => {
  console.log(`Backend démarré et accessible à http://localhost:${port}`);
});
