const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Configuration de la connexion
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/user-auth-api', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true, // Déprécié dans les versions récentes de Mongoose
      // useFindAndModify: false // Déprécié dans les versions récentes
    });

    console.log(`✅ MongoDB connecté avec succès sur: ${conn.connection.host}`);
    
  } catch (err) {
    console.error('❌ Échec de connexion à MongoDB:', err.message);
    
    // Suggestions de dépannage
    if (err.message.includes('ECONNREFUSED')) {
      console.log('\nConseils de dépannage:');
      console.log('1. Vérifiez que MongoDB est bien installé et démarré');
      console.log('2. Lancer MongoDB avec: sudo service mongod start');
      console.log('3. Vérifiez le port par défaut (27017)');
    }
    
    process.exit(1); // Arrêt de l'application en cas d'erreur
  }
};

// Gestion des événements de connexion
mongoose.connection.on('connected', () => {
  console.log('📌 Événement MongoDB: Connecté');
});

mongoose.connection.on('error', (err) => {
  console.error('⚠️ Événement MongoDB - Erreur:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('🔌 Événement MongoDB: Déconnecté');
});

// Gestion propre de la fermeture
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('⏏️ Connexion MongoDB fermée proprement');
  process.exit(0);
});

module.exports = connectDB;