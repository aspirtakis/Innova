import React, { memo, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Paper from '@material-ui/core/Paper';
import { Row, Col } from 'react-flexbox-grid';
import makeSelectFunnel from './selectors';

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
      status: 'red',
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
      status: 'blue',
    },
    {
      taskID: 4,
      task: 'ReferalDeals',
      funnelPhase: 'scope',
      horizon: 'API',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      status: 'white',
    },
    {
      taskID: 5,
      task: 'ReferalDeals',
      funnelPhase: 'scope',
      status: 'white',
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
      status: 'blue',
    },
    {
      taskID: 7,
      task: 'ReferalDeals',
      funnelPhase: 'scope',
      horizon: 'API',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      status: 'white',
    },
    {
      taskID: 8,
      task: 'ReferalDeals',
      funnelPhase: 'scope',
      status: 'white',
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
      status: 'blue',
    },
    {
      taskID: 11,
      task: 'ReferalDeals',
      funnelPhase: 'scope',
      horizon: 'API',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      status: 'white',
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
      status: 'blue',
    },
    {
      taskID: 13,
      task: 'ReferalDeals',
      funnelPhase: 'scope',
      horizon: 'API',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      status: 'white',
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
      status: 'blue',
    },
    {
      taskID: 15,
      task: 'ReferalDeals',
      funnelPhase: 'scope',
      horizon: 'API',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      status: 'white',
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
      status: 'blue',
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
      status: 'blue',
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
      status: 'blue',
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
    backgroundColor: 'white',
    maxWidth: '20%',
    minHeight: '100%',
  },

  colInit: {
    minHeight: '100%',
    backgroundColor: 'rgba(230, 230, 230,1)',
  },
  containerExperiment: {
    backgroundColor: '#f0f0f0',
    minWidth: '30%',
    minHeight: '100%',
  },
};

class Funnel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetOn: true,
      initiate: data.initiate,
      scope: data.scope,
      problem: data.problem,
      solution: data.solution,
      bussiness: data.bussiness,
    };
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
  };

  onColumn = (datas, container) => (
    <Col xs>
      <div
        container={container}
        onDrop={event => this.onDrop(event)}
        onDragOver={event => this.onDragOver(event)}
        style={styles.colInit}
      >
        {container}
        {datas.map(taskproblem => (
          <div
            key={taskproblem.taskID}
            container={container}
            draggable
            onDrag={event => this.onDrag(event, taskproblem)}
            onDragOver={event => this.onDragOver(event)}
          >
            {
              <Paper style={{ backgroundColor: taskproblem.status }}>
                {taskproblem.task}
              </Paper>
            }
          </div>
        ))}
      </div>
    </Col>
  );

  render() {
    const { initiate, scope, problem, solution, bussiness } = this.state;
    return (
      <Row>
        <Col style={styles.containerInit} xs>
          <Paper>EXPLORE</Paper>
          <Row>
            {this.onColumn(initiate, 'initiate')}
            {this.onColumn(scope, 'scope')}
          </Row>
        </Col>
        <Col style={styles.containerExperiment} xs>
          <Paper>EXPERIMENT</Paper>
          <Row>
            {this.onColumn(problem, 'problem')}
            {this.onColumn(solution, 'solution')}
            {this.onColumn(bussiness, 'bussiness')}
          </Row>
        </Col>
        <Col style={styles.containerInit} xs>
          EXPLORE
          <Row>
            <Col xs>FEASIBILITY</Col>
            <Col xs>MVP</Col>
          </Row>
        </Col>
        <Col style={styles.containerInit} xs>
          SCALE UP
          <Row>
            <Col xs>
              SOFTLAUNCH
              <Paper>dsdsdsdsds</Paper>
            </Col>
            <Col xs>SCALELAUNCH</Col>
          </Row>
        </Col>
      </Row>
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
