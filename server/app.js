import express from 'express';
import 'dotenv/config';
import { dbconnect } from './config/dbConfig.js';
import http from 'http'
import path from 'path';
import morgan from 'morgan';
import cookieparser from 'cookie-parser';
import cors from 'cors';
import {Server} from 'socket.io'
import userRoute from './Routes/userRouter.js';
const app = express();
import { createServer } from 'http';
import { socketConnection } from './config/socketConnection.js';
const server = http.createServer(app)
const io=new Server(server,{
  cors:{
    origin:['http://localhost:3000','https://conct.netlify.app'],
    transports: ['websocket']
  }
})
dbconnect()
let activeusers={}
socketConnection(io,activeusers)

// Middleware
app.use(cors({
  origin: ['http://localhost:3000','https://conct.netlify.app'],
  credentials: true,
}));

app.use('/Public', express.static('Public'));
app.use(express.json()); // Parse JSON body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieparser());
app.use(morgan('dev'));

// Routes
app.use('/', userRoute);

const port = 4000;
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
