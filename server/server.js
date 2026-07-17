import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import http from 'http'
import { connectDb } from './lib/db.js'
import userRouter from './routes/userRoutes.js'
import messageRouter from './routes/messageRoutes.js'
import {Server} from 'socket.io'


const app = express()

const  server = http.createServer(app)

// Initialize socket.io server
export const io = new Server(server, {
    cors: {origin: "*"}
})

// Store Online Users 

export const userSocketMap = {}; // {userId: socketId} -> maps userId to socketId

// socket.io connection handler

io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("User Connected", userId)

    if(userId) userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        console.log("user disconnected", userId)
        delete userSocketMap[userId]
        io.emit('getOnlineUsers', Object.keys(userSocketMap))
    })
})

// Middleware setup

app.use(express.json({limit: "4mb"}))

app.use(cors())

app.use('/api/status', (req, res) => {
    res.send('Server is live');
})

app.use('/api/auth', userRouter)

app.use('/api/messages', messageRouter)

const PORT = process.env.PORT || 5000

const startServer = async () => {
    try {
        // connect to mongodb
        await connectDb()

        server.listen(PORT, () => {
            console.log(`server is running on ${PORT}`)
        })
    } catch (error) {
        console.log('Failed to start server', error)
        process.exit(1)
    }
}

startServer()
