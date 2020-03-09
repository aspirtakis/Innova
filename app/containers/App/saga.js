import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router/immutable';
import { scrollOpenViews, scrollOpenViewAndMenu } from 'utils/menuHelper';
import { backend } from '../../utils/config';
import { request } from '../../utils/request';

import {
  SIGN_IN,
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
    console.log('SASASDAS');
    const tok = localStorage.getItem('token');
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-DreamFactory-API-Key': backend.apptoken,
        'Content-Type': 'application/json',
        'X-DreamFactory-Session-Token': '',
      },
    };
    const urlsession = backend.beUrl + backend.sessionUrl;
    const user = yield request(urlsession, options);

    if (user) {
      yield put({
        type: AUTHENTICATED,
        user,
      });
    }
  } catch (e) {
    yield put({ type: AUTHENTICATION_FAILED, message: "SessionExpired" });
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
    console.log(user);

    if (user) {
      yield put({
        type: AUTHENTICATED,
        user,
      });
      localStorage.setItem('token', user.session_token);
    } else {
      yield put({
        type: AUTHENTICATION_FAILED,
        message: 'Wrong user or password, please try again.',
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
        name: 'John Smith',
        email: action.payload.email,
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
    // here you can call your API in order to reset the password, for this demo just authenticate an user
    yield put({
      type: AUTHENTICATED,
      user: {
        name: 'John Smith',
        email: action.payload.email,
      },
    });
  } catch (e) {
    yield put({ type: RESET_PASSWORD_FAILED, message: e.message });
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
