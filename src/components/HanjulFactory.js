import { dbService } from "fBase";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const HanjulFactory = ({ userObj }) => {
  const [hanjul, setHanjul] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    if (hanjul === "") {
      return;
    }


    try {
        const hanjulObj = await addDoc(collection(dbService, "hanjuls"), {
            text: hanjul, createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        await addDoc(collection(dbService,"hanjuls"), hanjulObj);
        console.log("Document written with ID:", hanjulObj.id);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
    setHanjul("");
};

const onChange = (event) => {
    event.preventDefault();
    const {
        target: { value },
    } = event;
    setHanjul(value);
};


  return (
    <form onSubmit={onSubmit} className="factoryForm">
    <div className="factoryInput__container">
    <input className="factoryInput__input" value={hanjul} onChange={onChange} type="text" placeholder="오늘의 한 줄을 입력하세요" maxLength={200} />
    <input type="submit" value="&rarr;" className="factoryInput__arrow"  />
    </div>
    </form>
  );
};

export default HanjulFactory;