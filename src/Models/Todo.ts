import mongoose, { Schema } from "mongoose";
export interface ITodo extends Document{
    title : string,
    description : string,
    done : boolean,
}
// models :reprsenter li data ili bech itkon mawjouda fel base de données

const Todoschema:Schema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    done : {
        type : Boolean,
        default : false
    }
},{ timestamps:true,
    versionKey:false
})

export default mongoose.model<ITodo>('Todo',Todoschema)