import React, { Component } from 'react';
import FA from 'react-fontawesome';
import './Search.css';
import youtubeSearch from 'youtube-search';

const opts = {
    maxResults: 45,
    type: 'video',
    key: 'YOUTUBE_DATA_API_KEY'
};

class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {results: []};
    }

    componentDidUpdate(prevProps) {

        if (this.props.query !== prevProps.query) {
            youtubeSearch(this.props.query, opts, (err, results) => {
                if(err) return console.log(err);
                this.setState({results: results});
              });
        }
    }

    queue(i) {

        if (window.confirm("Add to queue?")) {
            fetch('/yt/queue/', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify(this.state.results[i])
            });
        }
    }

    render() {
        let results = this.state.results.map((r, i) => {
           return <div className='result' key={r.id} onClick={this.queue.bind(this, i)}>
                    <img className='thumbnail' alt='thumbnail' src={r.thumbnails.medium.url}/>
                    <div className='infoBox'>
                        <div className='title'>{r.title}</div>
                        <div className='spacer' />
                        <div className='channelTitle'>{r.channelTitle}</div>
                    </div>
                    <div className='spacer' />
                    <div className='rowBtn'><FA size='2x' name='plus' style={{'color': 'green', 'vertical-align': 'middle'}} /></div>
                </div>;
        });

        if (results.length === 0) {
            results = <div className='helper'><FA size='5x' name='hand-o-up' /></div>;
        }

        return (
            <div>
                {results}
            </div>
        );
    }
}

export default Search;
