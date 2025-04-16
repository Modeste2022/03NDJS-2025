import crypto from "crypto";
import User from "../models/user.js";

export async function register(req, res){
    const { email, password, isAdmin } = req.body;

    try {
        const userExist = await User.findOne(( email ));
        if (userExist)
            return res.status(409).json({
                error: "User already exists",
            });

    
    }
}