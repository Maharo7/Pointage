require('dotenv').config();
const mongoose = require('mongoose');
const url = process.env.MONGODB_URI;

async function connectDatabase() {
    try {
        await mongoose.connect(url);
        console.log('Base de données connectées');
        return true;
    } catch (err) {
        console.error(`Erreur lors de la connexion à la base. \n${err}`);
        return false;
    }
}

module.exports = { connectDatabase };