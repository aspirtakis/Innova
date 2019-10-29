import React, { memo, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Paper from '@material-ui/core/Paper';
import { Row, Col } from 'react-flexbox-grid';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import makeSelectFunnel from './selectors';
import FunnelForm from '../../components/addFunnelForm';

const data = {
  initiate: [
    {
      taskID: 1,
      task: 'E-Sim',
      funnelPhase: 'initiate',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      horizon: 'MEDIA-ADV',
      status: 'yellow',
      project_name: 'API-STORE',
    },

    {
      taskID: 2,
      task: 'Familie Abbo',
      funnelPhase: 'initiate',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      horizon: 'AGRI',
      status: '#87F39E',
    },
  ],
  scope: [
    {
      taskID: 3,
      task: 'E-Sim Tracking',
      funnelPhase: 'scope',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      horizon: 'MEDIA-ADV',
      status: 'pink',
    },
    {
      taskID: 4,
      task: 'ReferalDeals',
      funnelPhase: 'scope',
      horizon: 'API',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      status: 'orange',
    },
    {
      taskID: 5,
      task: 'ReferalDeals',
      funnelPhase: 'scope',
      status: 'orange',
      horizon: 'API',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
    },
  ],
  problem: [
    {
      taskID: 6,
      task: 'E-Sim Tracking',
      funnelPhase: 'scope',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      horizon: 'MEDIA-ADV',
      status: '#C6F197',
    },
    {
      taskID: 7,
      task: 'ReferalDeals',
      funnelPhase: 'scope',
      horizon: 'API',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      status: '#81F0E4',
    },
    {
      taskID: 8,
      task: 'ReferalDeals',
      funnelPhase: 'scope',
      status: '#81F0E4',
      horizon: 'API',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
    },
  ],
  solution: [
    {
      taskID: 10,
      task: 'E-Sim Tracking',
      funnelPhase: 'scope',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      horizon: 'MEDIA-ADV',
      status: 'yellow',
    },
    {
      taskID: 11,
      task: 'ReferalDeals',
      funnelPhase: 'scope',
      horizon: 'API',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      status: '#81F0E4',
    },
  ],
  bussiness: [
    {
      taskID: 12,
      task: 'E-Sim Tracking',
      funnelPhase: 'scope',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      horizon: 'MEDIA-ADV',
      status: '#93D4F7',
    },
    {
      taskID: 13,
      task: 'ReferalDeals',
      funnelPhase: 'scope',
      horizon: 'API',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      status: '#81F0E4',
    },
  ],
  feasibility: [
    {
      taskID: 14,
      task: 'E-Sim Tracking',
      funnelPhase: 'scope',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      horizon: 'MEDIA-ADV',
      status: '#93D4F7',
    },
    {
      taskID: 15,
      task: 'ReferalDeals',
      funnelPhase: 'scope',
      horizon: 'API',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      status: '#81F0E4',
    },
  ],
  mvp: [
    {
      taskID: 16,
      task: 'E-Sim Tracking',
      funnelPhase: 'scope',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      horizon: 'MEDIA-ADV',
      status: 'pink',
    },
    {
      taskID: 17,
      task: 'ReferalDeals',
      funnelPhase: 'scope',
      horizon: 'API',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      status: 'white',
    },
  ],
  softlaunch: [
    {
      taskID: 18,
      task: 'E-Sim Tracking',
      funnelPhase: 'scope',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      horizon: 'MEDIA-ADV',
      status: 'pink',
    },
    {
      taskID: 19,
      task: 'ReferalDeals',
      funnelPhase: 'scope',
      horizon: 'API',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      status: 'white',
    },
  ],
  scalelaunch: [
    {
      taskID: 20,
      task: 'E-Sim Tracking',
      funnelPhase: 'scope',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      horizon: 'MEDIA-ADV',
      status: 'pink',
    },
    {
      taskID: 21,
      task: 'ReferalDeals',
      funnelPhase: 'scope',
      horizon: 'API',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      status: 'white',
    },
  ],
};

const styles = {
  containerInit: {
    backgroundColor: '#BFD3F0',
    maxWidth: '30%',
    minHeight: '100%',
  },
  titles: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#19569E',
    textAlign: 'center',
  },
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: 'white',
    border: '2px solid #000',
  },
  zebra1: {
    minHeight: 500,
    backgroundColor: '#DCF3FF',
    border: '2px solid black',
  },
  zebra2: {
    minHeight: 500,
    backgroundColor: '#CCE8F6',
    border: '2px solid black',
  },

  ColTitles: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#72ACFF',
    textAlign: 'center',
  },
  containerEnd: {
    backgroundColor: '#BFD3F0',
    maxWidth: '30%',
    minWidth: '24%',
    minHeight: '100%',
  },

  colInit: {
    minHeight: 500,

    border: '2px solid black',
  },
  containerExperiment: {
    backgroundColor: '#BFD3F0',
    minWidth: '35%',
    maxWidth: '40%',
    minHeight: '100%',
  },
};

