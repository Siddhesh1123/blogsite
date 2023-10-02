import mongoose from "mongoose";



export const Connection = async(username,password) => {

    const URL = `mongodb+srv://${username}:${password}@blog-webapp.1wxwiff.mongodb.net/?retryWrites=true&w=majority`;

    try {
        await mongoose.connect(URL, { useNewUrlParser: true });
        console.log("Database is connected yeahhh!!!")
    } catch (error) {
        console.log(" :( Database not connected  " , error)
    }
}