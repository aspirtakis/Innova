/**
 *
 * IdeaOnboardingForm
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
import makeSelectIdeaOnboardingForm from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";

import KpnSmallInput from "./components/kpnSmallInput";
import KpnLargeInput from "./components/kpnLargeInput";

import "./ideaOnboardingFormStyles.css"

export class IdeaOnboardingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ideaOwner: null,
      emailAddress: null,
      department: null,
      ideaName: null,
      ideaPitch: null,
      userSegment: null,
      problemSolution: null,
      kpnFit: null,
      ticketFit: null,
      buttonDisabled: true,
    };
  }

  settingValueStates = (type, e) => {
    if (type === "ideaName") {
      if (e.length >= 10) {
        this.setState({[type]: e});
        this.setState({buttonDisabled: false});
      } else {
        this.setState({buttonDisabled: true});
      }
    }
    
    console.log(this.state);
  };

  render() {
    return (
      <div className="ideaOnboardingForm">
        <form className="ideaForm">
          <div className="content__header">
            <h2 className="content__title">New idea</h2>
          </div>
          <div className="content__body">
            <dl className="dl">
              <KpnSmallInput
                title="Idea owner">
              </KpnSmallInput>
              <KpnSmallInput
                title="Email address">
              </KpnSmallInput>
              <KpnSmallInput
                title="Department"
                smallInputValue={(e) => this.settingValueStates("department", e)}>
              </KpnSmallInput>
            </dl>
          </div>

          <div className="content__header">
            <h2 className="content__title">Idea specifications</h2>
          </div>
          <div className="content__body">
            <dl className="dl">
              <KpnSmallInput
                title="Idea name"
                smallInputValue={(e) => this.settingValueStates("ideaName", e)}>
              </KpnSmallInput>
              <KpnLargeInput
                title="Idea pitch">
              </KpnLargeInput>
              <KpnLargeInput
                title="Clear user segment">
              </KpnLargeInput>
              <KpnLargeInput
                title="Problem solution">
              </KpnLargeInput>
              <KpnLargeInput
                title="KPN fit">
              </KpnLargeInput>
              <KpnLargeInput
                title="Ticket fit">
              </KpnLargeInput>
              <button className="kpnSubmitIdeaButton button button--3" disabled={this.state.buttonDisabled}>Send</button>
            </dl>
          </div>
        </form>
      </div>
    );
  }
}

IdeaOnboardingForm.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  ideaOnboardingForm: makeSelectIdeaOnboardingForm()
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
)(IdeaOnboardingForm);
