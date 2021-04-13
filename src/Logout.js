import React from 'react';
import { GoogleLogout } from 'react-google-login';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_KEY;

export default function Logout() {
  
  const onSuccess = () => {
    alert('Logout successful');
  };
  
  return (
    <div>
      <GoogleLogout
        clientID={CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}