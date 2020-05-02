/**
 *
 * Asynchronously loads the component for SgCalendar
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
