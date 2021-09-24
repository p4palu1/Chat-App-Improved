import React, { useEffect, useState, useContext } from "react"
import  db from "../firebase"
import { onSnapshot, collection, query, where, orderBy, limit } from "firebase/firestore";
import { userContext } from "../context/context"
import { Row, Col, Card } from "react-bootstrap"


const ChatScreen = ({match, history}) => {

    const [ messages, setMessages ] = useState([])
    const { user, setUser } = useContext(userContext)
    const [ inGroup, setInGroup ] = useState(false)

    const chatId = match.params.id

    useEffect(() => {
    const q = query(collection(db, "messages"), where("gid", "==", chatId), orderBy("createdAt"));
    onSnapshot(q , (querySnapshot) => {
      setMessages(querySnapshot.docs.map((doc) => doc.data()))
      console.log(messages)
    })

    const qu = query(collection(db, "groups"), where("name", "==", chatId), limit(1))
        
    onSnapshot(qu , (querySnapshott) => {
        if(user !== null ){
            setInGroup(querySnapshott.docs.map((doc) => doc.data())[0].users.includes(user.email))
        }
    })

  }, [])

    return (
        <div>
            {(user === null && inGroup === false) ? <>log in!</> : messages.map(m => <div>{m.text}</div>)}
        </div>
    )
}

export default ChatScreen
