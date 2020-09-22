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

  // resource: [
  //   {
  //     description: values.description,
  //     asssignedUser: '1',
  //     projectname: values.project,
  //     horizon: values.horizon,
  //     theme: values.theme,
  //     status: values.status,
  //     FunnelPhase: values.funnelPhase,
  //     funnel: values.funnel,
  //     coach: values.coach,
  //     sponsor: values.sponsor,
  //     spnsr: values.spnsr,
  //   },

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

  whenClicked = () => {
    const { ideaName, emailAddress, department } = this.state;

    const myData = {
      description: ideaName,
      asssignedUser: '1',
      projectname: values.project,
      horizon: values.horizon,
      theme: values.theme,
      status: values.status,
      FunnelPhase: values.funnelPhase,
      funnel: values.funnel,
      coach: values.coach,
      sponsor: values.sponsor,
      spnsr: values.spnsr,
    };

    this.props.addNewTask(myData);
  }

  render() {
    const { addNewTask } = this.props;

    return (
      <div className="ideaOnboardingForm">
        <form className="ideaForm">
          <div className="content__body">
            <div className="row">
              <div className="col col--6">
                <dl className="dl">
                  <div>
                    <dt className="kpnSelectorTitle">Department</dt>
                    <dd className="kpnSelectorField">
                      <select
                        className="select"
                        defaultValue=""
                      >
                        <option disabled hidden></option>
                        <option>OIH</option>
                        <option>CM</option>
                        <option>BM</option>
                        <option>WS</option>
                        <option>OPS</option>
                      </select>
                    </dd>
                  </div>
                  <div>
                    <dt className="kpnSelectorTitle">Theme</dt>
                    <dd className="kpnSelectorField">
                      <select
                        className="select"
                        defaultValue=""
                      >
                        <option disabled hidden></option>
                        <option>Next Gen Infra</option>
                        <option>DataTech</option>
                        <option>TechCo</option>
                        <option>Other</option>
                      </select>
                    </dd>
                  </div>
                  <KpnSmallInput
                    title="Project"
                  />
                  <KpnSmallInput
                    title="Sponsor"
                  />
                  <KpnLargeInput
                    title="Description"
                  />
                </dl>
              </div>
              <div className="col col--6">
                <dl className="dl">
                  <div>
                    <dt className="kpnSelectorTitle">Horizon</dt>
                    <dd className="kpnSelectorField">
                      <select
                        className="select"
                        defaultValue=""
                      >
                        <option disabled hidden></option>
                        <option>H1</option>
                        <option>H2</option>
                        <option>H3</option>
                      </select>
                    </dd>
                  </div>
                  <div>
                    <dt className="kpnSelectorTitle">Team members</dt>
                    <dd className="kpnSelectorField">
                      <select
                        className="select"
                        defaultValue=""
                      >
                        <option disabled hidden></option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                      </select>
                    </dd>
                  </div>
                  <div>
                    <dt className="kpnSelectorTitle">Next funnel phase</dt>
                    <dd className="kpnSelectorField">
                      <select
                        className="select"
                        defaultValue=""
                      >
                        <option disabled hidden></option>
                        <option>INITIATE</option>
                        <option>BACKLOG</option>
                        <option>ARCHIVE</option>
                        <option>SCOPE</option>
                        <option>PROBLEM</option>
                        <option>SOLUTION</option>
                        <option>BUSINESS</option>
                        <option>FEASIBILITY</option>
                        <option>MVP</option>
                        <option>SOFTLAUNCH</option>
                        <option>SCALELAUNCH</option>
                      </select>
                    </dd>
                  </div>
                  <div>
                    <dt className="kpnSelectorTitle">Status</dt>
                    <dd className="kpnSelectorField">
                      <select
                        className="select"
                        defaultValue=""
                      >
                        <option disabled hidden></option>
                        <option>PROGRESSING</option>
                        <option>IMPEDEMENT</option>
                        <option>PARKED</option>
                        <option>STOPPED</option>
                      </select>
                    </dd>
                  </div>
                  <div>
                    <dt className="kpnSelectorTitle">Coach</dt>
                    <dd className="kpnSelectorField">
                      <select
                        className="select"
                        defaultValue=""
                      >
                        <option disabled hidden></option>
                        <option>Kevin</option>
                        <option>Mike</option>
                        <option>Mark</option>
                        <option>Amber</option>
                        <option>Melvin</option>
                      </select>
                    </dd>
                  </div>
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
