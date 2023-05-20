// index.js
'use strict';

const express = require("express");
const http = require('http');
const { emit } = require("process");
const socketio = require('socket.io');
const users = new Map();

const app = express()
const PORT = 4000

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})

app.get('/about', (req, res) => {
  res.send('This is my about route..... ')
})

// Export the Express API
module.exports = app

