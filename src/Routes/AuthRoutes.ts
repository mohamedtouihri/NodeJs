import { Router } from "express";
import { registerUser } from "../Controllers/UserController";
import upload from "../utils/MulterConfig";
import Joi from "joi";
import { ValidateSchema } from "../MiddlleWares/Validator";

const router : Router = Router()

const RegisterSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

router.post('/register',upload.single('profilePictureUrl'),ValidateSchema(RegisterSchema,'body'),registerUser)

export default router