import React from 'react';
import HanjulFactory from 'components/HanjulFactory';

//const HotPost= () => <span>HotPost</span>;
const HotPost = ({ userObj }) => {

return (
  <div className="container">          

      <HanjulFactory userObj={userObj} />

  </div>
);
};
export default HotPost;