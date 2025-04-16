// connect db
connectDB();

//init express
const app = express();

//any middleware here

//API routes 
app.use("/api/v1/", authRoutes);

//any error handler here

const port = process.env.PORT || 5000; //.env PORT or Hard coded