const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

//Cors utilizado para controlar os endereços que tem permissão para acessar backend
const cors = require('cors');

const path = require('path');

//Utilizados para receber solicitações em tempo real
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.Server(app);
const io = socketio(server);

const connectedUsers = {}; 

io.on('connection', socket => {
    const { user_id } = socket.handshake.query;
    connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

mongoose.connect('mongodb+srv://ramirezgfilho:ramirezgfilho@cluster0-fv3zv.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
//req.query = acessar query params  ( para filtros )
//req.params = acessar route params ( para editar e deletar )
//req.body = acessar corpo da requisição ( para criação quanto para edição )

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);