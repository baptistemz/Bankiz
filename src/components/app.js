import React from 'react';
import {Component} from 'react';
import SearchBar from '../containers/SearchBar';
import SoundMixer from '../containers/SoundMixer';
import MusicSearchList from '../containers/MusicSearchList';


export default class App extends Component {

    render() {
        return (
          <div className="container">
            <div className="margin-top-20">
              <SoundMixer/>
              <SearchBar />
              <MusicSearchList/>
            </div>
          </div>
        );
    }
}
