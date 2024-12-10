import mongoose from "mongoose";

const connectDB = async() =>{
    try {
        await mongoose.connect(process.env.DB_CONNECT)
        console.log(`Mongo DB connected successfully`)
    } catch (error) {
        console.log(`Error occured while connecting DB`, error)
        process.exit(0)
    }
}

export default connectDB