class Funnel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetOn: true,
      setOpen: false,
      initiate: data.initiate,
      scope: data.scope,
      problem: data.problem,
      solution: data.solution,
      bussiness: data.bussiness,
      mvp: data.mvp,
      feasibility: data.feasibility,
      scalelaunch: data.scalelaunch,
      softlaunch: data.softlaunch,
    };
  }
  
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
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
    console.log('clic');
    this.setState({ setOpen: true });
  };
  
  handleOk = () => {
    console.log('clicOk');
  };
  
  handleClose = () => {
    this.setState({ setOpen: false });
  };

  onDrop = event => {
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
        scope: scope.filter(tasks => tasks.taskID !== draggedTask.taskID),
      });
    }
    if (draggedFrom === 'initiate' && targ) {
      this.setState({
        initiate: initiate.filter(tasks => tasks.taskID !== draggedTask.taskID),
      });
    }
    if (draggedFrom === 'problem' && targ) {
      this.setState({
        problem: problem.filter(tasks => tasks.taskID !== draggedTask.taskID),
      });
    }
    if (draggedFrom === 'solution' && targ) {
      this.setState({
        solution: solution.filter(tasks => tasks.taskID !== draggedTask.taskID),
      });
    }
    if (draggedFrom === 'bussiness' && targ) {
      this.setState({
        bussiness: bussiness.filter(
          tasks => tasks.taskID !== draggedTask.taskID,
        ),
      });
    }
    if (draggedFrom === 'mvp' && targ) {
      this.setState({
        mvp: mvp.filter(tasks => tasks.taskID !== draggedTask.taskID),
      });
    }
    if (draggedFrom === 'feasibility' && targ) {
      this.setState({
        feasibility: feasibility.filter(
          tasks => tasks.taskID !== draggedTask.taskID,
        ),
      });
    }
    if (draggedFrom === 'softlaunch' && targ) {
      this.setState({
        softlaunch: softlaunch.filter(
          tasks => tasks.taskID !== draggedTask.taskID,
        ),
      });
    }
    if (draggedFrom === 'scalelaunch' && targ) {
      this.setState({
        scalelaunch: scalelaunch.filter(
          tasks => tasks.taskID !== draggedTask.taskID,
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
  };

  onColumn = (datas, container) => (
    <Col xs>
      <div
        container={container}
        onDrop={event => this.onDrop(event)}
        onDragOver={event => this.onDragOver(event)}
        style={styles.zebra2}
      >
        <Paper style={styles.ColTitles}>{container.toUpperCase()}</Paper>
        {datas.map(taskproblem => (
          <div
            key={taskproblem.taskID}
            container={container}
            draggable
            onDrag={event => this.onDrag(event, taskproblem)}
            onDragOver={event => this.onDragOver(event)}
          >
            {
              <Paper
                style={{
                  backgroundColor: taskproblem.status,
                  color: 'black',
                  fontSize: 12,
                  margin: 5,
                }}
              >
                {taskproblem.task}
              </Paper>
            }
          </div>
        ))}
      </div>
    </Col>
  );

  onColumn2 = (datas, container) => (
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
            key={taskproblem.taskID}
            container={container}
            draggable
            onDrag={event => this.onDrag(event, taskproblem)}
            onDragOver={event => this.onDragOver(event)}
          >
            {
              <Paper
                style={{
                  backgroundColor: taskproblem.status,
                  color: 'black',
                  fontSize: 12,
                  margin: 5,
                  maxWidth: 150,
                }}
              >
                {taskproblem.task}
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
      scope,
      problem,
      solution,
      bussiness,
      feasibility,
      softlaunch,
      scalelaunch,
      mvp,
    } = this.state;

    return (
      <div>
        <FunnelForm
          visible={this.state.setOpen}
          onCancel={this.handleClose}
          onOK={this.handleOk}
          handleSubmit={this.handleSubmit}
        />
        <Row>
          <Button onClick={this.handleOpen} type="button">
            Create Task
          </Button>
        </Row>
        <Row>
          <Col style={styles.containerInit} xs>
            <Paper style={styles.titles}>EXPLORE</Paper>
            <Row>
              {this.onColumn(initiate, 'initiate')}
              {this.onColumn2(scope, 'scope')}
            </Row>
          </Col>
          <Col style={styles.containerExperiment} xs>
            <Paper style={styles.titles}>EXPERIMENT</Paper>
            <Row>
              {this.onColumn(problem, 'problem')}
              {this.onColumn2(solution, 'solution')}
              {this.onColumn(bussiness, 'bussiness')}
            </Row>
          </Col>
          <Col style={styles.containerInit} xs>
            <Paper style={styles.titles}>EXPLORE</Paper>
            <Row>
              {this.onColumn2(feasibility, 'feasibility')}
              {this.onColumn(mvp, 'mvp')}
            </Row>
          </Col>
          <Col style={styles.containerEnd} xs>
            <Paper style={styles.titles}>SCALE UP</Paper>
            <Row>
              {this.onColumn(softlaunch, 'softlaunch')}
              {this.onColumn2(scalelaunch, 'scalelaunch')}
            </Row>
          </Col>
        </Row>
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
