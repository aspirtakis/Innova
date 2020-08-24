/**
 *
 * Asynchronously loads the component for Initiatives
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
