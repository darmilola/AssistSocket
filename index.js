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

        this.app.get('/', (req, res) => {

         res.send('Chat Server is running on port 3000')
        });    

        this.socket.on('connection', (socket) => {

        console.log('user connected')

            
        socket.on('join', function(userId) {

        users.set(userId, socket.id);

        //socket.broadcast.emit('userjoinedChat',userNickname +" : has joined the chat ")
        console.log('joined chat')

 
        });

        
        socket.on('messagedetection', (receiverId,messageContent,messageType) => {

        //create a message object 

        let  message = {"message":messageContent, "receiverId":receiverId,"messageType":messageType}

        console.log(message)
        console.log(users.get(receiverId))
        console.log(receiverId)

        socket.to(users.get(receiverId)).emit("message", message)

        })

        });
}


}

const app = new Server();
app.appExecute();