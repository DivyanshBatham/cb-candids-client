import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../components/Loader';

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verified: false,
    };
  }
  componentDidMount() {
    const { token } = this.props.match.params;
    // console.log(token);
    // console.log(this.props);
    const url = 'https://calm-waters-47062.herokuapp.com/auth/verifyEmail';
    axios({
      method: 'post',
      url,
      data: {
        token,
      },
    })
      .then((res) => {
        console.log(res.data);
        const { success } = res.data;
        if (success) {
          localStorage.setItem('cb-token', res.data.token);
          localStorage.setItem('cb-email', res.data.data.user.email);
          localStorage.setItem('cb-username', res.data.data.user.username);
          this.setState({ verified: true });
        }
      })
      .catch(err => console.log(err));
  }
  render() {
    const { verified } = this.state;
    if (verified) {
      return <Redirect to="/" />;
    }
    return <div>{!verified && <Loader />}</div>;
  }
}

export default VerifyEmail;
