import React from 'react';
import { useGoogleLogout } from 'react-google-login';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Logout(prop) {
  
  const onLogoutSuccess = (res) => {
    console.log('Logged out Success');
    console.log('Logged out successful');
    prop.hidePage();
  };
  
  const onFailure = () => {
    console.log('Handle failure cases');
  };
  
  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });
  
  return (
    <div className="logout" onClick={signOut}>Logout</div>
  );
}

export default Logout;