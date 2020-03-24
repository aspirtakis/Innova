/**
 *
 * SgCalendar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectSgCalendar from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import STGCalendar from '../../components/calendar';


export function SgCalendar(props) {
  useInjectReducer({ key: 'sgCalendar', reducer });
  useInjectSaga({ key: 'sgCalendar', saga });


  return (
    <div>

      <STGCalendar user={props.user} />
    </div>
  );
}

SgCalendar.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.global.user,
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

export default compose(withConnect)(SgCalendar);
