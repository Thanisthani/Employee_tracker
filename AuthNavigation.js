import React ,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLogin } from './features/authSlice';
import { SignedInStack, SignedOutStack } from './Navigation';


const AuthNavigation = () => {

    const dispatch = useDispatch();
    // redux state
    const authUser = useSelector((state) => state.auth);

    useEffect(() => {
      dispatch(isUserLogin());
      console.log(authUser.isAuthenticated,"navigator" );
    }, []);

  return (
    <>
    {authUser.isAuthenticated ? <SignedInStack /> : <SignedOutStack />}
    </>
  )
}

export default AuthNavigation