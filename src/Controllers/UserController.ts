import {Request , Response} from 'express'
import User, { IUser } from '../DataBase/Models/User'
import bcryt from 'bcryptjs'
import _ from 'lodash'


export const registerUser = async (req:Request,res:Response):Promise<void>=>{
    try{
        const {username,email,password} = req.body

        const existingUser = await User.findOne({email})
        if(existingUser){
            res.status(400).json({error:'email already exist try other one'})
            return
        }

        if(req?.file){
            console.log(req?.file)
        }

        const hashedPassword = await bcryt.hash(password,10)

        const newUser : IUser = new User ({
            username,
            email,
            password:hashedPassword
        })

        await newUser.save()

        const user = await User.findById(newUser?.id)

        res.status(200).json({
            message:'User registred successfully',
            data:user
        })
    }
    catch(error){
        res.status(400).json({
            error:'ERROR HAPPEN AT REGISTER USER!!!'})
    }
}