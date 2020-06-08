import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import styles from './styles';
import { backend } from '../../utils/config';
const rsturl = backend.beUrl + backend.passrst;

class ResetPassword extends React.Component {
  state = {
    showEmailSentMessage: false,
    message: 'Enter your e-mail address below to reset your password.',
    newpass: null,
    newpass2: "Confirm",
  };



  render() {
    const { classes, email, onEmailChange, onGoBack,code } = this.props;
    const { showEmailSentMessage,newpass,newpass2 } = this.state;

    return (
      <div className={classes.boxContainer}>
        <div className={classes.boxWrapper}>
          <Paper className={classes.paper} elevation={3} square>
            <div>
              <div className={classes.title}>Change your password </div>
              <div className={classes.logoSmallContainer}>

              </div>
            </div>


            <form>
              {showEmailSentMessage ? null : (
                <div>
                <TextField
                label="E-mail"
                fullWidth
                defaultValue={email}
                disabled
                
              />


            <TextField
            label="New Password"
            fullWidth
            type='password'
            value={newpass}
            onChange={(e) =>this.setState({newpass:e.target.value})}

          />
          <TextField
          label="Confirm password"
          type='password'
          fullWidth
          value={newpass2}
          onChange={(e) =>this.setState({newpass2:e.target.value})}
  
        />
                </div>
     

                
              )}

              <div className={classes.buttonsContainer}>
     

              {newpass === newpass2 ?      <Button
                color="primary"
                className={classes.boxBtn}
                onClick={() => this.props.rst(newpass2)}
            
              >
                Reset
              </Button> : null}
             
                
              </div>
            </form>
          </Paper>
        </div>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  email: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onGoBack: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(() => styles(), {
  withTheme: true,
})(ResetPassword);
