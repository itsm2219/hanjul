import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const HASHTAGS = [
  ['#기쁨', 100],
  ['#슬픔', 101],
  ['#화남', 102],
  ['#우울', 103],
  ['#즐거움', 104],
  ['#감동', 105],
  ['#무기력', 106],
  ['#분노', 107],
  ['#희망', 108],
  ['#걱정', 109],
  ['#기대', 110],
  ['#외로움', 111],

];

const Container = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  row-gap: 10px;
  margin-bottom: 10px;
`;

const Span = styled.span`
  width: 90%;
  height: 20px;
  line-height: 20px;
`;

const CheckBoxContainer = styled.div`
  width: 90%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  column-gap: 4px;
  row-gap: 8px;
  flex-wrap: wrap;
`;

const CheckBox = styled.div`
  width: 60px;
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

const HashtagButton = ({ tag, selectHashtag, hashDefault }) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(false);
  }, [hashDefault]);

  const onHandleClick = (event) => {
    setSelected(!selected);
    selectHashtag(event.target.innerText);
  };

  return (
    <CheckBox name='hashtag' selected={selected} onClick={onHandleClick}>
      {tag}
    </CheckBox>
  );
};

const Hashtag = ({
  selectedHashtagArray,
  setHashtagsArray,
  hashDefault,
  setHashDefault,
}) => {
  useEffect(() => {
    if (hashDefault) {
      setHashDefault(false);
    }
  }, [hashDefault]);

  const selectHashtag = (now) => {
    if (selectedHashtagArray.includes(now)) {
      const temp = selectedHashtagArray.filter((tag) => tag !== now);
      setHashtagsArray(temp);
    } else {
      setHashtagsArray([...selectedHashtagArray, now]);
    }
  };

  return (
    <Container>
      <Span>#감정을 고르시오</Span>
      <CheckBoxContainer>
        {HASHTAGS.map(([tag, id]) => (
          <HashtagButton
            key={id}
            tag={tag}
            selectHashtag={selectHashtag}
            hashDefault={hashDefault}
          />
        ))}
      </CheckBoxContainer>
    </Container>
  );
};

export default Hashtag;
