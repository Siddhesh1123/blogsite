import bcrypt from 'bcrypt';
import User from "../model/user.js";
import Token from '../model/token.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import token from '../model/token.js';

dotenv.config();

export const signupUser = async(request,response) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashpassword = await bcrypt.hash(request.body.password, salt)
        const user = {username:request.body.username , name: request.body.name , password : hashpassword};
        const newUser = new User(user)
        await newUser.save();
        
        return response.status(200).json({msg:'signup sucessful'})
    } catch (error) {
        return response.status(500).json({msg:'error signup not sucessful'})
    }

}

export const loginUser = async (request, response) => {
    let user = await User.findOne({ username: request.body.username });
    if (!user) {
        return response.status(400).json({msg:'username does not match'})
    }
    try {
        let match = await bcrypt.compare(request.body.password, user.password)
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY)
            
            const newToken = new Token({ token: refreshToken });
            await newToken.save();

            return response.status(200).json({accessToken:accessToken, refreshToken: refreshToken, name:user.name, username:user.username})
        } else {
            return response.status(400).json({msg:'password does not match'})
        }
    } catch (error) {
        return response.status(500).json({msg:'error while login in user'})
    }
}