import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

import AuthForm from 'components/AuthForm';
import { getAuth,signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import {authService, firebaseInstance} from "../fBase";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

const Auth = () => {
    const onSocialClick = async (event) => {
        const { 
            target: { name },
        } = event;
        let provider;
        if(name ==="google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }else if(name==="github"){
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);

    };

    return (
        <div className="authContainer">
        <FontAwesomeIcon
          icon={faPencil}
          color={"#ff9d00"}
          size="3x"
          style={{ marginBottom: 30 }}
        />
        <h4 className="authFont2" style={{ marginBottom: 13 }} >남기고 싶은 글귀 기록하고 맞춤형 글귀 찾기</h4> 

        <h4 className="authFont1" style={{ marginBottom: 60 }} >오늘의 한줄</h4>
            <AuthForm />
            <div className="authBtns">
                <button onClick={onSocialClick} name="google" className="authBtn">
                    Continue with Google <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button onClick={onSocialClick} name="github" className="authBtn">
                    Continue with Github <FontAwesomeIcon icon={faGithub} />
                </button>
            </div>
        </div>
    );
};
export default Auth;