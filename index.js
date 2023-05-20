// index.js
'use strict';

const express = require("express");
const http = require('http');
const { emit } = require("process");
const socketio = require('socket.io');
const users = new Map();
this.app1 = express();




app1.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})
