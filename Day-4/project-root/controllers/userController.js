import User from "../models/User.js";

export const getMe = async (req, res) => {
  res.json(req.user);
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    res.json({ message: `Utilisateur ${user.email} supprimé` });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};