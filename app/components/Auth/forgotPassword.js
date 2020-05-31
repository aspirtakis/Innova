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

class ForgotPassword extends React.Component {
  state = {
    showEmailSentMessage: false,
    message: 'Enter your e-mail address below to reset your password.',
  };


  resetRequest = () => {
    // this.props.sessionCheck();
     // this.setState({ spinning: true });
     const { email } = this.props;
      fetch(rsturl+"?reset=true", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'X-DreamFactory-API-Key': backend.apptoken,
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
      
           
             email: email,
           
          
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response;
        })
        .then(response => response.json())
        .then(remarkData => {
        //  this.props.onOK();
        console.log(remarkData);
        this.setState({
          showEmailSentMessage: true,
          message: `An email has been sent to ${email} with further instructions.`,
        });
   
        })
        .catch(taskData2 => {
          this.setState({
            showEmailSentMessage: true,
            message: `User not found `,
          });
        });
   };

  sentEmail = () => {

  };

  render() {
    const { classes, email, onEmailChange, onGoBack } = this.props;
    const { showEmailSentMessage } = this.state;

    return (
      <div className={classes.boxContainer}>
        <div className={classes.boxWrapper}>
          <Paper className={classes.paper} elevation={3} square>
            <div>
              <div className={classes.title}>Forgot Password2222</div>
              <div className={classes.logoSmallContainer}>
                <img
                  src="https://s3.amazonaws.com/OIHubassets/logo-small.png"
                  alt="OIHub Admin Template"
                />
              </div>
            </div>
            <hr />
            <Typography paragraph>{this.state.message}</Typography>
            <form>
              {showEmailSentMessage ? null : (
                <TextField
                  label="E-mail"
                  fullWidth
                  defaultValue={email}
                  onBlur={onEmailChange}
                />
              )}

              <div className={classes.buttonsContainer}>
                <Button onClick={onGoBack}>Go Back</Button>

                {showEmailSentMessage ? null : (
                  <Button
                    color="primary"
                    className={classes.boxBtn}
                    onClick={this.resetRequest}
                  >
                    Submit
                  </Button>
                )}
              </div>
            </form>
          </Paper>
        </div>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  email: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onGoBack: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(() => styles(), {
  withTheme: true,
})(ForgotPassword);
