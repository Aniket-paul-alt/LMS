import dotenv from "dotenv"
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import connectDB from "./db/dbConnect.js";
import userRoutes from "./routes/user.route.js"
import courseRoutes from "./routes/course.route.js"
import mediaRoute from "./routes/media.route.js"
import purchaseRoute from "./routes/coursePurchase.route.js"
import courseProgressRoute from "./routes/courseProgress.route.js"

dotenv.config()

const app = express()

//call database connection here
connectDB()

//default middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

//apis
app.use("/api/v1/media", mediaRoute)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/course', courseRoutes)
app.use('/api/v1/purchase', purchaseRoute)
app.use('/api/v1/progress', courseProgressRoute)

//dummy api
// app.get("/home", (_, res)=>{
//     return res.status(200).json({
//         success: true,
//         message: "Hello i am coming from backend"
//     })
// })

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`Server listening at port ${PORT}`)
})
