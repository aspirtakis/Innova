/**
 *
 * Form
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
import makeSelectForm from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function Form() {
  useInjectReducer({ key: 'form', reducer });
  useInjectSaga({ key: 'form', saga });

  return (
    <div>
      <Helmet>
        <title>Form</title>
        <meta name="description" content="Description of Form" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Form.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  form: makeSelectForm(),
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

export default compose(withConnect)(Form);
