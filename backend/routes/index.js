const express = require('express');
const app = express();
const http = require("http");
const { Server } = require("socket.io")
const cors = require("cors")
const router = express.Router()
const users = require('./users')

app.use(cors())

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`)
  socket.on("request_login", (data) => {
    let result = checkLoginData(data)
    if (result != -1){
      socket.emit("loginstatus", true, users[result]);
    } else {
      socket.emit("loginstatus", false );
    }
  })
});

const checkLoginData  = (data) => {
  for (let i = 0; i < users.length; i++) {
    //console.log(users[i].username == data.user && users[i].password == data.pwd)
    if (users[i].username == data.user && users[i].password == data.pwd){
      console.log("test")
      return i
    }
  }
  return -1
}

server.listen(3001, () =>{
  console.log("Server is running");
});

module.exports = router;