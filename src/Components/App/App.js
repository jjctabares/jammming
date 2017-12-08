import React, { Component } from 'react';
import './App.css';
import Spotify from '../../util/Spotify';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';





class App extends Component {
  constructor(props) {
      super(props);

      this.state = {
        searchResults:
          [
            {id: 1, name:'name1', artist:'artist1', album:'album1', uri:'67yufhr23990ugf3'},
            {id: 2, name:'name2', artist:'artist2', album:'album2', uri:'67yufhr23990ugf4'},
            {id: 3, name:'name3', artist:'artist3', album:'album3',uri:'67yufhr23990ugf5'}
          ],
        playlistName : 'playlist1',
        playlistTracks :
        [
          {id: 4, name:'name4', artist:'artist4', album:'album4',uri:'67yufhr23990ugf6'},
          {id: 5, name:'name5', artist:'artist5', album:'album5',uri:'67yufhr23990ugf7'},
          {id: 6, name:'name6', artist:'artist6', album:'album6',uri:'67yufhr23990ugf8'}
        ]
      };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    }

    addTrack(track) {
      if (!this.state.playlistTracks.find(playlistTrack => playlistTrack.id === track.id)) {
        this.setState(prevState => ({
          playlistTracks: [...prevState.playlistTracks, track]
        }));
      }
    }

    removeTrack(track) {
      this.setState({
        playlistTracks: this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id)
      });
    }

    updatePlaylistName(name) {
      this.setState({
        playlistName : name
      })
    }

    savePlaylist() {
     const trackUris = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);

    }

    /*search(term) {
      console.log(term);
    }*/
    search(term) {
      Spotify.search(term).then(track =>{
        this.setState({
          searchResults: track
        });
      });
    }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
            <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
            </div>
         </div>
       </div>
    );
  }
}

export default App;
