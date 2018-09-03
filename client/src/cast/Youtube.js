import React, { Component } from 'react';
import YoutubePlayer from 'react-youtube';

import './Youtube.css';

const PLAYING = 0;
const PAUSED = 1;

class Youtube extends Component {

    constructor(props) {
        super(props);
        this.state = {queue: [{id: '0'}], playingIndex: 0, playerState: PLAYING};

        this._onEnd = this._onEnd.bind(this);
        this._onReady = this._onReady.bind(this);
    }

    componentDidMount() {
        this.update();
        this.interval = setInterval(() => this.update(), 1000);
    }

    update() {
        fetch('/yt')
        .then(response => response.json())
        .then(data => {

            if (this.state.playerState !== data.playerState) {
            
                switch(data.playerState) {
                
                    case PLAYING:
                        this.player.playVideo();
                        break;
                    case PAUSED:
                        this.player.pauseVideo();
                        break;
                    default:
                        break;
                
                }
            }
            
            this.setState(data);
        });
    }

    _onEnd(event) {
        fetch('/yt/next');
        this.setState({playingIndex: this.state.playingIndex+1});
    }

    _onReady(event) {
        this.player = event.target;
    }

    render() {

        const opts = {
            height: '100%',
            width: '100%',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
                controls: 0,
                iv_load_policy: 3,
                disablekb: 1,
                rel: 0
            }
        };

        return (
            <div className='player'>
            <YoutubePlayer
                videoId={this.state.queue[this.state.playingIndex] ? this.state.queue[this.state.playingIndex].id : null}
                opts={opts}
                onReady={this._onReady}
                onEnd={this._onEnd}
            />
            </div>
        );
    }
}

export default Youtube;
