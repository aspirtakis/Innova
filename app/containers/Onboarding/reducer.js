/*
 *
 * Onboarding reducer
 *
 */
import produce from "immer";
import { DEFAULT_ACTION } from "./constants";

import {
  IDEAS_LOADED,
  IDEAS_FAILED,
  IDEAS_LOADING
} from './constants';

export const initialState = {

  ideas: [],

};

/* eslint-disable default-case, no-param-reassign */
const onboardingReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case IDEAS_LOADED: {
        ideas.authenticationErrorMessage = action.message;
        break;
      }

    }
  });

export default onboardingReducer;
