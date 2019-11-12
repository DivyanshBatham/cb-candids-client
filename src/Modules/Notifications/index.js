import React, { Component } from 'react';
import './notifications.scss';
import NotificationCard from '../../components/NotificationCard';
import Navbar from '../../components/Navbar';

class Notifications extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <Navbar
          showOptionsIcon
          options={[
            {
              title: (
                <label htmlFor="pushNotification">
                  Notification
                  <input
                    type="radio"
                    name="pushNotification"
                    id="pushNotification"
                  />
                </label>
              ),
              handleClick: () => alert('Handle Push'),
            },
          ]}
        />
        <div className="container container--removeTopPadding">
          <h2 className="sectionHeading">Notifications</h2>
          <NotificationCard />
        </div>
      </React.Fragment>
    );
  }
}

export default Notifications;
