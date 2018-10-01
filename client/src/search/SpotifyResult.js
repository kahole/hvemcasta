import React, { Component } from 'react';
import FA from 'react-fontawesome';
import './Search.css';

class Search extends Component {

    constructor(props) {
        super(props);

        this.state = { results: [] };
    }

    componentDidUpdate(prevProps) {

        if (this.props.query !== prevProps.query) {
            fetch('/spotify/search?query=' + this.props.query)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.setState({results: data.tracks});
                });
        }
    }

    queue(i) {

        if (window.confirm("Add to queue?")) {
            fetch('/spotify/queue/', {
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
                <img className='thumbnail' alt='thumbnail' src={r.album.images[1].url} />
                <div className='infoBox'>
                    <div className='title'>{r.name}</div>
                    <div className='spacer' />
                    <div className='channelTitle'>{r.artists[0].name}</div>
                </div>
                <div className='spacer' />
                <div className='rowBtn'><FA size='2x' name='plus' style={{ 'color': 'green', 'vertical-align': 'middle' }} /></div>
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
