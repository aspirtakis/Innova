
import React, { memo, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';

import { signOut } from 'containers/App/actions';
import styles from './styles';

class Profile extends React.Component {
  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  signOut = () => {
    this.setState({
      anchorEl: null,
    });
    this.props.dispatch(signOut());
  };

  render() {
    const { anchorEl } = this.state;
    const { classes, drawerIsOpen ,user} = this.props;
    const open = Boolean(anchorEl);
    //console.log(user.first_name);
    var first = user.first_name.charAt(0);
    var last = user.last_name.charAt(0);
var av = first+last;

 

    return (
      <div>
        <Tooltip title={user.first_name+" " + user.last_name}>
          <IconButton
            aria-owns={drawerIsOpen ? 'menu-appbar' : null}
            aria-haspopup="true"
            onClick={this.handleMenu}
          >
            <Avatar className={classes.avatar}>{av}</Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={this.handleClose}
        >

          <Divider />
          <MenuItem >{user.first_name} {user.last_name}</MenuItem>
          <MenuItem >Role: {user.role}</MenuItem>
          <MenuItem onClick={this.signOut}>Sign out</MenuItem>
        </Menu>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  drawerIsOpen: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};



const mapDispatchToProps = dispatch => ({
  dispatch,
});



export default connect(mapDispatchToProps)(
  withStyles(theme => styles(theme), {
    withTheme: true,
  })(Profile),
);


