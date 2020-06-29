import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the ideaonboard state domain
 */

const selectIdeaonboardDomain = state => state.ideaonboard || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Ideaonboard
 */

const makeSelectIdeaonboard = () =>
  createSelector(
    selectIdeaonboardDomain,
    substate => substate
  );

export default makeSelectIdeaonboard;
export { selectIdeaonboardDomain };
