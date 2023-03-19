import React from 'react';
import HanjulFactory from 'components/HanjulFactory';

//const HotPost= () => <span>HotPost</span>;
//export default HotPost;
import {authService, dbService } from "../fBase";
import { collection, orderBy, query ,getDocs} from "firebase/firestore";
import { useEffect, useState } from "react";
import Hanjul from "../components/Hanjul";


const HotPost = ({ userObj, timestamp }) => {
  const [postings, setPostings] = useState([]);

  useEffect(() => {
    const getPostings = async () => {
      const q = query(
        collection(dbService, "hanjuls"),
        orderBy("likeCount", "desc")
      );
      const querySnapshot = await getDocs(q);
      const postingArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPostings(postingArray);
    };
    getPostings();
  }, []);

  return (
    <div style={{ marginTop: 15, marginBottom: 50 }}>
      {postings.map((posting, {timestamp}) => (
        <Hanjul
          key={posting.id}
          hanjulObj={posting}
          isOwner={posting.creatorId === authService.currentUser.uid}
          currentUserId={userObj.uid}
          timestamp={timestamp}
        />
      ))}
    </div>
  );
};

export default HotPost;