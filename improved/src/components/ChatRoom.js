import React, { useEffect, useState } from "react"
import  db from "../firebase"
import { onSnapshot, collection, query, where, orderBy } from "firebase/firestore";
import Message from "./Message"

const ChatRoom = ({gid}) => {

    const [messages, setMessages] = useState([]) 

     useEffect(() => {
    const q = query(collection(db, "messages"), where("gid", "==", gid), orderBy("createdAt"));
    onSnapshot(q , (querySnapshot) => {
      setMessages(querySnapshot.docs.map((doc) => doc.data()))
      console.log(messages)
    })

  }, [])
    
    return (
        <div>
            {messages.map(message => 
                <>
                <Message text={message.text} createdAt={message.createdAt} />
                <br />
                </>
            )}
        </div>
    )
}

export default ChatRoom
