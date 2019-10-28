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
      todos: [
        {
          taskID: 1,
          task: 'Walk the walk',
        },
        {
          taskID: 2,
          task: 'Talk the talk',
        },
        {
          taskID: 3,
          task: 'Jump the jump',
        },
      ],
      completedTasks: [],
      draggedTask: {},
    };
  }

  onDrag = (event, todo) => {
    event.preventDefault();
    this.setState({
      draggedTask: todo,
    });
  };

  onDragBack = (event, todo) => {
    event.preventDefault();
    this.setState({
      completedTasks: [...todo, todo],
      draggedTask: {},
    });
  };

  onDragOver = event => {
    event.preventDefault();
  };

  onDrop = event => {
    const { completedTasks, draggedTask, todos } = this.state;
    this.setState({
      completedTasks: [...completedTasks, draggedTask],
      todos: todos.filter(task => task.taskID !== draggedTask.taskID),
      draggedTask: {},
    });
  };

  render() {
    const { todos, completedTasks } = this.state;
    return (
      <Row>
        <Col style={{ backgroundColor: 'red', maxWidth: '20%' }} xs>
          EXPLORE
          <Row>
            <Col xs>
              INITIATE
              {todos.map(todo => (
                <div
                  key={todo.taskID}
                  draggable
                  onDrop={event => this.onDrop(event)}
                  onDragOver={event => this.onDragOver(event)}
                  onDrag={event => this.onDrag(event, todo)}
                >
                  {todo.task}
                </div>
              ))}
            </Col>
            <Col xs>SCOPE</Col>
          </Row>
        </Col>
        <Col style={{ backgroundColor: 'Blue', minWidth: '30%' }} xs>
          EXPERIMENT
          <Row>
            <Col xs>
              PROBLEM
              {completedTasks.map((task, index) => (
                <div
                  style={{ height: 100, backgroundColor: 'yellow' }}
                  className="droptarget"
                  onDrag={event => this.onDragBack(event, task)}
                  onDrop={event => this.onDrop(event)}
                  onDragOver={event => this.onDragOver(event)}
                  key={task.taskID}
                  draggable
                >
                  {task.task}
                </div>
              ))}
            </Col>

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
