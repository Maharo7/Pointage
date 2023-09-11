const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.secretKey;

exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ error: 'Accès non autorisé. Le token JWT est manquant.' });
    }
    const tokenFinal = token.split(' ')[1];
  
    jwt.verify(tokenFinal, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Accès non autorisé. Token JWT invalide.' });
      }

      req.username = decoded.username;
      next();
    });
};
  