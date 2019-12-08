import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router/immutable';
import { scrollOpenViews, scrollOpenViewAndMenu } from 'utils/menuHelper';
import {
  SIGN_IN,
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


export function* fetchSignIn(action) {
  try {
    const { payload } = action;
    const url = 'https://aws.openinnovationhub.nl./api/v2/user/session';
    const apptoken =
      '36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88';
    console.log(payload);
    // here you can call your API in order to authenticate the user
    const res = [];

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'X-DreamFactory-API-Key': apptoken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(resdata => {
       const user = resdata;
      })

      .catch(response => console.log(response));
    if (user && user.session_token) {
      yield put({
        type: AUTHENTICATED,
        user: {
          name: user.first_name,
          email: user.email,
          token: user.session_token,
        },
      });
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

export function* fetchRegister(action) {
  try {
    // here you can call your API in order to register an user, for this demo just authenticate an user
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
  const isViewOpened = openViews.find(item => item.id === menuItem.id);
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
  register,
  resetPassword,
  onSelectedMenuChanged,
  onOpenView,
  onCloseView,
  onOpenDynamicView,
];
