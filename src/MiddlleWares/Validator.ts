import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";


export const ValidateSchema = (schema:Schema, target : "body" | "params") =>{
    return (req:Request,res:Response,next:NextFunction):void=>{
        const data = target === "body" ? req.body : req.params
        const {error} = schema.validate(data)
        if(error){
            console.log('Error from validate schema',error)
            const {details} = error
            const message = details?.map((err)=> err.message.replace(/['"]+/g,'')).join(',')
            res.status(400).json({error:message})
        }
        else{
            console.log('Schema verified correctly, Go To Next Step')
            next()
        }
    }
}