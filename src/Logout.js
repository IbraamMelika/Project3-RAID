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
    <button onClick={signOut} className="button">
      <img src="google.svg" alt="google logout" className="icon"></img>

      <span className="buttonText">Sign out</span>
    </button>
  );
}

export default Logout;