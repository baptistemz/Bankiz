import axios from 'axios';
import YTSearch from 'youtube-api-search';

const API_KEY = 'AIzaSyDaosxESYbzNrFkJ1vEXL3H7XiNGGEwAUM';
const ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';

export const FETCH_MUSICS = "FETCH_MUSICS";
export const PLAY_MUSIC_ON_PLAYER_1 = "PLAY_MUSIC_ON_PLAYER_1";
export const PLAY_MUSIC_ON_PLAYER_2 = "PLAY_MUSIC_ON_PLAYER_2";
export const CHANGE_BALANCE = "CHANGE_BALANCE";
export const PLAY_NEXT = "PLAY_NEXT";
export const START_PLAYER = "START_PLAYER";
export const STOP_PLAYER = "STOP_PLAYER";
export const ADD_TO_WAITING_LIST = "ADD_TO_WAITING_LIST";
export const SWITCH_PLAYERS = "SWITCH_PLAYERS";

export function fetchMusics(term){
  var params = {
    part: 'snippet',
    key: API_KEY,
    q: term,
    type: 'video',
    maxResults: 12
  };
  const request = axios.get(ROOT_URL, { params: params })
  return(dispatch) => {
    request.then(function(data) {
      dispatch({type: FETCH_MUSICS, payload: {search_term:term, videos:data}})
    });
  }
}

export function playMusic(player, music){
  return(dispatch) => {
    if (player===1) {
      dispatch({type: PLAY_MUSIC_ON_PLAYER_1, payload: {player:player, music:music}})
    }else{
      dispatch({type: PLAY_MUSIC_ON_PLAYER_2, payload: {player:player, music:music}})
    }
  }
}
export function addToWaitingList(music){
  return(dispatch) => {
    dispatch({type: ADD_TO_WAITING_LIST, payload: music})
  }
}
export function changeBalance(balance){
  return(dispatch) => {
    dispatch({type: CHANGE_BALANCE, payload: balance})
  }
}
export function playNext(player){
  return(dispatch) => {
    dispatch({type: PLAY_NEXT, payload: player})
  }
}
export function startPlayer(player){
  return(dispatch) => {
    dispatch({type: START_PLAYER, payload: player})
  }
}
export function stopPlayer(player){
  return(dispatch) => {
    dispatch({type: STOP_PLAYER, payload: player})
  }
}
export function switchPlayers(old_player){
  return(dispatch) => {
    dispatch({type: SWITCH_PLAYERS, payload:{old_player:old_player}})
  }
}
