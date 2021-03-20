const express = require('express');
const process = require('process')
const app = express();
const cors = require('cors');
 
const http = require('http').Server(app)
 
const PORT=8000
const io = require('socket.io')(http,{
    cors: {
        origin: "*",
        methods: "*"
      }
});

var all_clients = []
var peers = []
app.use(cors())

io.on("connection",(socket)=>{
    
    console.log("connected!!!")
     all_clients.push(socket.id)
     
     socket.on('disconnect',()=>{
        console.log("disconnected " + socket.id)
       
        const index = all_clients.indexOf(socket.id)
        
        all_clients.splice(index, 1)
        const arr  = peers.filter(ele =>{
            if(ele.socket_id !== socket.id)
            {
                return  {
                    id: ele.id,
                    socket_id: ele.socket_id
                }
            }
        })
        peers = arr;
      
    })

    socket.on('peer', peer=>{
    
         peers.push({id: peer.id, socket_id: socket.id})

        //  console.log(all_clients)
        //  for (var data of all_clients)
        //  {
            io.local.emit('peers',{peers: peers})
        //  }
         
        
    })
    

   

})
 
 

http.listen(PORT,()=>{
    console.log(`Listening on the server ${PORT}`)
   
})