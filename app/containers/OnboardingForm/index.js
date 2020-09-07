/**
 *
 * OnboardingForm
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
import makeSelectOnboardingForm from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";

import "./onboardingStyle.css";

export function OnboardingForm() {
  useInjectReducer({ key: "onboardingForm", reducer });
  useInjectSaga({ key: "onboardingForm", saga });

  return (
    <div class="onboardingForms">
      <h1 >A nice header outside of the forms :)</h1>

      <div class="row">
        <div class="col col--8">
          <form class="leftForm">
            <label class="label">A nice label :)</label>
            <input class="input textInputField" type="text" placeholder="A nice text input field :)" />
          </form>
        </div>

        <div class="col col--4">
          <form class="rightForm">
            <select class="select selectInputField">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </form>
        </div>
      </div>
    </div>
  );
}

OnboardingForm.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  onboardingForm: makeSelectOnboardingForm()
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
)(OnboardingForm);
