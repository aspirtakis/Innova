import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the funnel state domain
 */

const selectFunnelDomain = state => state.funnel || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Funnel
 */

const makeSelectFunnel = () =>
  createSelector(
    selectFunnelDomain,
    substate => substate,
  );

export default makeSelectFunnel;
export { selectFunnelDomain };
