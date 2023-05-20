// index.js
'use strict';

const express = require("express");
const http = require('http');
const { emit } = require("process");
const socketio = require('socket.io');
const users = new Map();

class Server{

    constructor(){
        this.host = '0.0.0.0';
        this.protocol = "https";
        this.port = 4000;
        this.app = express();
        this.http = http.Server(this.app);
        this.socket = socketio(this.http);
        }

   appExecute(){
     
        this.http.listen(this.port, this.host, () => {
            console.log(`Listening on http:${this.host}:${this.port}`);
        });

        this.app.get('/', (req, res) => {

         res.send('Chat Server is running on port 3000')
        });    

        this.socket.on('connection', (socket) => {

        console.log('user connected')

    });

            
        this.socket.on('join', function(userId) {

        users.set(userId, this.socket.id);

        //socket.broadcast.emit('userjoinedChat',userNickname +" : has joined the chat ")
        console.log('joined chat')
       });


         this.socket.on('disconnected', function(senderId,receiverId) {
         
            this.socket.to(users.get(receiverId)).emit("onOffline", "offline")
             users.delete(senderId);
         
         });

        this.socket.on('typing', function(receiverId) {
      
            this.socket.to(users.get(receiverId)).emit("onTyping", "typing")

         }); 

        this.socket.on('stoptyping', function(receiverId) {
      
            this.socket.to(users.get(receiverId)).emit("onStopTyping", "stoptyping")

         }); 

        socket.on('online', function(receiverId) {
      
            this.socket.to(users.get(receiverId)).emit("onOnline", "online")

         });

        
         this.socket.on('messagedetection', (receiverId,messageContent,messageType) => {

        //create a message object 

        let  message = {"message":messageContent, "receiverId":receiverId,"messageType":messageType}

        console.log(message)
        console.log(users.get(receiverId))
        console.log(receiverId)

        this.socket.to(users.get(receiverId)).emit("message", message)

        });
}

}

const app = new Server();
app.appExecute();




