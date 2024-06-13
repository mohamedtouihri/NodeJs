"use strict";
// const express = require('express')
// const dotenv = require('dotenv')
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log("Free Palestine");
console.log(process.env.PORT);
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get('/', (req, res) => {
    // request :  object contain useful information about the request (req.body)
    // response: will contain the response to the request res.send({})
    res.send('Response from API : Express + Javascript server');
});
app.listen(port, () => {
    console.log(`[server] Server is running at http://localhost:${port}`);
});
