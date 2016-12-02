import React from 'react';

const MusicListItem = (props) => {
  const imgUrl = props.music.snippet.thumbnails.default.url
  return(

      <li className="col s12 m6 l4">
        <div className= 'card'>
          <div className="card-image">
            <img src={imgUrl}/>
            <p className="card-title">{props.music.snippet.title}</p>
          </div>
          <div className="card-action">
            <a href='#' onClick= {props.onVideoSelect}><i className="material-icons">play_arrow</i>play</a>
            <a href='#' onClick= {props.addVideoToList}><i className="material-icons">playlist_add</i>add</a>
          </div>
        </div>
      </li>
  );
};

export default MusicListItem
