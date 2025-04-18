const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'votre-clé-secrète';

module.exports = {
  /**
   * Inscription d'un nouvel utilisateur
   */
  register: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validation des données
      if (!email || !password) {
        return res.status(400).json({
          succès: false,
          message: 'Email et mot de passe requis'
        });
      }

      // Vérification de l'existence de l'utilisateur
      const utilisateurExistant = await User.findOne({ email });
      if (utilisateurExistant) {
        return res.status(400).json({
          succès: false,
          message: 'Cet email est déjà utilisé'
        });
      }

      // Création de l'utilisateur
      const motDePassHaché = await bcrypt.hash(password, 12);
      const nouvelUtilisateur = await User.create({
        email,
        password: motDePassHaché
      });

      // Réponse sans le mot de passe
      const { password: _, ...utilisateurSansMotDePasse } = nouvelUtilisateur.toObject();

      res.status(201).json({
        succès: true,
        message: 'Inscription réussie',
        utilisateur: utilisateurSansMotDePasse
      });

    } catch (err) {
      console.error('Erreur lors de l\'inscription:', err);
      res.status(500).json({
        succès: false,
        message: 'Erreur lors de l\'inscription',
        erreur: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
  },

  /**
   * Connexion d'un utilisateur
   */
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Recherche de l'utilisateur
      const utilisateur = await User.findOne({ email });
      if (!utilisateur) {
        return res.status(401).json({
          succès: false,
          message: 'Identifiants incorrects'
        });
      }

      // Vérification du mot de passe
      const motDePasseValide = await bcrypt.compare(password, utilisateur.password);
      if (!motDePasseValide) {
        return res.status(401).json({
          succès: false,
          message: 'Identifiants incorrects'
        });
      }

      // Génération du token JWT
      const token = jwt.sign(
        { userId: utilisateur._id },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({
        succès: true,
        message: 'Connexion réussie',
        token,
        expiresIn: 3600 // 1 heure en secondes
      });

    } catch (err) {
      console.error('Erreur lors de la connexion:', err);
      res.status(500).json({
        succès: false,
        message: 'Erreur lors de la connexion',
        erreur: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
  },

  /**
   * Récupération du profil utilisateur
   */
  getMe: async (req, res) => {
    try {
      const utilisateur = await User.findById(req.user.userId).select('-password');
      
      if (!utilisateur) {
        return res.status(404).json({
          succès: false,
          message: 'Utilisateur non trouvé'
        });
      }

      res.json({
        succès: true,
        utilisateur
      });

    } catch (err) {
      console.error('Erreur lors de la récupération du profil:', err);
      res.status(500).json({
        succès: false,
        message: 'Erreur lors de la récupération du profil',
        erreur: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
  }
};