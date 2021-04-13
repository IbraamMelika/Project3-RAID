import React from 'react';
import { GoogleLogout } from 'react-google-login';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Logout() {
  
  const onSuccess = () => {
    alert('Logout successful');
  };
  
  return (
    <div>
      <GoogleLogout
        clientId={CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;