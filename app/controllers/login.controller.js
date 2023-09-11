const Admin = require('../models/admin.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.secretKey; 

exports.login = async (req, res) => {
    try {
        const { username, password} = req.body;
        if (!username || username.trim() === '' || !password || password.trim() === ''){
            return res.status(400).json({ error: 'Le paramètre username et password requis.' });
        };
        const admin = await Admin.findOne({ username: username , password: password });
        if(admin === null || admin === undefined) {
            return res.status(401).json({ error: 'username ou password incorecte.' });
        };
        const token = jwt.sign(
            { 
                username: admin.username
            },
            secretKey,
            { expiresIn: '1h' });

        console.log("Admin Connecté ");
        res.json({ token });
        
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'authentification.' });
    }
};