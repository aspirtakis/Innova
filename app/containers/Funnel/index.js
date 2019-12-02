import React, { memo, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Paper from '@material-ui/core/Paper';
import { Row, Col } from 'react-flexbox-grid';
import { Select, Spin, Button, Icon, Collapse } from 'antd';
import makeSelectFunnel from './selectors';
import FunnelForm from '../../components/addFunnelForm';
import FunnelEditForm from '../../components/editFunnel';
import { styles } from './funnel_styles';
import moment from 'moment';


const  Panel  = Collapse.Panel;
const  Option  = Select.Option;
const url = 'https://aws.openinnovationhub.nl./api/v2/user/session';
const url2 =
  'https://aws.openinnovationhub.nl./api/v2/funnel/_table/funnel.tasks';
const apptoken =
  'cfe595a88b10a4aa5ef460660f6240bd3a72f89e411d31169579444145119f89';

class Funnel extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      expanded: '',
      setExpanded: true,
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
        this.setStates(datas);
      })
      .catch(taskData => console.log(taskData));
  };

  setStates = datas => {
    const officersIds = datas.map(function(officer) {
      return officer.projectname;
    });

    const projectnames = officersIds.reduce(
      (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
      [],
    );

    const officersIds2 = datas.map(function(officer2) {
      return officer2.theme;
    });

    const themes = officersIds2.reduce(
      (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
      [],
    );
    this.setState({
      initiate: datas.filter(word => word.FunnelPhase === 'initiate'),
      scope: datas.filter(word => word.FunnelPhase === 'scope'),
      problem: datas.filter(word => word.FunnelPhase === 'problem'),
      solution: datas.filter(word => word.FunnelPhase === 'solution'),
      bussiness: datas.filter(word => word.FunnelPhase === 'bussiness'),
      mvp: datas.filter(word => word.FunnelPhase === 'mvp'),
      feasibility: datas.filter(word => word.FunnelPhase === 'feasibility'),
      scalelaunch: datas.filter(word => word.FunnelPhase === 'scalelaunch'),
      softlaunch: datas.filter(word => word.FunnelPhase === 'softlaunch'),
      projectnames,
      themes,
    });
    this.setState({ spinning: false });
  };

  onDragOver = event => {
    event.preventDefault();
  };

  onDrag = (event, task) => {
    event.preventDefault();
    this.setState({
      draggedTask: task,
      draggedFrom: event.target.getAttribute('container'),
    });
  };

  handleOpen = () => {
    this.setState({ setOpen: true });
  };

  handleOpenEdit = data => {
    this.setState({ selectedTask: data });
    this.setState({ setOpenEdit: true });
  };

  filterThemeProject = project => {
    this.setState({ spinning: true });
    const url5 = `https://aws.openinnovationhub.nl./api/v2/funnel/_table/funnel.tasks?filter=projectname=${project}`;
    fetch(url5, {
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
        this.setStates(datas);
        this.setState({ spinning: false });
      })
      .catch(taskData => console.log(taskData));
  };

  filterStatus = project => {
    this.setState({ spinning: true });
    const url5 = `https://aws.openinnovationhub.nl./api/v2/funnel/_table/funnel.tasks?filter=status=${project}`;
    fetch(url5, {
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
        this.setStates(datas);
        this.setState({ spinning: false });
      })
      .catch(taskData => console.log(taskData));
  };

  filterFunnel = theme => {
    this.setState({ spinning: true });
    const filter = theme;
    let url5 = `https://aws.openinnovationhub.nl./api/v2/funnel/_table/funnel.tasks?filter=funnel=${filter}`;
    if (theme === 'ALL') {
      url5 = `https://aws.openinnovationhub.nl./api/v2/funnel/_table/funnel.tasks`;
    }
    fetch(url5, {
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
        this.setStates(datas);
        this.setState({ spinning: false });
      })
      .catch(taskData => console.log(taskData));
  };

  filterTheme = theme => {
    this.setState({ spinning: true });
    const filter = theme;
    let url5 = `https://aws.openinnovationhub.nl./api/v2/funnel/_table/funnel.tasks?filter=theme=${filter}`;
    if (theme === 'ALL') {
      url5 = `https://aws.openinnovationhub.nl./api/v2/funnel/_table/funnel.tasks`;
    }
    fetch(url5, {
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
        this.setStates(datas);
        this.setState({ spinning: false });
      })
      .catch(taskData => console.log(taskData));
  };

  handleOk = () => {
    this.setState({ spinning: true });
    this.setState({ setOpen: false });
    this.setState({ setOpenEdit: false });
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
        this.setStates(datas);

        this.setState({ spinning: false });
      })
      .catch(taskData => console.log(taskData));
  };

  handleClose = () => {
    this.setState({ setOpen: false });
    this.setState({ setOpenEdit: false });
  };

  onDrop = (event, task) => {
    const targetContainer = event.target.getAttribute('container');
    if (!targetContainer) {
      return;
    }
    if (
      targetContainer === 'scope' ||
      targetContainer === 'initiate' ||
      targetContainer === 'bussiness' ||
      targetContainer === 'solution' ||
      targetContainer === 'mvp' ||
      targetContainer === 'scalelaunch' ||
      targetContainer === 'softlaunch' ||
      targetContainer === 'feasibility' ||
      targetContainer === 'problem'
    ) {
      this.setState({ targetOn: true });
    } else {
      this.setState({ targetOn: false });
    }

    const targ = this.state.targetOn;
    const {
      initiate,
      draggedTask,
      scope,
      draggedFrom,
      problem,
      solution,
      bussiness,
      scalelaunch,
      softlaunch,
      mvp,
      feasibility,
    } = this.state;
    // FIX out of draggin space
    if (draggedFrom === targetContainer) {
      return;
    }
    this.onSave(draggedTask.task_id, targetContainer);

    if (draggedFrom === 'scope' && targ) {
      this.setState({
        scope: scope.filter(tasks => tasks.task_id !== draggedTask.task_id),
      });
    }
    if (draggedFrom === 'initiate' && targ) {
      this.setState({
        initiate: initiate.filter(
          tasks => tasks.task_id !== draggedTask.task_id,
        ),
      });
    }
    if (draggedFrom === 'problem' && targ) {
      this.setState({
        problem: problem.filter(tasks => tasks.task_id !== draggedTask.task_id),
      });
    }
    if (draggedFrom === 'solution' && targ) {
      this.setState({
        solution: solution.filter(
          tasks => tasks.task_id !== draggedTask.task_id,
        ),
      });
    }
    if (draggedFrom === 'bussiness' && targ) {
      this.setState({
        bussiness: bussiness.filter(
          tasks => tasks.task_id !== draggedTask.task_id,
        ),
      });
    }
    if (draggedFrom === 'mvp' && targ) {
      this.setState({
        mvp: mvp.filter(tasks => tasks.task_id !== draggedTask.task_id),
      });
    }
    if (draggedFrom === 'feasibility' && targ) {
      this.setState({
        feasibility: feasibility.filter(
          tasks => tasks.task_id !== draggedTask.task_id,
        ),
      });
    }
    if (draggedFrom === 'softlaunch' && targ) {
      this.setState({
        softlaunch: softlaunch.filter(
          tasks => tasks.task_id !== draggedTask.task_id,
        ),
      });
    }
    if (draggedFrom === 'scalelaunch' && targ) {
      this.setState({
        scalelaunch: scalelaunch.filter(
          tasks => tasks.task_id !== draggedTask.task_id,
        ),
      });
    }

    // /ADD STATE
    if (targetContainer === 'initiate') {
      this.setState({
        initiate: [...initiate, draggedTask],
        draggedTask: {},
      });
    }
    if (targetContainer === 'scope') {
      this.setState({
        scope: [...scope, draggedTask],
        draggedTask: {},
      });
    }
    if (targetContainer === 'problem') {
      this.setState({
        problem: [...problem, draggedTask],
        draggedTask: {},
      });
    }
    if (targetContainer === 'bussiness') {
      this.setState({
        bussiness: [...bussiness, draggedTask],
        draggedTask: {},
      });
    }
    if (targetContainer === 'solution') {
      this.setState({
        solution: [...solution, draggedTask],
        draggedTask: {},
      });
    }
    if (targetContainer === 'feasibility') {
      this.setState({
        feasibility: [...feasibility, draggedTask],
        draggedTask: {},
      });
    }
    if (targetContainer === 'scalelaunch') {
      this.setState({
        scalelaunch: [...scalelaunch, draggedTask],
        draggedTask: {},
      });
    }
    if (targetContainer === 'softlaunch') {
      this.setState({
        softlaunch: [...softlaunch, draggedTask],
        draggedTask: {},
      });
    }
    if (targetContainer === 'mvp') {
      this.setState({
        mvp: [...mvp, draggedTask],
        draggedTask: {},
      });
    }
    this.getData();
  };

  onSave = (task, scope) => {
    const url4 = `https://aws.openinnovationhub.nl./api/v2/funnel/_table/funnel.tasks/${task}`;
    fetch(url4, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'X-DreamFactory-API-Key': apptoken,
        'X-DreamFactory-Session-Token': this.state.sestoken,
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        funnelPhase: scope,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(taskData => {
        console.log(taskData);
      })
      .catch(taskData => console.log(taskData));
  };

  onColumn = (datas, container, styler) => (
    <Col xs style={styles.zebra1}>
      <div
        container={container}
        onDrop={event => this.onDrop(event)}
        style={styles.zebra2}
        onDragOver={event => this.onDragOver(event)}
      >
        <Paper className="h5" style={styles.ColTitles}>
          {container.toUpperCase()}
        </Paper>

        {datas.map(taskproblem => (
          <div
            style={styles.card}
            key={taskproblem.task_id}
            container={container}
            draggable
            onDrag={event => this.onDrag(event, taskproblem)}
            onDragOver={event => this.onDragOver(event)}
          >
            {
              <Row
                style={{
                  display: 'flex',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  justifyContent: 'center',
                }}
              >
                <Paper
                  style={{
                    backgroundColor: 'white',
                    color: 'black',
                    fontSize: 10,
                    margin: 5,
                    minHeight: 100,
                    maxWidth: '90%',
                    minWidth: '90%',
                  }}
                  onDoubleClick={() => this.handleOpenEdit(taskproblem)}
                >
                  <div style={styles.cardTitle} className="h4">
                    {taskproblem.projectname}
                  </div>
                  <Row
                    style={{
                      marginLeft: 5,
                      marginBottom: 5,
                    }}
                    xs={12}
                  >
                    <Col>
                      <div
                        style={{
                          minHeigh: 50,
                          maxWidth: 50,
                          fontWeight: 'bolder',
                          color: 'white',
                          backgroundColor: taskproblem.status,
                          textAlign: 'center',
                        }}
                      >
                        Status
                      </div>
                    </Col>
                    <Col xs>{taskproblem.horizon}</Col>
                  </Row>

                  <Row style={{ marginLeft: 3, marginBottom: 1 }}>
                    <div
                      style={{
                        fontWeight: 'bold',
                        maxWidth: '90%',
                      }}
                    >
                      {taskproblem.leader}/{taskproblem.sponsor}{' '}
                    </div>
                  </Row>

                  <Row style={{ marginLeft: 3, marginBottom: 1 }}>
                    <div
                      style={{
                        fontWeight: 'bold',
                        maxWidth: '90%',
                      }}
                    >
                      <div>
                        Title:{taskproblem.title} <br />
                      </div>
                    </div>
                  </Row>
                  <Row style={{ marginLeft: 3, marginBottom: 1 }}>
                    <div
                      style={{
                        fontWeight: 'bold',
                        maxWidth: '90%',
                      }}
                    >
                      <div>
                        <div className="h5"> Coach: {taskproblem.coach}</div>
                      </div>
                    </div>
                  </Row>
                  <Row style={{ marginLeft: 3, marginBottom: 1 }}>
                      <div
                        style={{
                          fontWeight: 'bold',
                        maxWidth: '90%',
                        }}
                      >
                        <div>
                          <div className="h5">
                          {' '}
                          <p style={{color:"blue"}}>{moment(taskproblem.createDate).fromNow()}</p>
                        </div>
                        </div>
                      </div>
                    </Row>
                </Paper>
              </Row>
            }
          </div>
        ))}
        <div style={styles.ColTitles2}>
          <Button onClick={this.handleOpen} style={{ minWidth: '100%' }}>
            <Icon
              type="plus-square"
              style={{
                minWidth: '100%',
                marginBottom: 5,
                fontSize: '18px',
                color: '#08c',
              }}
              theme="outlined"
            />
          </Button>
        </div>
      </div>
    </Col>
  );

  render() {
    const {
      initiate,
      selectedTask,
      scope,
      problem,
      solution,
      bussiness,
      feasibility,
      softlaunch,
      scalelaunch,
      mvp,
      sestoken,
      projectnames,
      themes,
    } = this.state;
    return (
      <div>
        <Spin spinning={this.state.spinning} tip="Loading...">
          <FunnelForm
            sestoken={sestoken}
            visible={this.state.setOpen}
            onCancel={this.handleClose}
            onOK={this.handleOk}
            handleSubmit={this.handleSubmit}
          />
          <FunnelEditForm
            sestoken={sestoken}
            visible={this.state.setOpenEdit}
            onCancel={this.handleClose}
            onOK={this.handleOk}
            data={selectedTask}
            footer={null}
            //  handleSubmit={this.handleSubmit}
          />
          <div style={styles.headerRow} className="title-bar">
            <div style={styles.header} className="title-bar__title">
              Innovation Funnel
            </div>
          </div>

          <Collapse  >
          <Panel header="Filters" key="1">

          <Row style={styles.containerTop}>
            <Col style={styles.containerTopCol}>
              <Row style={{ maxHeigth: 10 }}>Funnel</Row>
              <Row>
                <Select onChange={this.filterFunnel} style={{ width: 180 }}>
                  <Option value="PLATFORM">PLATFORM</Option>
                  <Option value="ECOSYSTEM">ECOSYSTEM</Option>
                  <Option value="ALL">ALL</Option>
                </Select>
              </Row>
            </Col>

            <Col style={styles.containerTopCol}>
              <Row style={{ maxHeigth: 5 }}> Theme</Row>
              <Row>
                <Select onChange={this.filterTheme} style={{ width: 150 }}>
                  {themes.map(row => (
                    <Option key={row} value={row}>
                      {row}
                    </Option>
                  ))}
                </Select>
              </Row>
            </Col>

            <Col style={styles.containerTopCol}>
              <Row style={{ maxHeigth: 5 }}> Project</Row>
              <Row>
                <Select
                  onChange={this.filterThemeProject}
                  style={{ width: 200 }}
                >
                  {projectnames.map(row => (
                    <Option key={row} value={row}>
                      {row}
                    </Option>
                  ))}
                </Select>
              </Row>
            </Col>

            <Col style={styles.containerTopCol}>
              <Row style={{ maxHeigth: 5 }}> Status</Row>
              <Row>
                <Select onChange={this.filterStatus} style={{ width: 200 }}>
                  <Option value="green">
                    <div style={{ flex: 1, alignContent: 'center' }}>
                      PROGRESSING{' '}
                      <Icon style={{ color: 'green' }} type="login" />
                    </div>{' '}
                  </Option>
                  <Option value="yellow">
                    <div style={{ flex: 1 }}>
                      IMPEDIMENT{' '}
                      <Icon style={{ color: 'yellow' }} type="login" />
                    </div>
                  </Option>
                  <Option value="orange">
                    <div style={{ flex: 1 }}>
                      PARKED <Icon style={{ color: 'orange' }} type="login" />
                    </div>
                  </Option>
                  <Option value="red">
                    <div style={{ flex: 1 }}>
                      STOPPED <Icon style={{ color: 'red' }} type="login" />
                    </div>
                  </Option>
                </Select>
              </Row>
            </Col>
          </Row>
          
          </Panel>
        </Collapse>



          <Row>
            <Col style={styles.containerInit} xs>
              <Paper style={styles.titles}>
                <h2 style={styles.funnelHeaders} className="h2">
                  Explore
                </h2>
              </Paper>
              <Row>
                {this.onColumn(initiate, 'initiate')}
                {this.onColumn(scope, 'scope')}
              </Row>
            </Col>
            <Col style={styles.containerExperiment} xs>
              <Paper style={styles.titles}>
                <h2 style={styles.funnelHeaders} className="h2">
                  Experiment
                </h2>
              </Paper>
              <Row>
                {this.onColumn(problem, 'problem')}
                {this.onColumn(solution, 'solution')}
                {this.onColumn(bussiness, 'bussiness')}
              </Row>
            </Col>
            <Col style={styles.containerInit} xs>
              <Paper style={styles.titles}>
                <h2 style={styles.funnelHeaders} className="h2">
                  Execute
                </h2>
              </Paper>
              <Row>
                {this.onColumn(feasibility, 'feasibility')}
                {this.onColumn(mvp, 'mvp')}
              </Row>
            </Col>
            <Col style={styles.containerInit} xs>
              <Paper style={styles.titles}>
                <h2 style={styles.funnelHeaders} className="h2">
                  Scale Up
                </h2>
              </Paper>
              <Row>
                {this.onColumn(softlaunch, 'softlaunch')}
                {this.onColumn(scalelaunch, 'scalelaunch')}
              </Row>
            </Col>
          </Row>
        </Spin>
      </div>
    );
  }
}

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
