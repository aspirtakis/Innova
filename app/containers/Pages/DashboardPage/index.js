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
import PiesChart from 'components/Pages/Charts/PieChart/';
import SimpleLineChart from 'components/Pages/Charts/SimpleLineChart';
import StackedAreaChart from 'components/Pages/Charts/StackedAreaChart';
import StackedBySignBarChart from 'components/Pages/Charts/StackedBySignBarChart';
import Tasks from 'components/Pages/Dashboard/Tasks';
import {backend} from '../../../utils/config';

import styles from './styles';



const url = backend.beUrl+backend.sessionUrl;
const tasksUrl = backend.beUrl + backend.tasks;
const apptoken = backend.apptoken;

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
    fetch(tasksUrl, {
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
        console.log(datas);
        this.setStates(datas);
      })
      .catch(taskData => console.log(taskData));
  };

   count = ( uniqueCount) => {

    var  count = {};
    uniqueCount.forEach(function(i) { count[i] = (count[i]||0) + 1;});
    return count;
}


  setStates = datas => {
    const officersIds = datas.map(function(officer) {
      return officer.projectname;
    });

    const projectnames = officersIds.reduce(
      (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
      [],
    );

    const Departs= datas.map(function(officer) {
      return officer.funnel;
    });

    const Departments = Departs.reduce(
      (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
      [],
    );

    const Horizons = datas.map(function(officer) {
      return officer.horizon;
    });

    const Statuses = datas.map(function(officer) {
      return officer.status;
    });



    const officersIds2 = datas.map(function(officer2) {
      return officer2.theme;
    });

    const themes = officersIds2.reduce(
      (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
      [],
    );

    const inita = datas.filter(word => word.FunnelPhase === 'initiate');
    const prob = datas.filter(word => word.FunnelPhase === 'problem');
    const scop = datas.filter(word => word.FunnelPhase === 'scope');
    const sol = datas.filter(word => word.FunnelPhase === 'solution');
    const buss = datas.filter(word => word.FunnelPhase === 'bussiness');
    const mvp = datas.filter(word => word.FunnelPhase === 'mvp');
    const feas = datas.filter(word => word.FunnelPhase === 'feasibility');
    const scale = datas.filter(word => word.FunnelPhase === 'scalelaunch');
    const soft = datas.filter(word => word.FunnelPhase === 'softlaunch');

    const ProjectsPLATFORM = datas.filter(word => word.funnel === 'PLATFORM');
    const ProjectsECOSYSTEM = datas.filter(word => word.funnel === 'ECOSYSTEM');
    const ProjectsALL = datas.filter(word => word.funnel === 'OTHER');

    


    console.log('Initiate',inita.length);
    console.log('Projects',projectnames.length);
    console.log('Themes',themes.length);
    console.log('Cards',datas.length)

    console.log('Horizonss',this.count(Horizons))
    console.log('Status',this.count(Statuses))
    const cHorizons = this.count(Horizons);
    const cStatus = this.count(Statuses);

    const dataDeparts = [
      { name: 'PLATFORM', value: ProjectsPLATFORM ? ProjectsPLATFORM.length :null},
      { name: 'ECOSYSTEM', value: ProjectsECOSYSTEM ? ProjectsECOSYSTEM.length :null},
      { name: 'OTHER', value: ProjectsALL ? ProjectsALL.length :null},

    ];


    const dataStatus = [
      { name: 'Progressing', value: cStatus.green ? cStatus.green :null},
      { name: 'Parked', value: cStatus.orange ? cStatus.orange :null},
      { name: 'Impediment', value: cStatus.yellow ? cStatus.yellow :null},
      { name: 'Stopped', value: cStatus.red ? cStatus.red :null},
    ];

    const data = [
      { name: 'H1', value: cHorizons.H1 ? cHorizons.H1 :null},
      { name: 'H2', value: cHorizons.H2 ? cHorizons.H2 :null},
      { name: 'H3', value: cHorizons.H3 ? cHorizons.H3 :null},
    ];

    const dataProjects = [
      { name: 'Initiate', value: inita.length },
      { name: 'Problem', value: prob.length },
      { name: 'Scope', value: scop.length },
      { name: 'Solution', value: sol.length },
      { name: 'Bussiness', value: buss.length },
      { name: 'Mpv', value: mvp.length },
      { name: 'Bussiness', value: feas.length },
      { name: 'Scale Launch', value: scale.length },
      { name: 'Soft Launch', value: soft.length },
    ];


    
    this.setState({
      countProjects:projectnames.length,
      countThemes:themes.length,
      countCards:datas.length,
      countDepartments:Departments.length,
      horizonsData:data,
      dataProjects:dataProjects,
      dataStatus:dataStatus,
      dataDeparts:dataDeparts,
    });

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
                  value={this.state.countProjects}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <InfoBox
                  icon="users"
                  backgroundColor={green[400]}
                  iconColor={green[500]}
                  title="Themes"
                  value={this.state.countThemes}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <InfoBox
                  icon="face"
                  backgroundColor={orange[400]}
                  iconColor={orange[500]}
                  title="Action Cards"
                  value={this.state.countCards}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <InfoBox
                  icon="assessment"
                  backgroundColor={deepPurple[400]}
                  iconColor={deepPurple[500]}
                  title="Departments"
                  value={this.state.countDepartments}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3} className={classes.container}>
              <Grid item xs={12} sm={3} md={3}>
                <SimpleBarChart color="red" data={this.state.horizonsData} title="Horizons" />
              </Grid>
              <Grid item xs={12} sm={9} md={9}>
              <SimpleBarChart color="green" data={this.state.dataProjects} title="Card per phase" />
            </Grid>
            </Grid>

            <Grid container spacing={3} className={classes.container}>
            <Grid item xs={12} sm={3} md={3}>
              <SimpleBarChart color="blue" data={this.state.dataStatus} title="Statuses" />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            <PiesChart color="green" data={this.state.dataStatus} title="Statuses" />
          </Grid>
          <Grid item xs={12} sm={3} md={3}>
          <SimpleBarChart color="orange" data={this.state.dataDeparts} title="Department Projects" />
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
