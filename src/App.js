import React, { useState, useEffect } from 'react';
import firebase from './firebase';
import MenuComponent from './Menu';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Login from './login';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        if (user) {
            setUser(user);
        } else {
            setUser(null);
        }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Container className="container">
        <MenuComponent user={user} />
      </Container>
      {/* ... rest of the components ... */}
    </div>
  );
}

export default App;
