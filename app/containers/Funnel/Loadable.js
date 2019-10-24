/**
 *
 * Asynchronously loads the component for Funnel
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
