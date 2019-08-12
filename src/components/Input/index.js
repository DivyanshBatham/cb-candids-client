import React from 'react';

class Input extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="Input">
        <input
          type={this.props.type}
          name={this.props.name}
          placeholder={this.props.placeholder}
          required
          autoComplete="false"
          onChange={this.props.onChange}
        />
        <label htmlFor={this.props.name} />
      </div>
    );
  }
}

export default Input;
