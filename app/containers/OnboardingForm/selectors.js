import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the onboardingForm state domain
 */

const selectOnboardingFormDomain = state =>
  state.onboardingForm || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OnboardingForm
 */

const makeSelectOnboardingForm = () =>
  createSelector(
    selectOnboardingFormDomain,
    substate => substate
  );

export default makeSelectOnboardingForm;
export { selectOnboardingFormDomain };
