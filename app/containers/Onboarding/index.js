/**
 *
 * Onboarding
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectOnboarding from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import KpnSmallInput from "./components/kpnSmallInput";
import KpnLargeInput from "./components/kpnLargeInput";

import "./ideaOnboardingFormStyles.css"

 class Onboarding extends React.Component {
    constructor(props) {
 //     useInjectReducer({ key: 'onboarding', reducer });
 //     useInjectSaga({ key: 'onboarding', saga });
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
      this.setState({ [type]: e });
      console.log(this.state);
    };



    addNewIdea = (r) => {

      fetch(checklistsUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'X-DreamFactory-API-Key': apptoken,
          'X-DreamFactory-Session-Token': this.props.location.state.sestoken,
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resource: [
           {
             title: "New Experiment",
             assumptionid: r.id,
             status:"Backlog",
           },
          ],
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response;
        })
        .then(response => response.json())
        .then(assumptionData => {
 
       const newData = [...this.state.assumptions];
       const index = newData.findIndex(item => r.id === item.id);
       let item = newData[index];
       let chkl = item.experiments;
 
       const newCheckList =     {
         title: "New Experiment",
         id:assumptionData.resource[0].id,
          assumptionid: r.id,
          status:"Backlog",
         };
       if(chkl) {
           chkl.push(newCheckList);
       }
       if(!chkl){
         //console.log(item);
       item.experiments=[];
         item.experiments.push(newCheckList);
 
       }
       this.setState({assumptions:newData});
        })
        .catch(taskData => console.log(taskData));
   };




    render(){


  return (

    <div >
    <div className="ideaForm">
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
    </div>
    </div>

  );


    }
      
    

}


Onboarding.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  onboarding: makeSelectOnboarding(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Onboarding);
