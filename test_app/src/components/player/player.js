import react, {useEffect, useRef, useState} from 'react';
import socketIOClient from 'socket.io-client'
import Peer from 'peerjs';
const my_peer_id =  'connection' + String(Math.floor(Math.random()*10))
console.log(my_peer_id)
const peer = new Peer(my_peer_id)

const socket  = socketIOClient('http://127.0.0.1:8000') 
const Player = (props)=>{
    const ref_obj = useRef(null)
    
    var [peers, setPeers] = useState([])
    useEffect(()=>{
        
        
        socket.on('connect',()=>{
            socket.emit('peer',{id: my_peer_id})
        })
 

    },[])

    useEffect(()=>{
        
        peer.on('call',(call)=>{
            
          navigator.mediaDevices.getUserMedia({video:true}).then(stream=>{
              call.answer(stream)
          })
           call.on('stream',(remote_stream)=>{
            ref_obj.current.srcObject = remote_stream;
             
            ref_obj.current.play()
               
           })
            
        })
    },[])

    useEffect(()=>{
        socket.on('peers',(data)=>{
             
            const arr = data.peers.filter(el=>{

                if (el.id !== my_peer_id)
                    return el.id 
            })
            
           
            setPeers(arr)             
             
             
        })

        
        
    },[])

  const startCalling =(id)=>{
    const connection = peer.connect(id);
    navigator.mediaDevices.getUserMedia({video: true}).then(stream=>{
       const call = peer.call(id,stream)

       call.on('stream',(remote_stream)=>{

        ref_obj.current.srcObject = remote_stream;
             
        ref_obj.current.play()
       })

       
     
    })
  }

    return (
        <div>
         {
             peers.map(ele=>{
                 return (
                     <div key={ele.id}>
                        <a  onClick={()=>startCalling(ele.id)}>
                            {ele.id}
                        </a>

                        <div>
                        <video autoPlay width="320" height="240" ref={ref_obj} id="temp">
	
	                    </video>
                        </div>

                     </div>
 
                 )
             })
         }
        </div>

    )
}

export default Player;