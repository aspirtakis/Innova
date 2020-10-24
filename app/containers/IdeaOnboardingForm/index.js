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
      ideaTitle: null,
      ownerFirstName: null,
      ownerLastName: null,
      ownerEmail: null,
      ownerPhone: null,
      ownerValue: null,
      elevatorPitch: null,
      problem: null,
      orgValue: null,
      buttonDisabled: false, // button always available
    };
  }

  settingValueStates = (type, e) => {
    // useful for checks 
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
    const { addNewTask } = this.props;

    return (
      <div className="ideaOnboardingForm">
        <form className="ideaForm">
          <div className="content__body">
            <h2 className="content__title">Idea owner credentials</h2>
            <div className="row">
              <div className="col col--6">
                <dl className="dl">
                  <KpnSmallInput
                    title="Idea name"
                    smallInputValue={(e) => this.settingValueStates("ideaTitle", e)}>
                  </KpnSmallInput>
                </dl>
              </div>
            </div>
            <div className="row">
              <div className="col col--6">
                <dl className="dl">
                  <KpnSmallInput
                    title="First name"
                    smallInputValue={(e) => this.settingValueStates("ownerFirstName", e)}>
                  </KpnSmallInput>
                  <KpnSmallInput
                    title="Last name"
                    smallInputValue={(e) => this.settingValueStates("ownerLastName", e)}>
                  </KpnSmallInput>
                </dl>
              </div>
              <div className="col col--6">
                <dl className="dl">
                  <KpnSmallInput
                    title="Email address"
                    smallInputValue={(e) => this.settingValueStates("ownerEmail", e)}>
                  </KpnSmallInput>
                  <KpnSmallInput
                    title="Phone"
                    smallInputValue={(e) => this.settingValueStates("ownerPhone", e)}>
                  </KpnSmallInput>
                </dl>
              </div>
            </div>
            <h2 className="content__title">Idea specifications</h2>
            <div className="row">
              <div className="col col--6">
                <dl className="dl">
                  <KpnLargeInput
                    title="Problem solution"
                    largeInputValue={(e) => this.settingValueStates("problem", e)}>
                  </KpnLargeInput>
                  <KpnLargeInput
                    title="Idea elevator pitch"
                    largeInputValue={(e) => this.settingValueStates("elevatorPitch", e)}>
                  </KpnLargeInput>
                </dl>
              </div>
              <div className="col col--6">
                <dl className="dl">
                  <KpnLargeInput
                    title="Why is your idea useful for KPN?"
                    largeInputValue={(e) => this.settingValueStates("orgValue", e)}>
                  </KpnLargeInput>
                  <KpnLargeInput
                    title="What can you bring to the table?"
                    largeInputValue={(e) => this.settingValueStates("ownerValue", e)}>
                  </KpnLargeInput>
                </dl>
              </div>
            </div>
          </div>

          <button
            className="kpnSubmitIdeaButton button button--3"
            disabled={this.state.buttonDisabled}
          >
            Send
            </button>
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
