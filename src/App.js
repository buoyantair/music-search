import React, { Component } from 'react';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';
import RelatedArtists from './RelatedArtists';
import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: [],
      related_artists: null
    }
  }

  getArtist(){
    if(this.state.artist !== null){
      const BASE_URL = 'https://api.spotify.com/v1/artists/';
      let FETCH_URL = `${BASE_URL}${this.state.artist.id}/related-artists`
      fetch(FETCH_URL, {
        method: 'GET'
      })
      .then(response=> response.json())
      .then(json=>{
        this.setState({related_artists: json.artists})
      })
    }
  }

  search(query){
    const BASE_URL = "https://api.spotify.com/v1/search?";
    let FETCH_URL = `${BASE_URL}q=${!query ? this.state.query: query}&type=artist&limit=1`;
    const ALBUM_URL = `https://api.spotify.com/v1/artists/`;
    fetch(FETCH_URL, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      const artist = json.artists.items[0];
      this.setState({artist})
      FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
      fetch(FETCH_URL, {
        method: 'GET'
      })
      .then(response => response.json())
      .then(json => {
        const {tracks} = json;
        this.setState({tracks});
      })
    })
  }

  render(){
    return (
      <div className="app">
        <div className="app-title">Music Search </div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for an artist"
              value = {this.state.query}
              onChange={event => {this.setState({query: event.target.value})}}
              onKeyPress={event => {
                if(event.key === "Enter"){
                  this.getArtist();
                  this.search();
                }
              }}
            />
            <InputGroup.Addon
              onClick={
                ()=>{
                  this.search();
                  this.getArtist();
                }
              }
              >
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist !== null && this.state.related_artists !== null
                                  ? <div>
                                      <Profile
                                        artist={this.state.artist}
                                      />
                                      <Gallery
                                        tracks={this.state.tracks}
                                      />
                                      <RelatedArtists
                                        relatedartists={this.state.related_artists}
                                        search={this.search.bind(this)}
                                        getArtist={this.getArtist.bind(this)}
                                      />
                                  </div>
                                  : <div> Search for an artist! </div>
        }
      </div>
    )
  }
}

export default App;
