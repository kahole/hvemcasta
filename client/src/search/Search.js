import React, { Component } from 'react';
import './Search.css';
import youtubeLogo from './youtube_logo.png';
import YoutubeResult from './YoutubeResult.js';
import SpotifyResult from './SpotifyResult.js';

class Search extends Component {

    constructor(props) {
        super(props);

        this.state = { tab: 0, query: "", tempQuery: "" };
        this.search = this.search.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    search(event) {

        window.document.activeElement.blur();

        //update ??
        this.setState({ query: this.state.tempQuery });

        event.preventDefault();
    }

    handleChange(event) {
        this.setState({ tempQuery: event.target.value });
    }

    changeTab = (tab) => {
        this.setState({ tab });
    }

    render() {

        return (
            <div className="Search">
                {/* <div className='ytLogoContainer'><img className='ytLogo' src={youtubeLogo}></img></div> */}
                <div className='tabSwitch'>
                    <div className={'tabBtn ' + (this.state.tab === 0 ? 'tabBtnActive' : '')} onClick={() => { this.changeTab(0) }}>Youtube</div>
                    <div className={'tabBtn ' + (this.state.tab === 1 ? 'tabBtnActive' : '')} onClick={() => { this.changeTab(1) }}>Spotify</div>
                </div>
                <form action='' onSubmit={this.search}>
                    <input className='searchField' type="search" placeholder='Search' value={this.state.tempQuery} onChange={this.handleChange} />
                </form>
                {this.state.tab === 0 ?
                    <YoutubeResult query={this.state.query} />
                    : <SpotifyResult query={this.state.query} />}
            </div>
        );
    }
}

export default Search;
