import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

import {
  makeSelectCurrentTheme,
  makeSelectOpenArchiveDrawer,
  makeSelectShowOpenView,
  makeSelectShowHeaderTabs,
} from 'containers/App/selectors';
import {
  changeTheme,
  closeArchivesDrawer,
  showHideOpenViews,
  showHideHeaderTabs,
} from 'containers/App/actions';
import layoutStyles from '../Layout/styles';

class Archive extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      closeArchiveDrawnerOnce: false,
      currentTheme: props.currentTheme,
      canOpenArchivesDrawer: true,
    };
  }


  render() {
    const { canOpenArchivesDrawer, currentTheme } = this.state;
    const {
      classes,
      openArchiveDrawer,
    } = this.props;

    return (
      <div>
        <Drawer style={{ minWidth: 100 }} open anchor="right" variant="persistent" />
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  dispatch,
});

function mapStateToProps(state) {
  return {
    ...state,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withStyles(theme => layoutStyles(theme), {
    withTheme: true,
  }),
)(Archive);
