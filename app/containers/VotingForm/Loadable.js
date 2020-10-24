/**
 *
 * Asynchronously loads the component for VotingForm
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
