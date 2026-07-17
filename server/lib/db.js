import mongoose from "mongoose";

// function to connect to the mongodb database

export const  connectDb = async () => {
    try{
        mongoose.connection.on('connected', () => console.log('db connected'))
        await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`)
    }
    catch(err){
        console.log(err)
        throw err
    }
}
