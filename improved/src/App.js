import { useEffect, useState } from "react";
import "./bootstrap.min (9).css"
import { Container, Button } from "react-bootstrap"
import db from "./firebase"
import { onSnapshot, collection, query, where, orderBy } from "firebase/firestore";
import ChatRoom from "./components/ChatRoom"
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { userContext } from "./context/context"



function App() {
  
  const auth = getAuth();
  const provider = new GoogleAuthProvider()
  
  const [user, setUser] = useState(null)

  const signInWithFirebase = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      setUser(result.user)
      // ...
    }).catch((error) => {
        console.log(error.message);
      // ...
    });
  }

  const logout = () => {
    signOut(auth).then(() => {
      setUser(null)
    }).catch((error) => {
      console.log(error.message);
    });
  }

  return (
    <userContext.Provider value={{user, setUser}}>
      <Container className="App text-center">
      <h1 className="mt-5 mb-4">Welcome to the new and improved chat app!</h1>
      
      {user === null 
      ? <Button variant="primary" onClick={signInWithFirebase}>Sign up with Google</Button> 
      : <div>
          <ChatRoom gid="abc"/>
          <Button variant="primary" onClick={logout}>Log Out</Button> 
      </div>
      } 
      
    </Container>
    </userContext.Provider>
  );
}

export default App;
