import mongoose, { Schema ,Document , PaginateModel} from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

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
    },
    deleteAt : {
        type : Date,
        default : null
    }
},{ timestamps:true,
    versionKey:false
})

Todoschema.plugin(mongoosePaginate)
export default mongoose.model<ITodo,PaginateModel<ITodo>>('Todo',Todoschema)