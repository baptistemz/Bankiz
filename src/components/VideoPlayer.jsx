import React from 'react';
import Youtube from 'react-youtube';
import ReactDOM from 'react-dom';

export default class VideoPlayer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      videoId : props.video.id.videoId,
      thumbnail: this.props.alignRight ? 'right' : 'left',
      player: null,
      ended: false
    }
    this.onReady = this.onReady.bind(this)
  }
  componentDidMount(){
    this.props.alignRight ? this.align('right') : this.align('left')
  }
  componentDidUpdate(oldProps){
    if(!oldProps.alignRight && this.props.alignRight){
      this.align('right')
    }
  }
  align(side){
    const classes= ReactDOM.findDOMNode(this).className;
    if(side==='right'){
      this.setState({thumbnail: 'right'})
      classes.indexOf(' left-thumbnail') !== -1 ? ReactDOM.findDOMNode(this).className = classes.replace(' left-thumbnail',' right-thumbnail') : ReactDOM.findDOMNode(this).className = classes.concat(" right-thumbnail");
    }else{
      this.setState({thumbnail: 'left'})
      classes.indexOf(' right-thumbnail') !== -1 ? ReactDOM.findDOMNode(this).className = classes.replace(' right-thumbnail',' left-thumbnail') : ReactDOM.findDOMNode(this).className = classes.concat(" left-thumbnail");
    }
  }
  onReady(event) {
    this.setState({
      player: event.target,
    });
    const player = this.state.player;
    if(this.props.isFirstMusic){
      player.playVideo()
    }
    this.detectEnd(player)
  }

  detectEnd(player){
    const updateTime = function(player){
      let videotime = 0;
      let timeupdater = null;
      let oldTime = videotime;
      const transitionTime = player.getDuration()-20;
      if(this.state.ended||player.getCurrentTime()===player.getDuration()){
        clearInterval(fadeLoop);
      }else{
        if(player && player.getCurrentTime()) {
          videotime = player.getCurrentTime();
        }
        if(videotime !== oldTime) {
          this.onProgress(Math.trunc(videotime), Math.trunc(transitionTime));
        }
      }
    }
    const fadeLoop = setInterval(updateTime.bind(this, player), 1000);
  }
  onProgress(currentTime, transitionTime){
    // 20 seconds before the end of the video, this will be called.
    if(currentTime >= transitionTime ) {
      this.props.forceOtherPlayer(this.props.number)
      this.props.fadeOut(this.props.number)
    }
  }
  onStateChange(event) {
    switch (event.data) {
      case -1:
        console.log(5)
        this.onReady(event)
        break;
      case 0:
        this.setState({ended:true})
        this.props.onVideoEnd(this.props.number)
        break;
      case 1:
        console.log(1)
        break;
      case 2:
        console.log(2)
        break;
      case 3:
        console.log(3)
        break;
      case 4:
        console.log(4)
        break;
      case 5:
        console.log(5)
        this.onReady(event)
        break;
    }
  }
  render(){
    if(this.props.forcePlay){this.state.player.playVideo()}
    const video = this.props.video
    const videoId = video.id.videoId;
    // const url = `//www.youtube.com/embed/${video.id.videoId}?color=white&enablejsapi=1&modestbranding=1&autoplay=0&origin=http://localhost:8080`;
    if(this.state.player){
      const player= this.state.player
      if(this.state.thumbnail === 'right'){
        player.setVolume(this.props.balance)
      }else {
        player.setVolume(100 - this.props.balance)
      }
      // if VideoId has changed (if it's not contained in the url of the video played by
      //  the player),  ==>> play new video in the player
      // if(player.getVideoUrl().indexOf(videoId) === -1){
      //   player.loadVideoById(videoId);
      //   this.align('left')
      // }
    }
    const opts = {
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
        color: 'white',
        controls:1,
        enablejsapi: 1,
        modestbranding: 1,
        disablekb:1,
        fs: 1
      }
    };
    return(
      <div className="video-container">
        <Youtube videoId={this.props.video.id.videoId}
          onReady={this.onReady.bind(this)}
          opts={opts}
          onStateChange={this.onStateChange.bind(this)}/>
        <h5>{this.props.video.snippet.title}</h5>
      </div>
    );
  }
}
