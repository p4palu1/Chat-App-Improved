import React, { useEffect, useState, useContext, useRef, useLayoutEffect } from "react"
import  db from "../firebase"
import { doc, addDoc, Timestamp, onSnapshot, collection, query, where, orderBy, limit } from "firebase/firestore";
import { userContext } from "../context/context"
import { Row, Col, Card, Form, Button} from "react-bootstrap"
import Message from "../components/Message"
import { LinkContainer } from "react-router-bootstrap"

const ChatScreen = ({history}) => {

    const { user, setUser } = useContext(userContext)
    const [email, setEmail] = useState('')
    const [emailList, setEmailList] = useState([])
    const [name, setName ] = useState('')

    useEffect(() => {
        if(user){
            setEmailList([user.email])
        }
  }, [])

  const handleAddEmail = (e) => {
    e.preventDefault()
    setEmailList([...emailList, email])
    setEmail('')
  }

  const deleteEmail = (e) => {
      console.log(emailList.filter(email => email !== e))
      setEmailList(emailList.filter(email => email !== e))
  }

  const handleSend = async(e) => {
      e.preventDefault()
      const group = await addDoc(collection(db, "groups"), {
        name: name,
        users: emailList,
    })
    history.push("/")
    
  }

    return (
        <>
            <div>
                <LinkContainer to="/" >
                    <Button className="rounded-0 m-2">Go Back</Button>
                </LinkContainer>
            </div>
            <div className="d-flex flex-column justify-content-center">
                {user === null
                ? <> Cannot access this page!</> 
                :
                <>
                    <Form className="form d-flex justify-content-center mb-3">
                        <Form.Control type="text" className="rounded-0 w-50" placeholder="Enter Chat Name..." value={name} 
                            onChange={(e) => setName(e.target.value)} >  
                        </Form.Control>
                    </Form>
                    <Form onSubmit={handleAddEmail} >
                        <Form.Group className="form d-flex justify-content-center">
                                    <Form.Control type="text" className="rounded-0 w-50" placeholder="Enter Participants..." value={email} 
                                    onChange={(e) => setEmail(e.target.value)} >  
                                    </Form.Control>
                                    <Button type="submit" className="rounded-0" variant="info" disabled={email === ""}>Add</Button>
                        </Form.Group>
                    </Form>
                    <div className="text-center">
                        <div className="d-flex flex-column justify-content-center">
                        { 
                            emailList.map(email => 
                                <div className={ email === user.email ? "d-none" : "d-flex justify-content-center rounded p-1 m-2 border w-50"}>
                                    <span>
                                        {email} 
                                        {
                                            email === user.email 
                                            ? <div></div>
                                            : <button className="btn ml-3" onClick={() => deleteEmail(email)}>
                                                <i className="fa fa-trash"></i>
                                            </button> 
                                        }
                                        
                                    </span>
                                </div>
                            )
                        }
                        </div>
                    </div>
                    
                    
                    <Form onSubmit={handleSend} >
                        <Form.Group className="form d-flex justify-content-center mt-2">
                                    <Button type="submit" className="rounded-0" variant="success" disabled={emailList.length === 1 || name === ""}>Create New Group</Button>
                        </Form.Group>
                    </Form>
                </>
                }
            </div>
            
        </>
    )
}

export default ChatScreen
