/**
 *
 * Onboarding
 *
 */

import React, { memo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import makeSelectOnboarding from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";

export function Onboarding() {
  useInjectReducer({ key: "onboarding", reducer });
  useInjectSaga({ key: "onboarding", saga });

  return (
    <div>
      <Helmet>
        <title>Onboarding</title>
        <meta name="description" content="Description of Onboarding" />
      </Helmet>
      <div></div>
    </div>
  );
}

Onboarding.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  onboarding: makeSelectOnboarding()
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

export default compose(
  withConnect,
  memo
)(Onboarding);
