import React, { useEffect, useState, useContext } from "react"
import  db from "../firebase"
import { doc, addDoc, Timestamp, onSnapshot, collection, query, where, orderBy, limit } from "firebase/firestore";
import { userContext } from "../context/context"
import { Row, Col, Card, Form, Button } from "react-bootstrap"


const ChatScreen = ({match, history}) => {

    const [ messages, setMessages ] = useState([])
    const { user, setUser } = useContext(userContext)
    const [ inGroup, setInGroup ] = useState(false)
    const  [groups, setGroups ] = useState([])

    const [m, setM] = useState('')

    const chatId = match.params.id

    useEffect(() => {

        if(user === null){
            alert("log in!")
        } else {
            const q = query(collection(db, "messages"), where("gid", "==", chatId), orderBy("createdAt"));
            onSnapshot(q , (querySnapshot) => {
            setMessages(querySnapshot.docs.map((doc) => doc.data()))
            })
            onSnapshot(query(collection(db, "groups")) , (querySnapshott) => {
            setGroups(querySnapshott.docs.map((doc) => [doc.id, doc.data()])
            .filter(group => group[0] === chatId))
            setInGroup(querySnapshott.docs.map((doc) => [doc.id, doc.data()])
            .filter(group => group[0] === chatId)[0][1].users.includes(user.email))
            })
        }
    
        

  }, [])

  const handleSend = async(e) => {
      e.preventDefault()
      console.log(Timestamp.now())
      console.log(chatId)
      console.log(m)
        const mes = await addDoc(collection(db, "messages"), {
        gid: chatId,
        createdAt: Timestamp.now(),
        text: m,
    })
    setM('')
  }

    return (
        <div>
            {(user === null || inGroup === false) ? <> Cannot access this page!</> : messages.map(m => <div>{m.text}</div>)}
            <Form onSubmit={handleSend}>
                <Form.Group>
                            <Form.Control type="text" placeholder="Enter Message..." value={m} 
                            onChange={(e) => setM(e.target.value)} >  
                            </Form.Control>
                </Form.Group>
                <Button type="submit" variant="success" disabled={m === ""}>Send</Button>
            </Form>
        </div>
    )
}

export default ChatScreen
