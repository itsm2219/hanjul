import { dbService } from '../fBase';
import { addDoc, collection, onSnapshot, query, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { UNSAFE_enhanceManualRouteObjects } from 'react-router-dom';
import Hanjul from '../components/Hanjul'
import HanjulFactory from 'components/HanjulFactory';


const Home = ({ userObj }) => {

    const [hanjuls, setHanjuls] = useState([]);

    const[search, setSearch] = useState("");

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

      return (
        <div className="container">

      <form onSubmit={(e)=>{searchHanjul(e)}}>
        <input className="factoryInput__input" onChange={(e)=>{setSearch(e.target.value)}} placeholder="한줄을 검색하세요" />
        <button type="submit">검색</button>
      </form>


            <HanjulFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
                {hanjuls.map((hanjul)=>(
                <Hanjul key={hanjul.id} hanjulObj={hanjul} isOwner={hanjul.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
};
export default Home;