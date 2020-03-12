/**
 *
 * SgCalendar
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import makeSelectSgCalendar from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";

export function SgCalendar() {
  useInjectReducer({ key: "sgCalendar", reducer });
  useInjectSaga({ key: "sgCalendar", saga });

  return (
    <div>
      <Helmet>
        <title>SgCalendar</title>
        <meta name="description" content="Description of SgCalendar" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

SgCalendar.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  sgCalendar: makeSelectSgCalendar()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(SgCalendar);
