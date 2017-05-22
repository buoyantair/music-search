import React, {Component} from 'react';
import './App.css';

class RelatedArtists extends Component{

  render(){
    return(
      <div>
        <h1>Related Artists</h1>
        <div className='featured'>
            {
              this.props.relatedartists.map((artist, index)=>{
                return (
                  <button
                    key={index}
                    onClick={
                      ()=>{
                        this.props.search(artist.name);
                        this.props.getArtist();
                        window.scroll(0,0);
                      }
                    }
                    className="artist"
                    >
                    <img src={artist.images[0].url} alt="Artist profile pic" className="artist-img"/>
                    <p className="artist-name">
                      {artist.name}
                    </p>
                  </button>
                )
              })
            }
        </div>
      </div>
    )
  }
}

export default RelatedArtists;
