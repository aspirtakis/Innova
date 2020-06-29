/**
 *
 * Asynchronously loads the component for Ideaonboard
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
