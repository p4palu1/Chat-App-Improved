import { useEffect, useState } from "react";
import "./bootstrap.min (9).css"
import { Container, Button, Navbar, Nav } from "react-bootstrap"
import db from "./firebase"
import { onSnapshot, collection, query, where, orderBy } from "firebase/firestore";
import ChatRoom from "./components/ChatRoom"
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { userContext } from "./context/context"
import GroupsRoom from "./components/GroupsRoom"
import HomeScreen from "./screens/HomeScreen"
import ChatScreen from "./screens/ChatScreen"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"


function App({history}) {

  const auth = getAuth();
  const provider = new GoogleAuthProvider()
  
  const [user, setUser] = useState(null)

  const signInWithFirebase = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      setUser(result.user)
      console.log(result.user.uid);
      // ...
    }).catch((error) => {
        console.log(error.message);
      // ...
    });
  }

  const logout = () => {
    signOut(auth).then(() => {
      setUser(null)
      history.push("/")
    }).catch((error) => {
      console.log(error.message);
    });
  }

  return (
    <Router>
      <userContext.Provider value={{user, setUser}}>
        <header>
              <Navbar bg="primary"  variant="dark" expand="lg" collapseOnSelect>
                  <Container>
                    <Navbar.Brand href="/">MyChat</Navbar.Brand>
                      {user === null 
                      ? <Button variant="secondary" onClick={signInWithFirebase}>Sign up with Google</Button> 
                      : <div>
                          <LinkContainer to="/"><Button variant="secondary" onClick={logout}>Log Out</Button></LinkContainer> 
                      </div>
                      } 
                  </Container>
              </Navbar>

          </header>
          <Route path="/chat/:id" component={ChatScreen} exact/>
          <Route path="/" component={HomeScreen} exact/>
      </userContext.Provider>
    </Router>
  );
}

export default App;
