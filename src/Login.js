import React from 'react';
import { useGoogleLogin } from 'react-google-login';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Login(prop) {
  
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    console.log(
      `Logged in successfully welcome ${res.profileObj.name} See console for full profile object.`
    );
    prop.showPage();
    prop.sendUserInfo(res.profileObj)
  };
  
  const onFailure = (res) => {
    console.log('[Login failed] res:', res);
  };
  
  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
    // responseType: 'code',
    // prompt: 'consent',
  });
  
  return (
    <div>
      <button onClick={signIn} className="button">
        <img src="google.svg" alt="google login" className="icon"></img>
  
        <span className="buttonText">Sign in with Google</span>
      </button>
    </div>
  );
}

export default Login;