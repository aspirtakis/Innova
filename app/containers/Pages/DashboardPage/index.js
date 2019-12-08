import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import deepPurple from '@material-ui/core/colors/deepPurple';
import Grid from '@material-ui/core/Grid';
import green from '@material-ui/core/colors/green';
import InfoBox from 'components/Pages/Dashboard/InfoBox';
import orange from '@material-ui/core/colors/orange';

import Stepper from 'components/Pages/Dashboard/Stepper';
import Gallery from 'components/Pages/Dashboard/Gallery';
import layoutStyles from 'containers/Layout/styles';
import PageBase from 'components/PageBase';
import SimpleBarChart from 'components/Pages/Charts/SimpleBarChart';
import SimpleLineChart from 'components/Pages/Charts/SimpleLineChart';
import StackedAreaChart from 'components/Pages/Charts/StackedAreaChart';
import StackedBySignBarChart from 'components/Pages/Charts/StackedBySignBarChart';
import Tasks from 'components/Pages/Dashboard/Tasks';

import styles from './styles';
const url = 'https://aws.openinnovationhub.nl./api/v2/user/session';
const url2 =
  'https://aws.openinnovationhub.nl./api/v2/funnel/_table/funnel.tasks';
const apptoken =
  'cfe595a88b10a4aa5ef460660f6240bd3a72f89e411d31169579444145119f89';

class DashboardPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      targetOn: true,
      setOpen: false,
      setOpenEdit: false,
      selectedTask: '',
      initiate: [],
      scope: [],
      problem: [],
      solution: [],
      bussiness: [],
      mvp: [],
      feasibility: [],
      scalelaunch: [],
      softlaunch: [],
      projectnames: [],
      spinning: false,
      themes: [],
    };
  }

  componentDidMount() {
    console.log('DID MOUNTY');
    this.setState({ spinning: true });
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'X-DreamFactory-API-Key': apptoken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'be@openinnovationhub.nl',
        password: 'a224935a',
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(resdata => {
        this.setState({ sestoken: resdata.session_token });
        this.getData();

        setTimeout(() => {
          this.setState({ loading: false });
        }, 300);
      })
      .catch(response => console.log(response));
  }

  getData = () => {
    console.log('GET DATA');
    fetch(url2, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-DreamFactory-API-Key': apptoken,
        'X-DreamFactory-Session-Token': this.state.sestoken,
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(taskData => {
        const datas = taskData.resource;
        //   this.setStates(datas);
      })
      .catch(taskData => console.log(taskData));
  };

  render() {
    const { loading } = this.state;
    const { classes } = this.props;

    return (
      <PageBase minHeight={500} loading={loading}>
        {!loading && (
          <div>
            <Grid container spacing={3} className={classes.container}>
              <Grid item xs={12} sm={6} md={3}>
                <InfoBox
                  icon="thumb_up"
                  backgroundColor={blue[400]}
                  iconColor={blue[500]}
                  title="Projects"
                  value="10"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <InfoBox
                  icon="users"
                  backgroundColor={green[400]}
                  iconColor={green[500]}
                  title="Total People"
                  value="34"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <InfoBox
                  icon="face"
                  backgroundColor={orange[400]}
                  iconColor={orange[500]}
                  title="Action Cards"
                  value="175"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <InfoBox
                  icon="assessment"
                  backgroundColor={deepPurple[400]}
                  iconColor={deepPurple[500]}
                  title="Sales"
                  value="852"
                />
              </Grid>
            </Grid>

            <Grid container spacing={3} className={classes.container}>
              <Grid item xs={12} sm={12} md={6}>
                <SimpleBarChart title="Sales" />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <StackedAreaChart title="Orders" />
              </Grid>
            </Grid>
          </div>
        )}
      </PageBase>
    );
  }
}

DashboardPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(
  theme => ({
    ...layoutStyles(theme),
    ...styles(theme),
  }),
  { withTheme: true },
)(DashboardPage);
