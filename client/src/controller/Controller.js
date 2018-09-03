import React, { Component } from 'react';
import FA from 'react-fontawesome';
import './Controller.css';

const PLAYING = 0;
const PAUSED = 1;

class Controller extends Component {

    constructor(props) {
        super(props);

        this.state = {queue: [], playingIndex: 0, playerState: PLAYING};
        this.playPause = this.playPause.bind(this);
    }

    componentDidMount() {
        this.update();
        this.interval = setInterval(() => this.update(), 1000);
    }

    update() {
        fetch('/yt')
        .then(response => response.json())
        .then(data => {

            this.setState(data);
        });
    }

    playPause() {
        if (this.state.playerState === PLAYING) {
            fetch('/yt/pause');
        } else {
            fetch('/yt/play');
        }
    }

    prev() {
        fetch('/yt/prev');
    }

    next() {
        fetch('/yt/next');
    }

    addVideo() {
        window.location.href = '/search';
    }

    removeFromQueue(id) {
        if (window.confirm("Remove from queue?")) {
            fetch('/yt/removeFromQueue/' + id);
        }
    }

    playPauseIcon() {
        if (this.state.playerState === PLAYING) {
            return <FA size='3x' name='pause' />
        } else {
            return <FA size='3x' name='play' />
        }
    }

    render() {
        let nextUp = this.state.queue.slice(this.state.playingIndex + 1);
        let queue = nextUp.map(r => {
           return <div className='result' key={r.id}>
                    <img className='thumbnail' alt='thumbnail' src={r.thumbnails.medium.url}/>
                    <div className='infoBox'>
                        <div className='title'>{r.title}</div>
                        <div className='spacer' />
                        <div className='channelTitle'>{r.channelTitle}</div>
                    </div>
                    <div className='spacer' />
                    <div className='rowBtn' onClick={this.removeFromQueue.bind(this, r.id)}><FA size='2x' name='times' style={{'color': 'red', 'vertical-align': 'middle'}} /></div>
                </div>;
        });

        return (
            <div className='Controller'>
                <div className="ctrlCenter">
                    <div className='ctrlCell'>
                        <div onClick={this.prev} className='ctrlButton'><FA size='3x' name='step-backward' /></div>
                    </div>
                    <div className='ctrlCell'>
                        <div onClick={this.playPause} className='ctrlButton'>{this.playPauseIcon()}</div>
                    </div>
                    <div className='ctrlCell'>
                        <div onClick={this.next} className='ctrlButton'><FA size='3x' name='step-forward' /></div>
                    </div>
                    <div onClick={this.addVideo} className='addVideo'>
                        Add video <FA name='plus' style={{'vertical-align': 'middle'}} />
                    </div>
                </div>
                {queue}
            </div>
        );
    }
}

export default Controller;
