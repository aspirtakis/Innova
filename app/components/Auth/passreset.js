import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import { isMobile } from 'utils/menuHelper';
import styles from './styles';

class Passreset extends React.PureComponent {
  render() {
    const {
      classes,
      confirmPassword,
      fullName,
      email,
      onConfirmPasswordChange,
      onFullNameChange,
      onGoBack,
      onEmailChange,
      onPasswordChange,
      onReset,
      password,
    } = this.props;

    let container;

    if (isMobile()) {
      container = classes.mobileContainerRegister;
    }

    return (
      <div className={classNames(classes.boxContainer, container)}>
        <div className={classes.boxWrapper}>
          <Paper className={classes.paper} elevation={3} square>
            <div>
              <div className={classes.title}>Reset your Password</div>

            </div>
            <hr />
            <form>
              <TextField
                margin="normal"
                label="ResetCode"
                fullWidth
                defaultValue={this.props.code}
                disabled
     
              />
              <TextField
                margin="normal"
                label="E-mail"
                fullWidth
                defaultValue={email}
                onBlur={onEmailChange}
              />
              <TextField
                margin="normal"
                label="Password"
                fullWidth
                type="password"
                defaultValue={password}
                onBlur={onPasswordChange}
              />
              <TextField
                margin="normal"
                label="Confirm Password"
                fullWidth
                type="password"
                defaultValue={confirmPassword}
                onBlur={onConfirmPasswordChange}
              />
              <div className={classes.buttonsContainer}>
                <Button
                  color="primary"
                  className={classes.boxBtn}
                  onClick={onReset}
                >
                  Submit
                </Button>
              </div>
            </form>
          </Paper>
        </div>
      </div>
    );
  }
}

Passreset.propTypes = {

};

export default withStyles(() => styles(), {
  withTheme: true,
})(Passreset);
