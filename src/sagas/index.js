import { apply, put, takeLatest } from 'redux-saga/effects';
import GameApi from '../services/Game';

const Api = new GameApi();

export function* fetchPlayers() {
  try {
    const data = yield apply(Api, Api.fetchPlayers);
    yield put({type: 'FETCH_PLAYERS_SUCCESS', data: data});
  } catch (e) {
    throw new Erro('Player could not be fetch.');
  }
}

export function* newGame() {
  try {
    const data = yield apply(Api, Api.newGame);
    yield put({type: 'NEW_GAME_SUCCESS', board: data.board, players: data.players, result: data.result, turn: data.turn});
  } catch (e) {
    throw new Error('New game could not be create.');
  }
}

export function* newRound() {
  try {
    const data = yield apply(Api, Api.newRound);
    yield put({type: 'NEW_ROUND_SUCCESS', board: data.board, players: data.players, result: data.result, turn: data.turn});
  } catch (e) {
    throw new Error('New round could not be set.');
  }
}

export function* registerMove(action) {
  try {
    const data = yield apply(Api, Api.registerMove, [action.position]);
    yield put({type: 'REGISTER_MOVE_SUCCESS', board: data.board, players: data.players, result: data.result, turn: data.turn});
  } catch (e) {
    throw new Error('Register move could not be set.');
  }
}

export function* resetGame() {
  try {
    const data = yield apply(Api, Api.newGame);
    yield put({type: 'RESET_GAME_SUCCESS', board: data.board, players: data.players, result: data.result, turn: data.turn});
  } catch (e) {
    throw new Error('Game could not be reset.');
  }
}

export function* sendPlayersName(action) {
  try {
    const data = yield apply(Api, Api.startGame, [action.playerX, action.playerO]);
    yield put({type: 'SEND_PLAYERS_NAME_SUCCESS', board: data.board, players: data.players, result: data.result, turn: data.turn});
  } catch (e) {
    throw new Error('Players name could not be sent.');
  }
}

export function* gameSaga() {
  yield takeLatest("FETCH_PLAYERS", fetchPlayers);
  yield takeLatest("NEW_GAME", newGame);
  yield takeLatest("NEW_ROUND", newRound);
  yield takeLatest("REGISTER_MOVE", registerMove);
  yield takeLatest("RESET_GAME", resetGame);
  yield takeLatest("SEND_PLAYERS_NAME", sendPlayersName);
}

export default gameSaga;