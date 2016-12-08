import React from 'react';

const MusicListItem = (props) => {
  const imgUrl = props.music.snippet.thumbnails.default.url
  const background = {backgroundImage:`url(${imgUrl})`}
  return(

      <li className="col s12 m6 l4">
        <div className= 'card hoverable'>
          <div className="card-image">
            <div style={background} ></div>
            <p className="card-title truncate-block">{props.music.snippet.title}</p>
          </div>
          <div className="card-action">
            <a href='#' onClick= {props.onVideoSelect}><i className="material-icons">play_arrow</i>play next</a>
            <a href='#' onClick= {props.addVideoToList}><i className="material-icons">playlist_add</i>add</a>
          </div>
        </div>
      </li>
  );
};

export default MusicListItem
