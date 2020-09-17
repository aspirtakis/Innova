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
      buttonDisabled: false, // button always available
    };
  }

  settingValueStates = (type, e) => {
    // useful for allowing 
    // 
    // if (type === "ideaName") {
    //   if (e.length >= 10) {
    //     this.setState({[type]: e});
    //     this.setState({buttonDisabled: false});
    //   } else {
    //     this.setState({buttonDisabled: true});
    //   }
    // }

    this.setState({ [type]: e });

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
                title="Idea owner"
                smallInputValue={(e) => this.settingValueStates("ideaOwner", e)}>
              </KpnSmallInput>
              <KpnSmallInput
                title="Email address"
                smallInputValue={(e) => this.settingValueStates("emailAddress", e)}>
              </KpnSmallInput>
              <KpnSmallInput
                title="Department"
                smallInputValue={(e) => this.settingValueStates("department", e)}>
              </KpnSmallInput>
            </dl>
          </div>
        </form>
        <form className="ideaForm">
          <div className="content__header">
            <h2 className="content__title">Idea specifications</h2>
          </div>

          <div className="content__body row">
            <div className="col col--6">
              <dl className="dl">
                <KpnLargeInput
                  title="Idea name"
                  largeInputValue={(e) => this.settingValueStates("ideaName", e)}>
                </KpnLargeInput>
                <KpnLargeInput
                  title="Idea pitch"
                  largeInputValue={(e) => this.settingValueStates("ideaPitch", e)}>
                </KpnLargeInput>
                <KpnLargeInput
                  title="Clear user segment"
                  largeInputValue={(e) => this.settingValueStates("userSegment", e)}>
                </KpnLargeInput>
              </dl>
            </div>
            <div className="col col--6">
              <dl className="dl">
                <KpnLargeInput
                  title="Problem solution"
                  largeInputValue={(e) => this.settingValueStates("problemSolution", e)}>
                </KpnLargeInput>
                <KpnLargeInput
                  title="KPN fit"
                  largeInputValue={(e) => this.settingValueStates("kpnFit", e)}>
                </KpnLargeInput>
                <KpnLargeInput
                  title="Ticket fit"
                  largeInputValue={(e) => this.settingValueStates("ticketFit", e)}>
                </KpnLargeInput>
              </dl>
            </div>
            <button className="kpnSubmitIdeaButton button button--3" disabled={this.state.buttonDisabled}>Send</button>
          </div>
        </form>
      </div >
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
