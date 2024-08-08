import express from "express";
import routes from './routes/index.mjs';
import mongoose from 'mongoose';
import configEnv from '../config-env.js';

const app = express();

const url = ``;

app.use(express.json());

app.use(routes);

const PORT = configEnv.port || 3000;

app.get("/", (req, res)=>{
    res.status(201).send({msg: "Hello!!"});
});

mongoose.connect(url)
.then(()=>{
    ('Connected to MongoDB');
    server.listen(PORT, ()=>console.log(`Running on port ${PORT}`))
})
.catch(()=>{
    console.log('Connection failed!')
})