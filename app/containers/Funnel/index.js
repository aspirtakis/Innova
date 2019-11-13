import React, { memo, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Paper from '@material-ui/core/Paper';
import { Row, Col } from 'react-flexbox-grid';

import Button from '@material-ui/core/Button';
import { Select, Spin } from 'antd';
import makeSelectFunnel from './selectors';
import FunnelForm from '../../components/addFunnelForm';
import FunnelEditForm from '../../components/editFunnel';
import { styles } from './funnel_styles';

const { Option } = Select;

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
    };
  }

  componentDidMount() {
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
        fetch(url2, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'X-DreamFactory-API-Key': apptoken,
            'X-DreamFactory-Session-Token': resdata.session_token,
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
            this.setState({
              initiate: datas.filter(word => word.FunnelPhase === 'initiate'),
              scope: datas.filter(word => word.FunnelPhase === 'scope'),
              problem: datas.filter(word => word.FunnelPhase === 'problem'),
              solution: datas.filter(word => word.FunnelPhase === 'solution'),
              bussiness: datas.filter(word => word.FunnelPhase === 'bussiness'),
              mvp: datas.filter(word => word.FunnelPhase === 'mvp'),
              feasibility: datas.filter(
                word => word.FunnelPhase === 'feasibility',
              ),
              scalelaunch: datas.filter(
                word => word.FunnelPhase === 'scalelaunch',
              ),
              softlaunch: datas.filter(
                word => word.FunnelPhase === 'softlaunch',
              ),
            });

            this.setState({ spinning: false });
          })

          .catch(taskData => console.log(taskData));
      })

      .catch(response => console.log(response));
  }

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

  handleOpenEdit = (data) => {
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
        });
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
        const officersIds = datas.map(function(officer) {
          return officer.projectname;
        });
        const projectnames = officersIds.reduce(
          (unique, item) =>
            unique.includes(item) ? unique : [...unique, item],
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
        });
        this.setState({ spinning: false });
      })
      .catch(taskData => console.log(taskData));
  };

  handleOk = () => {
    this.setState({ spinning: true });
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
        });
        this.setState({ setOpen: false });
        this.setState({ setOpenEdit: false });
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
    this.onSave(draggedTask.task_id, targetContainer);
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
    <Col xs>
      <div
        container={container}
        onDrop={event => this.onDrop(event)}
        onDragOver={event => this.onDragOver(event)}
        style={styles.zebra1}
      >
        <Paper style={styles.ColTitles}>{container.toUpperCase()}</Paper>
        {datas.map(taskproblem => (
          <div
            key={taskproblem.task_id}
            container={container}
            draggable
            onDrag={event => this.onDrag(event, taskproblem)}
            onDragOver={event => this.onDragOver(event)}
          >
            {
              <Paper
                style={{
                  backgroundColor: 'white',
                  color: 'black',
                  fontSize: 10,
                  margin: 5,
                  minHeight: 100,
                  minWidth: 120,
                  maxHeight: 100,
                  maxWidth: 120,
                }}
                onDoubleClick={() => this.handleOpenEdit(taskproblem)}
              >
                <div
                  style={{
                    minWidth: 100,
                    minHeigh: 50,
                    fontWeight: 'bolder',
                    backgroundColor: taskproblem.status,
                    textAlign: 'center',
                  }}
                >
                  <div>
                    {taskproblem.projectname}/{taskproblem.horizon} <br />
                  </div>
                </div>

                <div
                  style={{
                    margin: 5,
                  }}
                >
                  {taskproblem.leader}/{taskproblem.sponsor} <br />
                  <br />
                  <div>
                    Title:{taskproblem.title} <br />
                  </div>
                  <div>
                    Coach:{taskproblem.coach} <br />
                  </div>
                </div>
              </Paper>
            }
          </div>
        ))}
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
          <Row>
            <Button onClick={this.handleOpen} type="button">
              Create Task
            </Button>
            <Select onChange={this.filterTheme} style={{ width: 180 }}>
              <Option value="ALL">ALL</Option>
              <Option value="AGRI">AGRI</Option>
              <Option value="MOBILITY">MOBILITY</Option>
              <Option value="MEDIA-ADVERTISING">MEDIA-ADVERTISING</Option>
              <Option value="DIGITAL-IDENTITY">DIGITAL-IDENTITY</Option>
              <Option value="BLOCKCHAIN">BLOCKCHAIN</Option>
            </Select>

            <Select onChange={this.filterThemeProject} style={{ width: 150 }}>
              {projectnames.map(row => (
                <Option key={row} value={row}>
                  {row}
                </Option>
              ))}
            </Select>
          </Row>
          <Row>
            <Col style={styles.containerInit} xs>
              <Paper style={styles.titles}>EXPLORE</Paper>
              <Row>
                {this.onColumn(initiate, 'initiate')}
                {this.onColumn(scope, 'scope')}
              </Row>
            </Col>
            <Col style={styles.containerExperiment} xs>
              <Paper style={styles.titles}>EXPERIMENT</Paper>
              <Row>
                {this.onColumn(problem, 'problem')}
                {this.onColumn(solution, 'solution')}
                {this.onColumn(bussiness, 'bussiness')}
              </Row>
            </Col>
            <Col style={styles.containerInit} xs>
              <Paper style={styles.titles}>EXECUTE</Paper>
              <Row>
                {this.onColumn(feasibility, 'feasibility')}
                {this.onColumn(mvp, 'mvp')}
              </Row>
            </Col>
            <Col style={styles.containerEnd} xs>
              <Paper style={styles.titles}>SCALE UP</Paper>
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
