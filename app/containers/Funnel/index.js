import React, { memo, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import InfoBox from 'components/Pages/Dashboard/InfoBox';
import { Grid, Row, Col } from 'react-flexbox-grid';
import makeSelectFunnel from './selectors';
import reducer from './reducer';
import saga from './saga';

class Funnel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetOn: true,
      initiate: [
        {
          taskID: 1,
          task: 'TASK1',
          status: 'yellow',
        },
        {
          taskID: 2,
          task: 'TaSk2',
          status: 'red',
        },
      ],
      scope: [
        {
          taskID: 3,
          task: 'task3',
          status: 'blue',
        },
        {
          taskID: 4,
          task: 'task4',
          status: 'white',
        },
      ],
    };
  }

  onDragOver = event => {
    event.preventDefault();
  };

  onDrag = (event, task) => {
    console.log(event.target.className);
    event.preventDefault();
    this.setState({
      draggedTask: task,
      draggedFrom: event.target.className,
    });
  };

  onDrop = (event, task) => {
    const targetContainer = event.target.className;
    if (!targetContainer) {
      return;
    }

    // fix Probble on double click
    if (targetContainer === 'scope' || targetContainer === 'initiate') {
      this.setState({ targetOn: true });
    } else {
      this.setState({ targetOn: false });
    }
    const targ = this.state.targetOn;

    const { initiate, draggedTask, scope, draggedFrom } = this.state;
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
  };

  render() {
    const { initiate, scope } = this.state;
    return (
      <Row>
        <Col style={{ backgroundColor: ' #99ddff', maxWidth: '20%' }} xs>
          EXPLORE
          <Row>
            <Col xs>
              <div
                style={{ height: 200, backgroundColor: '#4dc3ff' }}
                className="initiate"
                onDrop={event => this.onDrop(event)}
                onDragOver={event => this.onDragOver(event)}
              >
                INITIATE
                {initiate.map(task => (
                  <div
                    key={task.taskID}
                    className="initiate"
                    draggable
                    onDrag={event => this.onDrag(event, task)}
                    onDragOver={event => this.onDragOver(event)}
                  >
                    {
                      <Paper style={{ backgroundColor: task.status }}>
                        {' '}
                        {task.task}
                      </Paper>
                    }
                  </div>
                ))}
              </div>
            </Col>

            <Col xs>
              <div
                className="scope"
                style={{ height: 200, backgroundColor: 'green' }}
                onDrop={event => this.onDrop(event)}
                onDragOver={event => this.onDragOver(event)}
              >
                SCOPE
                {scope.map((tasksc, index) => (
                  <div
                    className="scope"
                    onDrag={event => this.onDrag(event, tasksc)}
                    onDragOver={event => this.onDragOver(event)}
                    key={tasksc.taskID}
                    draggable
                  >
                    <Paper style={{ backgroundColor: tasksc.status }}>
                      {' '}
                      {tasksc.task}
                    </Paper>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Col>
        <Col style={{ backgroundColor: '#33bbff', minWidth: '30%' }} xs>
          EXPERIMENT
          <Row>
            <Col xs>PROBLEM</Col>

            <Col xs>
              SOLUTION
              <div />
            </Col>

            <Col xs>BUSSINESS</Col>
          </Row>
        </Col>
        <Col style={{ backgroundColor: 'Yellow', maxWidth: '25%' }} xs>
          EXPLORE
          <Row>
            <Col xs>FEASIBILITY</Col>
            <Col xs>MVP</Col>
          </Row>
        </Col>
        <Col style={{ backgroundColor: 'Orange', maxWidth: '25%' }} xs>
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

Funnel.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

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
