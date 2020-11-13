/**
 *
 * Onboarding
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { compose } from 'redux';

import KpnLongText from './components/kpnLongText';
import KpnSmallText from './components/kpnSmallText';
import KpnSelect from './components/kpnSelect';
import KpnTextArea from './components/kpnTextArea';

import './ideaOnboardingFormStyles.css';
import { backend } from '../../utils/config';

const { apptoken } = backend;

const onboardingUrl = backend.beUrl + backend.onboarding;

class Votingform extends React.Component {
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
      voteNow: false,
    };
  }

  render() {

    const {item} = this.props;
    console.log(item);

    return (

      <div className="votingForms">

        <div className="row">
          <div className="col col--6">
            <div className="leftForm">
              <div className="leftFormContent">
                <div className="content__header">
                  <h2 className="content__title">{item.Title}</h2>
                </div>
                <div className="content__body">
                  <dl className="dl">
                    <KpnSmallText
                      title={"Owner Name"}
                      description={item.OwnerFirstName}
                    />
                    <KpnSmallText
                      title="Email address"
                      description={item.OwnerEmail}
                    />
                    <KpnSmallText
                    title="Phone"
                    description={item.OwnerPhone}
                  />
                  </dl>
                </div>

                <div className="content__header">
                  <h2 className="content__title">Idea specifications</h2>
                </div>
                <div className="content__body">
                  <dl className="dl">
      
                    <KpnSmallText
                      title="Idea code"
                      description={item.id}
                    />
                    <KpnLongText
                      title="ElevatorPitch"
                      description={item.ElevatorPitch}
                    />
        
                    <KpnLongText
                      title="Problem"
                      description={item.Problem}
                    />
                    <KpnLongText
                      title="KPN fit -Org Value"
                      description={item.orgValue}
                    />
                    <KpnLongText
                      title="Owner Value"
                      description={item.OwnerValue}
                    />
                  </dl>
                </div>
                {!this.state.voteNow 
                  && <button onClick={() => this.setState({voteNow:true})} className="kpnNotesFieldButton button">Vote</button>}
              </div>
            </div>
          </div>

          <div className="col col--4">
            {this.state.voteNow
            && (
            <div className="rightForm">
              <div className="content__header">
                <h2 className="content__title">Voting</h2>
              </div>
              <div className="content__body">
                <dl className="dl">
                  <KpnSelect
                    title="Business opportunity"
                  />
                  <KpnSelect
                    title="Clear user segment"
                  />
                  <KpnSelect
                    title="Problem solving"
                  />
                  <KpnSelect
                    title="KPN fit"
                  />
                  <KpnSelect
                    title="Ticket fit"
                  />
                </dl>
              </div>
              <div className="content__body kpnNotesField">
                <dl className="dl">
                  <KpnTextArea
                    title="Notes"
                    textArea="."
                  />
         
                  <button disabled className="kpnNotesFieldButton button">Vote</button>
                  {this.state.voteNow 
                    && <button onClick={() => this.setState({voteNow:false})} className="kpnNotesFieldButton button">Cancel</button>}
                </dl>
              </div>
            </div>
            )}

          </div>
        </div>
      </div>

    );
  }
}

Votingform.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.global.user,
    users: state.global.users,
  };
}
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
)(Votingform);
