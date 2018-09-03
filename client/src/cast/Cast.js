import React, { Component } from 'react';
// import logo from './logo.svg';
import './Cast.css';

import Bus from './Bus.js';
import Welcome from './Welcome.js';
import Youtube from './Youtube.js';

class Cast extends Component {

    constructor(props) {
        super(props);

        this.state = {idle: true, ip: "No connection"};
    }

    componentDidMount() {
        this.update();
        this.interval = setInterval(() => this.update(), 1000);
    }

    update() {
        fetch('/status')
        .then(response => response.json())
        .then(data => this.setState(data));
    }


  render() {

    let main = this.state.idle ? <Welcome ip={this.state.ip}/> : <Youtube/>;

    return (
      <div className="Cast">
        {main}
      </div>
    );
  }
}

export default Cast;
