import React, { useEffect, useState } from 'react';
import HanjulFactory from 'components/HanjulFactory';
import styled from 'styled-components';
import Hanjul from 'components/Hanjul';
import Hashtag from 'components/Hashtag';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { dbService } from 'fBase';

//const SearchHashend= () => <span>SearchHashend</span>;


const SearchHash = ({ userObj, timestamp }) => {

  const [hashDefault, setHashDefault] = useState(false);
  const [unfilteredLists, setUnfilteredLists] = useState('');
  const [hashHanjuls, setHashHanjuls] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchHashtag, setSearchHashtag] = useState('');
  const [hanjulList, setHanjulList] = useState([]);

  const [hanjuls, setHanjuls] = useState([]);
  const[search, setSearch] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    onSnapshot(query(collection(dbService, "hanjuls"), 
    orderBy('createdAt', 'desc')),
    (snapshot) => {
      const hanjulArray = snapshot.docs.map((doc) => ({
        id: doc.id, 
        ...doc.data(),
      }));
      setHashHanjuls(hanjulArray);
    });
  }, []);

 

  const filterLists = (reset = false) => {
    if (reset) {
      setHanjulList(unfilteredLists);
      setSearching(false);
    } else {
      const temp = [];
      for (let i = 0; i < unfilteredLists.length; i++) {
        const { text, hashtag } = unfilteredLists[i];
        if (
          hashtag.includes(searchHashtag) ||
          (hashtag && hashtag.includes(searchHashtag))
        ) {
          temp.push(unfilteredLists[i]);
        }
      }
      setHanjulList(temp);
      setSearching(true);
    }
  };

  const searchHanjul=(e)=>{
    e.preventDefault();
    setHashHanjuls(hashHanjuls.filter((hanjul)=>
    hanjul.text.toLowerCase().includes(search.toLowerCase())
    ));
  };




  return (
   

<div className="container" onClick={handleYearChange}>

    <form onSubmit={(e)=>{filterLists(e)}} onClick={handleYearChange}>

          <button type="submit" >검색</button>
          <Hashtag
          
    selectedHashtagArray={hashtags}
    setHashtagsArray={setHashtags}
    hashDefault={hashDefault}
    setHashDefault={setHashDefault} />
    </form>

              <div style={{ marginTop: 310 }}>
                  {hashHanjuls.map((hanjul, {timestamp})=>(
                  <Hanjul 
                  key={hanjul.id} 
                  hanjulObj={hanjul} 
                  isOwner={hanjul.creatorId === userObj.uid} 
                  hashtags={hashtags} 
                  currentUserId={userObj.uid} 
                  timestamp={timestamp} />                              
                  ))}
              </div>

              </div>
  );
};

export default SearchHash;