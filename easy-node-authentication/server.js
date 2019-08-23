// server.js

// set up ======================================================================
// get all the tools we need
var path = require('path');
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

// wallet const
const Web3 = require('web3');
const createError = require('http-errors');
const request = require('request');

// socket.io 시작
// /* 설치한 express 모듈 불러오기 */
// var express = require('express')

/* 설치한 socket.io 모듈 불러오기 */
var socket = require('socket.io')
console.log(socket.length);

/* Node.js 기본 내장 모듈 불러오기 */
var http = require('http')

/* Node.js 기본 내장 모듈 불러오기 */
var fs = require('fs')

/* express http 서버 생성 */
var server = http.createServer(app)

/* 생성된 서버를 socket.io에 바인딩 */
var io = socket(server)

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// wallet app
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes ======================================================================
require('./app/routes.js')(app, passport, request); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
// app.listen(port);
// console.log('The magic happens on port ' + port);


server.listen(port, function() {
    console.log('The magic happens on port ' + port)
  })

  io.sockets.on('connection', function(socket) {

    /* 새로운 유저가 접속했을 경우 다른 소켓에게도 알려줌 */
    socket.on('newUser', function(name) {
      console.log(name + ' 님이 접속하였습니다.')
  
      /* 소켓에 이름 저장해두기 */
      socket.name = name
  
      /* 모든 소켓에게 전송 */
      io.sockets.emit('update', {type: 'connect', name: 'SERVER', message: name + '님이 접속하였습니다.'})
    })
  
    /* 전송한 메시지 받기 */
    socket.on('message', function(data) {
      /* 받은 데이터에 누가 보냈는지 이름을 추가 */
      data.name = socket.name
      
      console.log(data)
  
      /* 보낸 사람을 제외한 나머지 유저에게 메시지 전송 */
      socket.broadcast.emit('update', data);
    })
  
    /* 접속 종료 */
    socket.on('disconnect', function() {
      console.log(socket.name + '님이 나가셨습니다.')
  
      /* 나가는 사람을 제외한 나머지 유저에게 메시지 전송 */
      socket.broadcast.emit('update', {type: 'disconnect', name: 'SERVER', message: socket.name + '님이 나가셨습니다.'});
    })
  })