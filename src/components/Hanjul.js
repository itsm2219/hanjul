import { authService, dbService } from "../fBase";
import React, { useState } from "react";
import { doc, deleteDoc, updateDoc, collection, getDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as FaHeartRegular } from "@fortawesome/free-regular-svg-icons";
import styled from 'styled-components';
import Home from "routes/Home";

import Hashtag from "./Hashtag";
import HanjulFactory from "./HanjulFactory";

const Hanjul = ({ hanjulObj, isOwner }) => {
    const [editing, setEditing] = useState(false);


    const [likeStatus, setLikeStatus] = useState({
        liked: hanjulObj.likes,
        likeCount: hanjulObj.likeCount
    });


    const [newHanjul, setNewHanjul] = useState(hanjulObj.text);
    const HanjulTextRef = doc(dbService, "hanjuls", `${hanjulObj.id}`);


    const userId = authService.currentUser.uid;

    const onDeleteClick = async () => {
        const ok = window.confirm("정말 지우시겠습니까?");
        console.log(ok);
        if (ok) {
            await deleteDoc(HanjulTextRef);  //firestore 경로(hanjul) 과 home.js에서 가져온 hanjulobj속 id
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);

    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(hanjulObj, newHanjul);
        await updateDoc(HanjulTextRef, { text: newHanjul, });
        setEditing(false);
    };
    const onChange = (event) => {
        const { target: { value } } = event;
        setNewHanjul(value);

    };
    const Hashtags = styled.div`
    width: 280px;
    height: 20px;
    line-height: 200%;
    font-size: 11px;
    border-radius: 10px;
    text-align: center;
    cursor: pointer;
    background-color: #ef9a9a;
    color: #fff;
  `;
  const CheckBox = styled.div`
  width: 280px;
  height: 20px;
  line-height: 20px;
  background-color: ${(props) => (props.selected ? '#c62828' : '#fff')};
  color: ${(props) => (props.selected ? '#fff' : '#c62828')};
  font-size: 12px;
  border: 1px solid #c62828;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
`;

    //좋아요 함수
    const handleLike = async () => {
        const hanjulRef = doc(dbService, "hanjuls", hanjulObj.id);
        const hanjulDoc = await getDoc(hanjulRef);

        //likes필드에 id가 존재한다면 id삭제 후 likeCount - 1 해줌. 존재하지 않으면 그 반대.
        if (hanjulDoc.exists) {
            const likes = hanjulDoc.data().likes || [];
            const likeCount = hanjulDoc.data().likeCount || 0;
            if (likes.includes(userId)) {

                setLikeStatus({
                    ...likeStatus,
                    liked: false,
                    likeCount: likeCount - 1
                });
                // remove the like if the user has already liked it
                await updateDoc(hanjulRef, {
                    likes: likes.filter(like => like !== userId),
                    likeCount: likeCount - 1
                });
            } else {
                // add the like if the user hasn't liked it yet
                setLikeStatus({
                    ...likeStatus,
                    liked: true,
                    likeCount: likeCount + 1
                });

                await updateDoc(hanjulRef, {
                    likes: [...likes, userId],
                    likeCount: likeCount + 1
                });
            }
        }
    };
      

    

    return (
        <div className="hanjul">
            {
                editing ? (
                    <>
                        {isOwner && <>
                            <form onSubmit={onSubmit} className="container hanjulEdit">
                                <input type="text" placeholder="글 수정" value={newHanjul} required onChange={onChange} autoFocus className="formInput" />
                                <input type="submit" value="업데이트" className="formBtn" />
                            </form>
                            <button onClick={toggleEditing} className="formBtn cancelBtn">취소</button>
                        </>}
                    </>

                ) : (
                    <>
                        <h4>{hanjulObj.text}</h4>

                        <CheckBox name='hashtag' >
                        {hanjulObj.hashtags}
                        </CheckBox>

                        <div>
                            {!isOwner && <button onClick={() => {handleLike(hanjulObj)}}>{likeStatus.liked ? (
            <FontAwesomeIcon icon={faHeart} />
          ) : (
            <FontAwesomeIcon icon={FaHeartRegular} />
          )} {likeStatus.likeCount}</button>}
                        </div>
                
                        {isOwner && (
                            
            <div className="hanjul__actions">
            <span onClick={onDeleteClick}>
              <FontAwesomeIcon icon={faTrash} />
            </span>
            <span onClick={toggleEditing}>
              <FontAwesomeIcon icon={faPencilAlt} />
            </span>
          </div>
                        )}
                    </>
                )}
        </div>
    );
};

export default Hanjul;
