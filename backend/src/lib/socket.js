import { Server } from "socket.io";
import http from "http";
import express from "express";

const app= express();
const server= http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:[ "http://localhost:5173"],
    }
});

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
  }
  
const userSocketMap = {}; // used to store online users {userId: socketId}

io.on("connection",(socket)=>{
    console.log("a user is connected",socket.id);
    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

     io.emit("getOnlineUsers", Object.keys(userSocketMap));// io.emit() is used to send events to all the connected clients

    socket.on("disconnect",()=>{
        console.log("a user is disconnected",socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));

    })
})
export {io,app,server};