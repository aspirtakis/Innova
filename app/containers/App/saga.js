import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router/immutable';
import { scrollOpenViews, scrollOpenViewAndMenu } from 'utils/menuHelper';
import { backend } from '../../utils/config';
import { request } from '../../utils/request';

import {
  SIGN_IN,
  SIGN_OUT,
  SESSION_CHECK,
  AUTHENTICATED,
  AUTHENTICATION_FAILED,
  REGISTER,
  REGISTRATION_FAILED,
  RESET_PASSWORD,
  RESET_PASSWORD_FAILED,
  SELECT_MENU_ITEM,
  SELECTED_MENU_ITEM,
  OPEN_VIEW,
  OPENED_VIEW,
  OPENED_DYNAMIC_VIEW,
  CLOSE_VIEW,
  CLOSED_VIEW,
  OPEN_DYNAMIC_VIEW,
} from './constants';


export function* fetchSession() {
  try {
     console.log('FetchSession');
    const tok = localStorage.getItem('token');
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-DreamFactory-API-Key': backend.apptoken,
        'Content-Type': 'application/json',
        'X-DreamFactory-Session-Token': tok,
      },
    };
    const urlsession = backend.beUrl + backend.sessionUrl;
    const user = yield request(urlsession, options);
    // console.log(user);
    const options2 = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-DreamFactory-API-Key': backend.apptoken,
        'Content-Type': 'application/json',
      },
    };
    const urlsystem = backend.beUrl + backend.system;
    const users = yield request(urlsystem, options2);

    if (user.session_token) {
      yield put({
        type: AUTHENTICATED,
        user,
        users: users.resource,
      });
    }
  } catch (e) {
    yield put({
      type: AUTHENTICATION_FAILED,
      message: 'Session Expired',
    });
    yield put({ type: SIGN_OUT, message: 'Session Expired' });
    localStorage.clear();
  }
}


export function* fetchSignIn(action) {
  try {
    const { payload } = action;
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'X-DreamFactory-API-Key': backend.apptoken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
      }),
    };
    const urlsession = backend.beUrl + backend.sessionUrl;
    const response = yield request(urlsession, options);
    const user = response;


    if (user.session_token) {
      yield put({
        type: AUTHENTICATED,
        user,
      });
      localStorage.setItem('token', user.session_token);
    } else {
      yield put({
        type: AUTHENTICATION_FAILED,
        message: user.error.message,
      });
    }
  } catch (e) {
    yield put({ type: AUTHENTICATION_FAILED, message: e.message });
  }
}

export function* signIn() {
  yield takeLatest(SIGN_IN, fetchSignIn);
}


export function* sessionCheck() {
  yield takeLatest(SESSION_CHECK, fetchSession);
}


export function* fetchRegister(action) {
  try {
    yield put({
      type: AUTHENTICATED,
      user: {
        name: action.payload.fullName,
        email: action.payload.email,
        password: action.payload.password,
      },
    });
  } catch (e) {
    yield put({ type: REGISTRATION_FAILED, message: e.message });
  }
}

export function* register() {
  yield takeLatest(REGISTER, fetchRegister);
}

export function* fetchResetPassword(action) {
  try {
    const { payload } = action;
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'X-DreamFactory-API-Key': backend.apptoken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: payload.email,
        code: payload.code,
        new_password: payload.newpass,
      }),

    };
    const urlsession = backend.beUrl + backend.passrst;
    const response = yield request(urlsession, options);

    const options2 = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'X-DreamFactory-API-Key': backend.apptoken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: payload.email,
        password: payload.newpass,
      }),
    };
    const urlsession3 = backend.beUrl + backend.sessionUrl;
    const response3 = yield request(urlsession3, options2);
    const user = response3;


    if (user.session_token) {
      yield put({
        type: AUTHENTICATED,
        user,
      });
      localStorage.setItem('token', user.session_token);
    } else {
      yield put({
        type: AUTHENTICATION_FAILED,
        message: user.error.message,
      });
    }
  } catch (e) {
    yield put({ type: AUTHENTICATION_FAILED, message: e.message });
  }
}


export function* resetPassword() {
  yield takeLatest(RESET_PASSWORD, fetchResetPassword);
}

export function* navigateToUrl(action) {
  const { foundMenuItem, foundOpenViewItem, openViews } = action;
  if (foundMenuItem.url !== window.location.pathname) {
    yield put(push(foundMenuItem.url));
  }
  yield put({ type: SELECTED_MENU_ITEM, foundMenuItem, foundOpenViewItem });
  scrollOpenViewAndMenu(openViews);
}

export function* onSelectedMenuChanged() {
  yield takeLatest(SELECT_MENU_ITEM, navigateToUrl);
}

export function* closeView(action) {
  const { foundMenuItem, foundOpenViewItem, idsToBeRemoved } = action;
  yield put(push(foundMenuItem.url));
  yield put({ type: SELECTED_MENU_ITEM, foundMenuItem, foundOpenViewItem });
  yield put({ type: CLOSED_VIEW, idsToBeRemoved });
}

export function* onCloseView() {
  yield takeLatest(CLOSE_VIEW, closeView);
}

export function* openView(action) {
  const { menuItem, icon, openViews } = action;
  const isViewOpened = openViews.find((item) => item.id === menuItem.id);
  if (menuItem.url !== window.location.pathname) {
    yield put(push(menuItem.url));
  }
  if (!isViewOpened) {
    yield put({ type: OPENED_VIEW, menuItem, icon });
  }
  yield put({
    type: SELECTED_MENU_ITEM,
    foundMenuItem: menuItem,
    foundOpenViewItem: menuItem,
  });
  if (!isViewOpened) {
    openViews.push(menuItem);
  }
  scrollOpenViews(openViews);
}

export function* onOpenView() {
  yield takeLatest(OPEN_VIEW, openView);
}

export function* openDynamicView(action) {
  const { dynamicItem, parentItem, openViews } = action;

  if (dynamicItem.url !== window.location.pathname) {
    yield put(push(dynamicItem.url));
  }
  yield put({
    type: OPENED_DYNAMIC_VIEW,
    dynamicItem,
    parentItem,
  });
  yield put({
    type: SELECTED_MENU_ITEM,
    foundMenuItem: dynamicItem,
    foundOpenViewItem: dynamicItem,
  });

  openViews.push(dynamicItem);
  scrollOpenViews(openViews);
}

export function* onOpenDynamicView() {
  yield takeLatest(OPEN_DYNAMIC_VIEW, openDynamicView);
}

// All sagas to be loaded
export default [
  signIn,
  sessionCheck,
  register,
  resetPassword,
  onSelectedMenuChanged,
  onOpenView,
  onCloseView,
  onOpenDynamicView,
];
