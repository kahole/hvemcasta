import React, { Component } from 'react';

import './Welcome.css';

class Welcome extends Component {
  render() {
    return (
        <div className='welcome'>
            <h1 className='message'>{this.props.ip}</h1>
        </div>
    );
  }
}

export default Welcome;
