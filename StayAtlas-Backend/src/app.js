import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import dotenv from "dotenv"
dotenv.config()
const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(morgan("dev"))
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error',
    });
});

//import routes
import userRouter from "./routes/user.route.js"
import villaRoutes from './routes/villa.route.js';
import bookingRouter from "./routes/booking.route.js"

//route declaration 
app.use("/api/v1/users",userRouter)
app.use('/api/v1/villas', villaRoutes);
app.use('/api/v1/bookings', bookingRouter);
export {app}