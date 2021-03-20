import express from 'express';
import cors from 'cors'
const app = express();
 
const http = require('http').Server(app)
 
const PORT=8000
const io = require('socket.io')(http,{
    cors: {
        origin: "*",
        methods: "*"
      }
});

var all_clients:Array<any> = []
var peers:Array<any> = []
app.use(cors())

io.on("connection",(socket:any)=>{
    
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
        io.local.emit('peers',{peers: peers})
      
    })

    socket.on('peer', (peer:any) =>{
    
         peers.push({id: peer?.id, socket_id: socket.id})

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