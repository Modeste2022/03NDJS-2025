import mongoose from "mongoose";

mongoose
    .connect("mongodb://localhost:27017/db_prix_nobel")
    .then(() => console.log("connected"))
    .catch((err) => console.error("connection error: ",err));
    
