import mongoose from 'mongoose'

mongoose.connect("mongodb+srv://Admin:GpxFfJ7jzzBv7YCe@cluster0.tcbpycj.mongodb.net/Todo-App")
 .then(()=>{
    console.log('Mongoose connection done XD')
 })
 .catch(()=>{
    console.log("ERROR Mongoose connection failed")
 })