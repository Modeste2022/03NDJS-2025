const jwt = require('jsonwebtoken');
const JWT_SECRET = 'votre-clé-secrète'; // À remplacer par votre clé réelle

exports.authenticate = (req, res, next) => {
  // Récupération du token depuis les en-têtes
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  // Vérification de la présence du token
  if (!token) {
    return res.status(401).json({ 
      succès: false,
      message: 'Aucun token fourni - accès refusé' 
    });
  }

  try {
    // Vérification et décodage du token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Ajout des informations utilisateur à la requête
    req.user = decoded;
    
    // Passage au middleware suivant
    next();
    
  } catch (err) {
    // Gestion des erreurs de token invalide
    res.status(401).json({ 
      succès: false,
      message: 'Token invalide ou expiré' 
    });
  }
};