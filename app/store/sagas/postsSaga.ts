import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostsFailure
} from '../slices/postsSlice';

import { getAllPosts } from '../../lib/postsService';
import { PostsResponse } from '../../lib/postsService';

function* fetchPostsSaga(): Generator {
  console.log('Saga Called');
  try {
    const posts = (yield call(getAllPosts, 10, 0)) as any;
    console.log('Posts', posts);
    yield put(fetchPostsSuccess(posts));
  } catch (error: unknown) {
    const err = error as Error;

    yield put(fetchPostsFailure(err.message || 'Something went wrong'));
  }
}

export default function* postsSaga(): Generator {
  yield takeLatest(fetchPostsRequest.type, fetchPostsSaga);
}

