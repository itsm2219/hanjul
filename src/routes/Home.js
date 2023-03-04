import { authService, dbService } from '../fBase';
import {  doc, updateDoc, addDoc, collection, onSnapshot, query, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { UNSAFE_enhanceManualRouteObjects } from 'react-router-dom';
import Hanjul from '../components/Hanjul'
import HanjulFactory from 'components/HanjulFactory';
import { Hashtags } from 'Styles/HanjulListStyles';



const Home = ({ userObj }) => {


    const [hanjuls, setHanjuls] = useState([]);

    const[search, setSearch] = useState("");

    const [hashtags, setHashtags] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

  
    useEffect(() => {
    
        onSnapshot(collection(dbService, "hanjuls"), (snapshot) => {
          const hanjulArray = snapshot.docs.map((doc) => ({
            id: doc.id, 
            ...doc.data(),
          }));
          setHanjuls(hanjulArray);
        });
      }, []);

      const searchHanjul=(e)=>{
        e.preventDefault();
        setHanjuls(hanjuls.filter((hanjul)=>
        hanjul.text.toLowerCase().includes(search.toLowerCase())
        ));
      };

      const onSearch = (event) => {
        event.preventDefault();
        setSearchTerm(event.target.value);
      }
    
      const filteredHanjuls = hanjuls.filter(hanjul => hanjul.hashtags && hanjul.hashtags.includes(searchTerm));


      return (
        <div className="container">          

      <form onSubmit={(e)=>{searchHanjul(e)}}>
        <input className="factoryInput__input" onChange={(e)=>{setSearch(e.target.value)}} placeholder="한줄을 검색하세요" />
        <button type="submit">검색</button>
      </form>

            <div style={{ marginTop: 70 }}>
                {hanjuls.map((hanjul)=>(
                <Hanjul key={hanjul.id} hanjulObj={hanjul} isOwner={hanjul.creatorId === userObj.uid} hashtags={hashtags} />
                ))}

            </div>

        </div>
    );
};
export default Home;