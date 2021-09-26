import React, { useEffect, useState, useContext, useRef, useLayoutEffect } from "react"
import  db from "../firebase"
import { doc, addDoc, Timestamp, onSnapshot, collection, query, where, orderBy, limit } from "firebase/firestore";
import { userContext } from "../context/context"
import { Row, Col, Card, Form, Button } from "react-bootstrap"
import Message from "../components/Message"


const ChatScreen = ({match, history}) => {

    const [ messages, setMessages ] = useState([])
    const { user, setUser } = useContext(userContext)
    const [ inGroup, setInGroup ] = useState(false)
    const  [groups, setGroups ] = useState([])

    const [m, setM] = useState('')

    const dummy = useRef();

    const chatId = match.params.id

    useLayoutEffect(() => {
        console.log(user);
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
        dummy.current.scrollIntoView({ behavior: 'smooth' });
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
        photoUrl: user.photoURL,
        email: user.email,
        displayName: user.displayName
    })
    setM('')
  }

    return (
        <div>
            <div className="d-flex flex-column justify-content-center">
                {(user === null || inGroup === false) 
                ? <> Cannot access this page!</> 
                : messages.map(m => 
                    <Message msg={m}>{m.text}</Message>
                )}
            </div>
            <span ref={dummy}></span>
            <Form onSubmit={handleSend} >
                <Form.Group className="form d-flex justify-content-center">
                            <Form.Control type="text" className="rounded-0" placeholder="Enter Message..." value={m} 
                            onChange={(e) => setM(e.target.value)} >  
                            </Form.Control>
                            <Button type="submit" className="rounded-0" variant="success" disabled={m === ""}>Send</Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default ChatScreen
