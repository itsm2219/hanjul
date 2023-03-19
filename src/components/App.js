import AppRouter from "../components/Router";
import React, {useEffect, useState} from "react";
import { authService } from "../fBase";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import background from "./android.png";



function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
    if(user){
      if(user.displayName===null){
         user.updateProfile({
          displayName:"User",
        });
      }
      setUserObj(user);
    } 
    setInit(true);
  });
  }, []);
  return (
    <>
    <div style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: '410px 100%'}} >
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        "Initialzing...."
      )}
      </div>
    </>
  );
}

export default App;