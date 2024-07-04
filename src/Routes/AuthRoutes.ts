import { Router } from "express";
import { registerUser } from "../Controllers/UserController";


const router : Router = Router()

router.post('/register',registerUser)

export default router