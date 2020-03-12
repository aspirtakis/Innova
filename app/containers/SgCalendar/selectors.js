import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the sgCalendar state domain
 */

const selectSgCalendarDomain = state => state.sgCalendar || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SgCalendar
 */

const makeSelectSgCalendar = () =>
  createSelector(
    selectSgCalendarDomain,
    substate => substate
  );

export default makeSelectSgCalendar;
export { selectSgCalendarDomain };
