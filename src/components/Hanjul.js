import { dbService } from "../fBase";
import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Hanjul = ({ hanjulObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newHanjul, setNewHanjul] = useState(hanjulObj.text);
    const HanjulTextRef = doc(dbService, "hanjuls", `${hanjulObj.id}`);
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