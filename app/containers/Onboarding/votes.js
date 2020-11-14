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

class Votes extends React.Component {
  constructor(props) {
    //     useInjectReducer({ key: 'onboarding', reducer });
    //     useInjectSaga({ key: 'onboarding', saga });
    super(props);
    this.state = {
      ideaTitle: null,

    };
  }

  render() {
    const { item } = this.props;

    return (
      <div>
        {item && item.votes.map((vote) => (
          <div key={vote.id} style={{padding:10}}>
            <div>
            Email <br/>
              {vote.user_email}<br/>
              Comment <br/>
              {vote.comment}<br/>
              SCORE: {vote.score}<br/>
            </div>
          </div>
        ))}
      </div>

    );
  }
}

Votes.propTypes = {
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
)(Votes);
