import React, { useEffect, useState, useContext } from "react"
import  db from "../firebase"
import { onSnapshot, collection, query, where, orderBy } from "firebase/firestore";
import { userContext } from "../context/context"
import { Row, Col, Card} from "react-bootstrap"
import { withRouter } from 'react-router-dom'; 
import { LinkContainer } from "react-router-bootstrap"

const GroupsRoom = ({history}) => {
    
    const [groups, setGroups] = useState([])
    const { user, setUser } = useContext(userContext)
    useEffect(() => {
        const q = query(collection(db, "groups"))
        
        onSnapshot(q , (querySnapshot) => {
        setGroups(querySnapshot.docs.map((doc) => [doc.id, doc.data()])
        .filter(group => group[1].users.includes(user.email) === true))
        })
    }, [])
    
    

    return (
        <>
            <h1 className="mb-4">Click a chat group to begin chatting...</h1>
            {
                groups.map(group => 
                    <LinkContainer to={`/chat/${group[0]}`} key={group[0]}>
                        <Card classname="group-card">
                            <Row >
                                    <Card.Body>
                                        <strong>{group[1].name}</strong> participants: {group[1].users.length}
                                    </Card.Body>
                            </Row>
                        </Card>
                    </LinkContainer>
                )
            }
        </>
    )
}

export default withRouter(GroupsRoom)
