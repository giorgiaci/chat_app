import express from "express";
import routes from './routes/index.mjs';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import configEnv from '../config-env.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();

// Create HTTP server
const server = createServer(app);

// Initialize Socket.IO with the server
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:4200'],
        methods: ['GET', 'POST'],
        credentials: true
    }
});


const url = configEnv.database_uri;


app.use(express.json());

app.use(cookieParser())

app.use(cors({
    credentials: true,
    origin:['http://localhost:4200']
}));

app.use(routes);

const PORT = configEnv.port || 3000;


app.get("/", (req, res)=>{
    res.status(201).send({msg: "Hello!!"});
});

// Socket.IO connection handler
io.on('connection', (socket) => {
    socket.on('message', (data, username) => {
        console.log(data)
        io.emit('message', {data, username}); // Broadcast the message to all clients 
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

mongoose.connect(url)
.then(()=>{
    ('Connected to MongoDB');
    server.listen(PORT, ()=>console.log(`Running on port ${PORT}`))
})
.catch(()=>{
    console.log('Connection failed!')
})