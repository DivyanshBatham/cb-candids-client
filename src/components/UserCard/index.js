import React from 'react';
import './userCard.scss';

const UserCard = (props) => {
  const imgSrc =
    'https://cb-candids.s3.ap-south-1.amazonaws.com/users/5d638a5eaa02290018b109a2-large.png';
  const UserName = 'Dixit';
  return (
    <div className="userCard">
      <div style={{ backgroundImage: `url(${imgSrc})` }} className="userCard__image" />
      <span className="userCard__text">{UserName}</span>
    </div>
  );
};
export default UserCard;
