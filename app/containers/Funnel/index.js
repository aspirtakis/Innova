/**
 *
 * Funnel
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Typography from '@material-ui/core/Typography';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectFunnel from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function Funnel() {
  useInjectReducer({ key: 'funnel', reducer });
  useInjectSaga({ key: 'funnel', saga });

  return (
    <div>
      <Helmet>
        <title>Funnel</title>
        <meta name="description" content="Description of Funnel" />
      </Helmet>

      <div>
        <Typography variant="h5">Welcome to Funnel Page</Typography>
      </div>
    </div>
  );
}

Funnel.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  funnel: makeSelectFunnel(),
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
)(Funnel);
