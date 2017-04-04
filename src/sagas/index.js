import { apply, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import GameApi from '../services/Game';

const Api = new GameApi();

function* fetchPlayers(action) {
  try {
    const data = yield apply(Api, Api.fetchPlayers);
    yield put({type: 'FETCH_PLAYERS_SUCCESS', data: data});
  } catch (e) {
    yield put({type: 'FETCH_PLAYERS_FAILURE'});
  }
}

function* newGame(action) {
  try {
    const data = yield apply(Api, Api.newGame);
    yield put({type: 'REGISTER_MOVE_SUCCESS', board: data.board, players: data.players, result: data.result, turn: data.turn});
  } catch (e) {
    yield put({type: 'REGISTER_MOVE_FAILURE'});
  }
}

function* registerMove(action) {
  try {
    const data = yield apply(Api, Api.registerMove, [action.position]);
    yield put({type: 'REGISTER_MOVE_SUCCESS', board: data.board, players: data.players, result: data.result, turn: data.turn});
  } catch (e) {
    yield put({type: 'REGISTER_MOVE_FAILURE'});
  }
}

function* sendPlayersName(action) {
  try {
    const data = yield apply(Api, Api.startGame, [action.playerX, action.playerO]);
    yield put({type: 'SEND_PLAYERS_NAME_SUCCESS', board: data.board, players: data.players, result: data.result, turn: data.turn});
  } catch (e) {
    yield put({type: 'SEND_PLAYERS_NAME_FAILURE'});
  }
}

function* gameSaga() {
  yield takeLatest("FETCH_PLAYERS", fetchPlayers);
  yield takeLatest("NEW_GAME", newGame);
  yield takeLatest("REGISTER_MOVE", registerMove);
  yield takeLatest("SEND_PLAYERS_NAME", sendPlayersName);
}

export default gameSaga;