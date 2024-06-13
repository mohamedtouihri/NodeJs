// const express = require('express')
// const dotenv = require('dotenv')

import express, {Express , Request , Response} from 'express'
import dotenv from 'dotenv'
import * as fs from 'fs' // file systeme
import './DataBase'
dotenv.config()

// console.log("Free Palestine")
// console.log(process.env.PORT)
const app: Express = express()
const port = process.env.PORT

app.get('/', (req:Request, res:Response)=>{
    // request :  object contain useful information about the request (req.body)
    // response: will contain the response to the request res.send({})
    res.send('Response from API : Express + Javascript server')
})

app.listen(port,()=>{
    console.log(`[server] Server is running at http://localhost:${port}`) 
})

import TodoRoutes from './Routes/TodoRoutes'
import bodyParser from 'body-parser'
app.use(bodyParser.json())
app.use('/v1/api',TodoRoutes)





// const textIn = fs.readFileSync('./src/input.txt','utf-8')
// console.log(textIn)

// const textOut = `New content : Created at ${new Date()} \n${textIn}`
// fs.writeFileSync('./src/output.txt', textOut)
// Syncway => blockway : matet3ada lel instruction ithenya ila matekmel loula (single thread)
// fs.readFile('./src/input123.txt','utf-8',(err,data)=>{
//     if(err){
//         console.log("File not found")
//     }
//     console.log(data)   
// })
// console.log("NodeJs") 

// fs.readFile("./src/start.txt","utf-8",(err,data1)=>{
//     if(err){
//         return console.log("Cannot read file data 1")
//     }
//     console.log(data1)
//     fs.readFile(`./src/${data1}.txt`,"utf-8",(err,data2)=>{
//         if(err){
//             return console.log("Cannot read file data 2")
//         }
//         console.log(data2)
//         fs.readFile('./src/append.txt',"utf-8",(err,data3)=>{
//             if(err){
//                 console.log('Canoot read this file')
//             }
//             console.log(data3)
//             fs.writeFile('./src/Finale.txt',`${data2}\n${data3}`,"utf-8",err=>{
//                 if(err){
//                     console.log('Cannot write Finale.txt')
//                 }
//                 console.log('Final file added successfully')
//             })
//         })
//     })
// })
import superagent from 'superagent'


// promise fullfield => resolve
// promise rejected => reject

// const readFilePro = (file:string)=>{
//     return /*constructor:*/new Promise ((/*execute function:*/resolve,reject)=>{
//         fs.readFile(file,'utf-8',(err,data)=>{
//             if (err) return reject('Cannot read file')
//             resolve(data)
//         })
//     })
// }

// const writeFilePro = (file:string,data:string)=>{
//     return new Promise((resolve,reject)=>{
//         fs.writeFile(file,data,err=>{
//         if (err) return reject('Cannot write this file')
//             resolve("success")
//         })

//     })
// }
// readFilePro('./src/Dog.txt')
// .then(data=>{
//     console.log('received value from promise :',data)
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
// })
// .then((res=>{
//     console.log(res.body)
//     return writeFilePro("./src/dog-img.txt",(res.body.message))
// }))
// .then(()=>{
//     console.log("Random dog image saved to file")
// })
// .catch(err=>{
//     console.log('err received value from promise :',err)
// })




