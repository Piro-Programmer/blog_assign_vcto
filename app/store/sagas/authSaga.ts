import { call, put, takeLatest } from 'redux-saga/effects';
import { loginFailure, loginRequest, loginSuccess } from '../slices/authSlice';
import { loginUser } from '../../lib/authService';
import type { AuthUser, LoginPayload } from '../../lib/authService';

function* handleLogin(action: PayloadAction<LoginPayload>): Generator {
  try {
    const user = (yield call(loginUser, action.payload)) as AuthUser;

    if (typeof window !== 'undefined') {
      localStorage.setItem('token', user.token);
    }

    yield put(loginSuccess(user));
  } catch (error: unknown) {
    const err = error as {
      message?: string;
      response?: { data?: { message?: string } };
    };

    yield put(
      loginFailure(err.response?.data?.message || err.message || 'Login failed')
    );
  }
}

export default function* authSaga(): Generator {
  yield takeLatest(loginRequest.type, handleLogin);
}
