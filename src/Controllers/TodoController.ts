import {Request , Response} from 'express'
import Todo, { ITodo } from '../Models/Todo'
import { date } from 'joi'

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

export const UpdateOneTodoById = async (req:Request,res:Response): Promise<void>=>{
    try{
        const {id} = req.params
        const data = req.body
        if(Object.values(req.body).length === 0){
            res.status(200).json({message : 'Nothing to update'})
            return 
        }
        const UpdatedTodo = await Todo.findByIdAndUpdate(id,data)
        if(!UpdatedTodo){
            res.status(404).json({error : 'Todo not found'})
            return
        }
        res.status(200).json({message :'Todo returned successfully',todo:UpdatedTodo})
    }
    catch(error){
        res.status(400).json({error:'ERROR HAPPEN AT UPDATE ONE TODO BY ID!!!'})
    }    
}

export const DeleteOneTodoById  = async (req:Request,res:Response): Promise<void>=>{
    try{
        const {id} = req.params
        await Todo.findByIdAndUpdate(id,{deleteAt: new Date()})
        res.status(200).json({message : 'Todo deleted successfully'})
    }
    catch(error){
        res.status(400).json({error:'ERROR HAPPEN AT DELETE ONE TODO BY ID!!!'})
    }   
}