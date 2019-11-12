import React, { useState } from 'react';
import './notificationCard.scss';
import RandomColor from '../../helpers/RandomColor';

const NotificationCard = (props) => {
  const [currentBackgroundColor] = useState(RandomColor.getLightColorGuaranteed() );
  const imgSrc =
    'https://cb-candids.s3.ap-south-1.amazonaws.com/users/5d638a5eaa02290018b109a2.png';
  const author = 'Dixit';
  const notificationMessage = 'commented:"This is amazing man adsfaf"';
  const time = '15m';
  return (
    <div className="notificationCard">
      <img
        src={imgSrc}
        alt="author"
        className="notificationCard__commentedUser"
      />
      <div
        className="notificationCard__card"
        style={{ backgroundColor: `${currentBackgroundColor}` }}
      >
        <div className="notificationCard__card__texts">
          <span className="notificationCard__card__texts__medium">
            {author}
          </span>
          <span className="notificationCard__card__texts__lightText">
            {notificationMessage}
          </span>
          <span className="notificationCard__card__texts__time">{time}</span>
        </div>
        <img
          src={imgSrc}
          alt="author"
          className="notificationCard__card__postImage"
        />
      </div>
    </div>
  );
};
export default NotificationCard;
