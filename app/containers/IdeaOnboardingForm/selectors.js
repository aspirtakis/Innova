import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the ideaOnboardingForm state domain
 */

const selectIdeaOnboardingFormDomain = state =>
  state.ideaOnboardingForm || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by IdeaOnboardingForm
 */

const makeSelectIdeaOnboardingForm = () =>
  createSelector(
    selectIdeaOnboardingFormDomain,
    substate => substate
  );

export default makeSelectIdeaOnboardingForm;
export { selectIdeaOnboardingFormDomain };
