import { onAuthStateChanged } from 'firebase/auth';
import React ,{useEffect, useState} from 'react';
import { auth } from './firebase';
import { SignedInStack, SignedOutStack } from './Navigation';


const AuthNavigation = () => {
  
  const [currentUser, setCurrentUser] = useState(null);

  const userHandler = (user) => {
      user ? setCurrentUser(user) : setCurrentUser(null);
  }
 

  useEffect(() =>
    onAuthStateChanged(auth, user => {
      userHandler(user);
      console.log(user,'user details')
    })
    , []);

  return (
    <>
     {currentUser ? <SignedInStack /> : <SignedOutStack />}
    </>
  )
}

export default AuthNavigation