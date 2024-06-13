import { Router } from "express";
import { CreateTodo, GetOneTodoById } from "../Controllers/TodoController";
import Joi from "joi";
import { ValidateSchema } from "../MiddlleWares/Validator";

// Routes : definie les endpoints (nawe3 action (exemple :(post, ...)) , path , fonctionnel ili bech isir (exemple(createTodo....)))

const router : Router = Router()

const CreateTodoSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
})

router.post('/todos/create',ValidateSchema(CreateTodoSchema),CreateTodo)
router.get('/todos/:id',GetOneTodoById)

export default router