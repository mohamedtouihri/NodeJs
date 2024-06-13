import {Request , Response} from 'express'
import Todo, { ITodo } from '../Models/Todo'

//Controller :  kima intermediare mebin front wela client 3ednou request wel base de données
export const CreateTodo = async (req:Request,res:Response): Promise<void>=>{
    try{
        console.log("WELCOME TO CREATE TODO CONTROLLER")
        const {title,description} = req.body
        // create tode with title and description : req.body.title , req.body.description
        if (!title){
            res.status(400).json({error : 'title is required!!'})
        }
        if (!description){
            res.status(400).json({error : 'description is required!!'})
        }
        const newTodo = new Todo(
            {
                title,
                description
            }
        )
        const SavedTodo : ITodo  = await newTodo.save();
        res.status(200).json({message : "Todo Created Succefully",data:SavedTodo})
    }
    catch(error){
        res.status(400).json({
            error:'ERROR HAPPEN AT CREATE TODO!!!'
        })
    }
}
export const GetOneTodoById = async (req:Request,res:Response): Promise<void>=>{
    try{
        const {id} = req.params
        const todo : ITodo | null = await Todo.findById(id).select('-__v')
        if(!todo){
            res.status(404).json({error:'Todo not found!!!'})
            return
        }
        res.status(200).json({message : 'Todo returned successfully',todo})
    }
    catch(error){
        res.status(400).json({
            error:'ERROR HAPPEN AT GET ONE TODO BY ID!!!'
        })
    }
}
