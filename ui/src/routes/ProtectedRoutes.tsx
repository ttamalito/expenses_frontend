import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import isLoggedInRequest from '../auth/requests/isLoggedInRequest';

export default function ProtectedRoutes() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  useEffect(() => {
    isLoggedInRequest()
      .then((response) => {
        if (response) {
          console.log('User is logged in, verifyied in ProtextedRoutes.tsx');
          setLoggedIn(true);
        } else {
          console.log(
            'User is not logged in, verifyied in ProtextedRoutes.tsx',
          );
          setLoggedIn(false);
          // window.location.href = '/login';
        } // end of if else
      })
      .catch((error) => {
        console.error(error);
        setLoggedIn(false);
      });
  }, []);
  return loggedIn ? <Outlet /> : <Navigate to={'/login'} />;
}
