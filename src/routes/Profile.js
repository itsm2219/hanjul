import { authService, dbService } from '../fBase';
import {useInsertionEffect, useState} from "react";
import React, { useEffect } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {collection, getDocs, orderBy, query, where} from "@firebase/firestore";
import {getAuth, signOut} from "firebase/auth";
import {updateProfile} from "@firebase/auth";
import Hanjul from 'components/Hanjul';
import { onSnapshot } from '@firebase/firestore';
import { faCog, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Profile = ({userObj}) => {

    const [myHanjuls, setMyHanjuls] = useState([]);

    useEffect(() => {
    
        onSnapshot(
          query(collection(dbService, "hanjuls"), where("creatorId","==",userObj.uid)), 
          (snapshot) => {
          const hanjulArray = snapshot.docs.map((doc) => ({
            id: doc.id, 
            ...doc.data(),
          }));
          setMyHanjuls(hanjulArray);
        });
      }, []);



    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.dispalyName);
    const auth = getAuth(); 

    if (userObj.displayName !== newDisplayName){
        updateProfile(userObj, {displayName: newDisplayName});
    }





    const onLogOutClick = () => {
        signOut(auth);
        navigate("/",{replace: true});
     };


     const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await updateProfile(userObj, {displayName: newDisplayName});
        }
    };

     return (
      <div className="container">

      <form onSubmit={onSubmit} className="profileForm">
            <input onChange={onChange} type="text" placholder="Display name" value={newDisplayName} autoFocus className="formInput" />
            <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10
          }}
          />
        </form>
        <span className="formBtn cancelBtn logOut" onClick={onLogOutClick} style={{marginBottom: 300}}>
        Log Out
      </span>




        </div>
     )


};

export default Profile;