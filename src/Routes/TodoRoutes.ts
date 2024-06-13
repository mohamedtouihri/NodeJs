import { Router } from "express";
import { CreateTodo, DeleteOneTodoById, GetOneTodoById, UpdateOneTodoById } from "../Controllers/TodoController";
import Joi from "joi";
import { ValidateSchema } from "../MiddlleWares/Validator";

// Routes : definie les endpoints (nawe3 action (exemple :(post, ...)) , path , fonctionnel ili bech isir (exemple(createTodo....)))

const router : Router = Router()

const CreateTodoSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
})

const IdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('Invalid todo id')
const GetOneTodoByIdSchema = Joi.object({id : IdSchema})

const UpdateTodoSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string()
})

router.post('/todos/create',ValidateSchema(CreateTodoSchema,"body"),CreateTodo)

router.get('/todos/:id',ValidateSchema(GetOneTodoByIdSchema,"params"),GetOneTodoById)

router.put('/todos/:id',ValidateSchema(GetOneTodoByIdSchema,"params"),
            ValidateSchema(UpdateTodoSchema,'body'),UpdateOneTodoById)
router.delete('/todos/:id',ValidateSchema(GetOneTodoByIdSchema,"params"),DeleteOneTodoById)

export default router