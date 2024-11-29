const express = require('express');
const ModbusRTU = require('modbus-serial');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware CORS pour permettre l'accès au backend depuis le frontend
app.use(cors());

// Créer un client Modbus
const client = new ModbusRTU();

// Connexion à l'automate
const AUTOMATE_IP = "172.16.1.23";
const AUTOMATE_PORT = 502;

async function connectToAutomate() {
    try {
        await client.connectTCP(AUTOMATE_IP, { port: AUTOMATE_PORT });
        client.setID(1); // Définit l'identifiant Modbus (par défaut 1, peut varier selon l'automate)
        console.log(`Connecté à l'automate à ${AUTOMATE_IP}:${AUTOMATE_PORT}`);
    } catch (error) {
        console.error("Erreur de connexion à l'automate :", error.message);
    }
}

// Route pour récupérer les variables de l'automate
app.get('/variables', async (req, res) => {
    try {
        // Lecture des 10 premières variables (Holding Registers)
        const startAddress = 0; // Adresse de départ
        const numberOfRegisters = 10; // Nombre de registres à lire
        const data = await client.readHoldingRegisters(startAddress, numberOfRegisters);

        // Retourne les données sous forme de tableau
        res.json(data.data);
    } catch (error) {
        console.error("Erreur lors de la lecture des variables :", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Démarrer le serveur Express.js
app.listen(port, async () => {
    console.log(`Backend en écoute sur http://localhost:${port}`);
    await connectToAutomate(); // Connexion à l'automate au démarrage
});
