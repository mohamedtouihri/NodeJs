import {Request , Response} from 'express'
import User, { IUser } from '../DataBase/Models/User'
import bcryt from 'bcryptjs'


export const registerUser = async (req:Request,res:Response):Promise<void>=>{
    try{
        const {username,email,password} = req.body

        const existingUser = await User.findOne({email})
        if(existingUser){
            res.status(400).json({error:'email already exist try other one'})
            return
        }

        const hashedPassword = await bcryt.hash(password,10)

        const newUser : IUser = new User ({
            username,
            email,
            password:hashedPassword
        })

        await newUser.save()

        res.status(200).json({
            message:'User registred successfully',
            data:newUser
        })
    }


    catch(error){
        res.status(400).json({
            error:'ERROR HAPPEN AT REGISTER USER!!!'})
    }
}