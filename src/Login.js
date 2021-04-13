import React from 'react';
import { GoogleLogin } from 'react-google-login';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_KEY;

function Login() {
  //const [isShown, setShown] = useState([false]);

  // When Google Login is clicked
  //function onClickButton() {
  //}
  
  const onSuccess = (res) => {
    console.log('[Login Success] currentUser:', res.profileObj);
  };
  
  const onFailure = (res) => {
    console.log('[Login failed] res:', res);
  };
  
  
  return (
    <div>
      <GoogleLogin
        clientID={CLIENT_ID}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px'  }}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;