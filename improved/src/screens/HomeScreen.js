import { useEffect, useState, useContext } from "react";
import { Container, Button, Navbar, Nav } from "react-bootstrap"
import db from "../firebase"
import { onSnapshot, collection, query, where, orderBy } from "firebase/firestore";
import ChatRoom from "../components/ChatRoom"
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { userContext } from "../context/context"
import GroupsRoom from "../components/GroupsRoom"

const HomeScreen = ({history}) => {

    const { user, setUser } = useContext(userContext) 

  return (
    <>
      <Container className="HomeScreen text-center className mt-5">      
        { user === null
        ? (
          <div>
            <h1>Welcome to MyChat!</h1>
            <br />
            <p>This is a React.js project made by Reem Stamker</p>
            <p><a href="https://github.com/p4palu1/Chat-App-Improved">Click to view open sourse code on GitHub</a></p>
            <br />
            <h5>To begin using the chat, click the "Sign up wuth google" button on top</h5>          
          </div>
        )
        : <GroupsRoom />
        }
      </Container>
    </>
  );
}

export default HomeScreen;
