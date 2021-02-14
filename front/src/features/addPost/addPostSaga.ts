import { PayloadAction } from '@reduxjs/toolkit';
import { all, takeLatest, put, fork, call } from 'redux-saga/effects';
import { AddBookPostInterface } from '../../interfaces/PostList.interface';
import { addBookPostAPI } from '../../api/postBookApi';
import { addBookPostRequest, addBookPostSuccess, addBookPostError } from './addPostSlice';

interface addBookPostPayloadInterface {
  data: AddBookPostInterface
}

function* addBookPost(action: PayloadAction<addBookPostPayloadInterface>) {
  try {
    const result = yield call(addBookPostAPI, action.payload.data);
    yield put(addBookPostSuccess({ result }));
  } catch (error) {
    yield put(addBookPostError({ error: error.response.data }));
  }
}

function* watchAddBookPost() {
  yield takeLatest(addBookPostRequest, addBookPost);
}
export default function* addPostSaga():Generator {
  yield all([
    fork(watchAddBookPost),
  ]);
}
