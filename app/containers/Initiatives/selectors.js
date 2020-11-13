import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the initiatives state domain
 */

const selectInitiativesDomain = state => state.initiatives || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Initiatives
 */

const makeSelectInitiatives = () =>
  createSelector(
    selectInitiativesDomain,
    substate => substate
  );

export default makeSelectInitiatives;
export { selectInitiativesDomain };
