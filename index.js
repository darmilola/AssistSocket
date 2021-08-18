'use strict';

const express = require("express");
const http = require('http');
const socketio = require('socket.io');
const bodyParser = require('body-parser');



class Server{

    constructor(){
        this.port =  process.env.PORT || 8080;
        this.host = 'https://glacial-springs-30545.herokuapp.com';
        this.app = express();
        this.http = http.Server(this.app);
        this.socket = socketio(this.http);
        this.users = {};
    }

    appConfig(){        
        this.app.use(
            bodyParser.json()
        );
    }

   

    appExecute(){

        this.http.listen(this.port, this.host, () => {
            console.log(`Listening on http://${this.host}:${this.port}`);
        });

        this.app.get('/', (req, res) => {

         res.send('Chat Server is running on port 3000')
        });    

        this.http.on('connection', (socket) => {

        console.log('user connected')



        socket.on('joinChat', function(userId) {

        this.users[userId] =  socket.id;
        socket.broadcast.emit('userjoinedChat',userNickname +" : has joined the chat ")
 
        });

        
        socket.on('messageDetection', (receiverId,messageContent,messageType) => {

        //create a message object 

        let  message = {"message":messageContent, "receiverId":receiverId,"messageType":messageType}

        io.to(this.users[receiverId]).emit("message", message)

        })



});    


        }
}

const app = new Server();
app.appExecute();