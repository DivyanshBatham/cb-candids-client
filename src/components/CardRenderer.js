import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

class CardRenderer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { posts } = this.props;
    return (
      <div>
        {
         posts && posts.map(post => <Card key={post._id} post={post} />)
        }
      </div>
    );
  }
}

CardRenderer.propTypes = {
  posts: PropTypes.oneOfType([
    PropTypes.array,
  ]),
};

CardRenderer.defaultProps = {
  posts: [],
};
export default CardRenderer;
