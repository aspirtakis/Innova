import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the votingForm state domain
 */

const selectVotingFormDomain = state => state.votingForm || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by VotingForm
 */

const makeSelectVotingForm = () =>
  createSelector(
    selectVotingFormDomain,
    substate => substate
  );

export default makeSelectVotingForm;
export { selectVotingFormDomain };
