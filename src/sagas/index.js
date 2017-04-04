import { apply, put, takeLatest } from 'redux-saga/effects';
import GameApi from '../services/Game';

const Api = new GameApi();

export function* fetchPlayers(action) {
  try {
    const data = yield apply(Api, Api.fetchPlayers);
    yield put({type: 'FETCH_PLAYERS_SUCCESS', data: data});
  } catch (e) {
    yield put({type: 'FETCH_PLAYERS_FAILURE'});
  }
}

export function* newGame(action) {
  try {
    const data = yield apply(Api, Api.newGame);
    yield put({type: 'NEW_GAME_SUCCESS', board: data.board, players: data.players, result: data.result, turn: data.turn});
  } catch (e) {
    yield put({type: 'NEW_GAME_FAILURE'});
  }
}

export function* newRound(action) {
  try {
    const data = yield apply(Api, Api.newRound);
    yield put({type: 'NEW_ROUND_SUCCESS', board: data.board, players: data.players, result: data.result, turn: data.turn});
  } catch (e) {
    yield put({type: 'NEW_ROUND_FAILURE'});
  }
}

export function* registerMove(action) {
  try {
    const data = yield apply(Api, Api.registerMove, [action.position]);
    yield put({type: 'REGISTER_MOVE_SUCCESS', board: data.board, players: data.players, result: data.result, turn: data.turn});
  } catch (e) {
    yield put({type: 'REGISTER_MOVE_FAILURE'});
  }
}

export function* sendPlayersName(action) {
  try {
    const data = yield apply(Api, Api.startGame, [action.playerX, action.playerO]);
    yield put({type: 'SEND_PLAYERS_NAME_SUCCESS', board: data.board, players: data.players, result: data.result, turn: data.turn});
  } catch (e) {
    yield put({type: 'SEND_PLAYERS_NAME_FAILURE'});
  }
}

export function* gameSaga() {
  yield takeLatest("FETCH_PLAYERS", fetchPlayers);
  yield takeLatest("NEW_GAME", newGame);
  yield takeLatest("NEW_ROUND", newRound);
  yield takeLatest("REGISTER_MOVE", registerMove);
  yield takeLatest("SEND_PLAYERS_NAME", sendPlayersName);
}

export default gameSaga;