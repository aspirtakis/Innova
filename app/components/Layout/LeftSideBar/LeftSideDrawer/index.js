import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import layoutStyles from 'containers/Layout/styles';
import logo from '../../../../images/logo.png';


const LeftSideDrawer = ({ classes, children }) => (
  <div className={classes.drawerInner}>
  <div style={{minHeight:60}}></div>
    {children}
  </div>
);

LeftSideDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default withStyles((theme) => layoutStyles(theme), {
  withTheme: true,
})(LeftSideDrawer);
