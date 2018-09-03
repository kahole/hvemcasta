import React, { Component } from 'react';
import FA from 'react-fontawesome';
import './Search.css';
import youtubeSearch from 'youtube-search';

const opts = {
    maxResults: 30,
    type: 'video',
    key: 'YOUTUBE_DATA_API_KEY'
};

class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {results: []};
        this.search = this.search.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    search(event) {
    
        window.document.activeElement.blur();

        youtubeSearch(this.state.query, opts, (err, results) => {
          if(err) return console.log(err);
            
            // console.log(results);
            this.setState({results: results});
        });

        event.preventDefault(); 
    }

    handleChange(event) {
        this.setState({query: event.target.value});
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
            <div className="Search">
                <form action='' onSubmit={this.search}>
                    <input className='searchField' type="search" placeholder='Search' value={this.state.query} onChange={this.handleChange} />
                </form>
                {results}
            </div>
        );
    }
}

export default Search;
