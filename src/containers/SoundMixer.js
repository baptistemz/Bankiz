import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeBalance, playNext, startPlayer, stopPlayer, switchPlayers} from '../actions/index';
import React from 'react'
import VideoPlayer from '../components/VideoPlayer'
import WaitingList from '../components/WaitingList'

class SoundMixer extends React.Component {
  constructor(props){
    super(props);
    this.state={
      to_switch: 1,
      forceFirstPlayer: false,
      forceSecondPlayer: false
    }
  }
  forcePlayer(origin_player){
    if (origin_player===2){
      this.setState({forceFirstPlayer: true});
      this.setState({forceFirstPlayer: false});
    }else{
      this.setState({forceSecondPlayer: true});
      this.setState({forceSecondPlayer: false});
    }
  }
  nextVideo(player){
    if(this.props.waiting_list.length > 0){
      this.props.playNext(player)
    }
  }
  switchPlayers(old_player){
    if(this.props.music_1 && this.props.music_2){
      this.props.switchPlayers(old_player)
      const new_player = old_player === 1 ? 2 : 1
      this.setState({to_switch: new_player})
      this.props.playNext(old_player)
    }
  }
  setPlayingAt(player, statement){
    statement ? this.props.startPlayer(player) : this.props.stopPlayer(player)
  }
  fade(player){
    const balance = this.props.balance
    if (balance > -1 && balance < 101){
      this.props.changeBalance(balance-5)
    }
  }
  videoPlayer(music, num){
    const isFirstMusic = !this.props.music_2
    const toSwitch = (this.state.to_switch===num)
    const alignRight = (isFirstMusic||toSwitch)
    return <VideoPlayer video={music}
      balance={Number(this.props.balance)}
      number={num}
      fadeOut={this.fade.bind(this)}
      onVideoEnd={this.switchPlayers.bind(this)}
      forceOtherPlayer={this.forcePlayer.bind(this)}
      forcePlay={num === 1 ? this.state.forceFirstPlayer : this.state.forceSecondPlayer}
      setPlayingAt={this.setPlayingAt.bind(this)}
      isFirstMusic={isFirstMusic}
      alignRight={alignRight}/>
  }
  // firstVideoPlayer(){
  //   const first_player = this.props.music_1
  //   if (first_player){
  //     const isFirstMusic = !this.props.music_2
  //     return <VideoPlayer video={first_player}
  //       volume={Number(this.props.balance)}
  //       number={1}
  //       fadeOut={this.fade.bind(this)}
  //       onVideoEnd={this.nextVideo.bind(this)}
  //       setPlayingAt={this.setPlayingAt.bind(this)}
  //       playing={{this: this.props.music_2_playing, other: this.props.music_1_playing}}
  //       forcePlay={this.state.forceFirstPlayer}
  //       forceOtherPlayer={this.forcePlayer.bind(this)}
  //       isFirstMusic={isFirstMusic}/>
  //   }else{
  //     return <div>Waiting for a music</div>
  //   }
  // }
  // secondVideoPlayer(){
  //   const second_player = this.props.music_2
  //   if (second_player){
  //     return <VideoPlayer video={second_player}
  //       volume={Number(this.props.balance)}
  //       number={2}
  //       fadeOut={this.fade.bind(this)}
  //       onVideoEnd={this.nextVideo.bind(this)}
  //       setPlayingAt={this.setPlayingAt.bind(this)}
  //       playing={{this: this.props.music_2_playing, other: this.props.music_1_playing}}
  //       forcePlay={this.state.forceSecondPlayer}
  //       forceOtherPlayer={this.forcePlayer.bind(this)}/>
  //   }
  // }
  onBalanceChange(balance){
    this.props.changeBalance(balance)
  }
  music(music, num){
    if(music){
      return this.videoPlayer(music, num)
    }else{
      return <div>Waiting for a cool song</div>
    }
  }
  render(){
    return(
      <div className="row">
        {this.music(this.props.music_1, 1)}
        {this.music(this.props.music_2, 2)}
        <div className="col s5"></div>
        <div className="col s2">
          <div id="logo-sound-group">
            <img src="img/logo1.png" id="logo" alt=""/>
            <form action="#">
              <input type="range" value={this.props.balance} min="0" max="100"
                onChange = {event => this.onBalanceChange(event.target.value)}/>
            </form>
          </div>
        </div>
        <div className="col s12">
          <WaitingList list={this.props.waiting_list}/>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({changeBalance, playNext, startPlayer, stopPlayer, switchPlayers}, dispatch);
}
function mapStateToProps({music}){
  return {
    music_1: music.music_1,
    music_2: music.music_2,
    balance: music.balance,
    music_1_playing: music.music_1_playing,
    music_2_playing: music.music_2_playing,
    waiting_list: music.waiting_list
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SoundMixer)
