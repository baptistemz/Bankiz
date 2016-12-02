import {FETCH_MUSICS, PLAY_MUSIC_ON_PLAYER_1, PLAY_MUSIC_ON_PLAYER_2, PLAY_NEXT, STOP_PLAYER, ADD_TO_WAITING_LIST,SWITCH_PLAYERS, CHANGE_BALANCE} from '../actions/index'

const INITIAL_STATE = { search_term: '', all:[], music_1: null, music_2: null, balance:100, music_1_playing: false, music_2_playing:false, next_player: 1, mute_player:2, waiting_list: []};

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
  case FETCH_MUSICS:
    return {...state, search_term: action.payload.search_term, all: action.payload.videos.data.items}
  case PLAY_MUSIC_ON_PLAYER_1:
    return {...state, music_1: action.payload.music, next_player: 2}
  case PLAY_MUSIC_ON_PLAYER_2:
    return {...state, music_2: action.payload.music, next_player: 1}
  case ADD_TO_WAITING_LIST:
    return {...state, waiting_list: [...state.waiting_list, action.payload]}
  case CHANGE_BALANCE:
    return {...state, balance: action.payload}
  case PLAY_NEXT:
    const list = state.waiting_list
    if((list[0] === state.music_1)||(list[0] === state.music_2)){
      list.shift()
    }
    const music = state.waiting_list[0]
    if (action.payload === 1){
      return {...state, music_1: music}
    }else{
      return {...state, music_2: music}
    }
  case STOP_PLAYER:
    if (action.payload === 1){
      return {...state, music_1: null}
    }else{
      return {...state, music_2: null}
    }
  case SWITCH_PLAYERS:
    if (action.payload.old_player === 1){
      return {...state, music_1: null, next_player:2, balance: 100, mute_player:2}
    }else{
      return {...state, music_2: null, next_player:1, balance: 100, mute_player:1}
    }
  default:
    return state;
  }

}
