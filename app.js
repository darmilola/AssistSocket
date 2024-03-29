'use strict';

const express = require("express");
const http = require('http');
const socketio = require('socket.io');
const users = new Map();




class Server{

    constructor(){
        this.host = '0.0.0.0';
        this.protocol = "https";
        this.port = process.env.PORT || 3000;
        this.app = express();
        this.http = http.Server(this.app);
        this.socket = socketio(this.http);
        }

   appExecute(){
     
        this.http.listen(this.port, this.host, () => {
            console.log(`Listening on http:${this.host}:${this.port}`);
        });

        this.app.get('/api', (req, res) => {

         res.send('Chat Server is running on port 3000')
        });   
       
       app.get('/ping', (req, res) => {
        res.send('pong 🏓')
    })

        this.socket.on('connection', (socket) => {

        console.log('user connected')

            
        socket.on('join', function(userId) {

        users.set(userId, socket.id);

        //socket.broadcast.emit('userjoinedChat',userNickname +" : has joined the chat ")
        console.log('joined chat')
       });


         socket.on('disconnected', function(senderId,receiverId) {
         
             socket.to(users.get(receiverId)).emit("onOffline", "offline")
             users.delete(senderId);
         
         });

        socket.on('typing', function(receiverId) {
      
             socket.to(users.get(receiverId)).emit("onTyping", "typing")

         }); 

        socket.on('stoptyping', function(receiverId) {
      
             socket.to(users.get(receiverId)).emit("onStopTyping", "stoptyping")

         }); 

        socket.on('online', function(receiverId) {
      
             socket.to(users.get(receiverId)).emit("onOnline", "online")

         });

        
        socket.on('messagedetection', (receiverId,messageContent,messageType) => {

        //create a message object 

        let  message = {"message":messageContent, "receiverId":receiverId,"messageType":messageType}

        console.log(message)
        console.log(users.get(receiverId))
        console.log(receiverId)

        socket.to(users.get(receiverId)).emit("message", message)

        });
        

        });
}

}

const app = new Server();
app.appExecute();
