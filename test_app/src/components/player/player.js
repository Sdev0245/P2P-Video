import react, {Fragment, useEffect, useRef, useState} from 'react';
import socketIOClient from 'socket.io-client'
import Calling from '../calling/calling';
import classes from './player.module.css'
import Peer from 'peerjs';
import Connection from '../connection/connection';
const my_peer_id =  'connection' + String(Math.floor(Math.random()*100))
const peer = new Peer(my_peer_id)

const socket  = socketIOClient('http://127.0.0.1:8000') 
const Player = (props)=>{
    const ref_obj = useRef(null)
    console.log(classes.connections)
    const [calling, setCallingState] =  useState(false)
    
    var [peers, setPeers] = useState([])
    useEffect(()=>{
        
        
        socket.on('connect',()=>{
            socket.emit('peer',{id: my_peer_id})
        })
 

    },[])

    useEffect(()=>{
        
        peer.on('call',(call)=>{
          setCallingState(true)
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

  const isCalling = ()=>{

        if(calling)
        {
            return (
                <Calling/>
            )
        }

  }

    return (
        <Fragment>
            <div className={classes.panel}>
            { <div className={classes.connections}>
                {
                    <div>
                        <ul>    
                        { 
                            peers.map(ele=>{
                            return (
                                <Connection element = {ele} click={startCalling.bind(ele.id)} >
                                    {/* <video autoPlay width="320" height="240" ref={ref_obj} id="temp">
                                    </video> */}
                                </Connection>
                            )
                        })
                        }
                         </ul>
                    </div>
                }
            </div>   
    
            }
            </div>

          
        </Fragment>
    )
}

export default Player;