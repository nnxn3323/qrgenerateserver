import 'dotenv/config'
import mongoose from 'mongoose';
const connectDB = async ()=> {
    console.log(process.env.S3_ACCESS_KEY)
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('MongoDb Connected');   
}
export default connectDB;