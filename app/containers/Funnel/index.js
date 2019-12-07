/* eslint-disable react/button-has-type */
import React, { memo, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Paper from '@material-ui/core/Paper';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Select, Spin, Button, Icon, Collapse } from 'antd';
import moment from 'moment';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import makeSelectFunnel from './selectors';
import FunnelForm from '../../components/addFunnelForm';
import FunnelEditForm from '../../components/editFunnel';
import { styles } from './funnel_styles';
import './fun.css';

import styled from 'styled-components';

import Column from './column';
const columnsdata = [
  {
    id: 'initiate',
    title: 'initiate',
  },
  {
    id: 'scope',
    title: 'scope',
  },
  {
    id: 'problem',
    title: 'problem',
  },
  {
    id: 'solution',
    title: 'solution',
  },
  {
    id: 'bussiness',
    title: 'bussiness',
  },
  {
    id: 'mvp',
    title: 'mvp',
  },
  {
    id: 'feasibility',
    title: 'feasibility',
  },
  {
    id: 'scalelaunch',
    title: 'scalelaunch',
  },
  {
    id: 'softlaunch',
    title: 'softlaunch',
  },
];
const Container = styled.div`
  display: flex;
`;

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Take out the garbage' },
    'task-2': { id: 'task-2', content: 'Watch my favorite show' },
    'task-3': { id: 'task-3', content: 'Charge my phone' },
    'task-4': { id: 'task-4', content: 'Cook dinner' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

const { Panel } = Collapse;
const { Option } = Select;
const url = 'https://aws.openinnovationhub.nl./api/v2/user/session';
const url2 =
  'https://aws.openinnovationhub.nl./api/v2/funnel/_table/funnel.tasks';
const apptoken =
  'cfe595a88b10a4aa5ef460660f6240bd3a72f89e411d31169579444145119f89';

const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

const grid = 8;

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  console.log(removed);
  result.splice(endIndex, 0, removed);
  return result;
};

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
      items: getItems(10),
      columns: initialData,
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

  onCard = (taskproblem, container) => (
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
              {taskproblem.theme}->{taskproblem.projectname}
            </div>

            <Row>
              <Col sm={8}>
                <div
                  style={{
                    minHeigh: 50,
                    fontWeight: 'bolder',
                    color: taskproblem.status === 'yellow' ? 'black' : 'white',
                    backgroundColor: taskproblem.status,
                    textAlign: 'center',
                  }}
                >
                  {this.fixStatus(taskproblem.status)}
                </div>
              </Col>
              <Col sm={4}>{taskproblem.horizon}</Col>
            </Row>

            <Row style={{ marginLeft: 3, marginBottom: 1 }}>
              <div
                style={{
                  fontWeight: 'bold',
                  maxWidth: '90%',
                }}
              >
                PO: {taskproblem.leader} SP:{taskproblem.sponsor}{' '}
              </div>
            </Row>

            <Row style={{ marginLeft: 3, marginBottom: 1 }}>
              <div
                style={{
                  fontWeight: 'bold',
                  maxWidth: '90%',
                }}
              />
            </Row>
            <Row style={{ marginLeft: 3, marginBottom: 1 }}>
              <div
                style={{
                  fontWeight: 'bold',
                  maxWidth: '90%',
                }}
              >
                <div>
                  <div> Coach: {taskproblem.coach}</div>
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
                  <div>
                    {' '}
                    <p style={{ color: 'blue' }}>
                      {moment(taskproblem.createDate).fromNow()}
                    </p>
                  </div>
                </div>
              </div>
            </Row>
          </Paper>
        </Row>
      }
    </div>
  );

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
    const inita = datas.filter(word => word.FunnelPhase === 'initiate');
    const prob = datas.filter(word => word.FunnelPhase === 'problem');
    const scop = datas.filter(word => word.FunnelPhase === 'scope');
    const sol = datas.filter(word => word.FunnelPhase === 'solution');
    const buss = datas.filter(word => word.FunnelPhase === 'bussiness');
    const mvp = datas.filter(word => word.FunnelPhase === 'mvp');
    const feas = datas.filter(word => word.FunnelPhase === 'feasibility');
    const scale = datas.filter(word => word.FunnelPhase === 'scalelaunch');
    const soft = datas.filter(word => word.FunnelPhase === 'softlaunch');

    this.setState({
      initiate: inita.sort((a, b) => a.order - b.order),
      scope: scop.sort((a, b) => a.order - b.order),
      problem: prob.sort((a, b) => a.order - b.order),
      solution: sol.sort((a, b) => a.order - b.order),
      bussiness: buss.sort((a, b) => a.order - b.order),
      mvp: mvp.sort((a, b) => a.order - b.order),
      feasibility: feas.sort((a, b) => a.order - b.order),
      scalelaunch: scale.sort((a, b) => a.order - b.order),
      softlaunch: soft.sort((a, b) => a.order - b.order),
      projectnames,
      themes,
    });
    this.setState({ spinning: false });
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

  filterBar = () => (
    <Collapse>
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
                {this.state.themes.map(row => (
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
              <Select onChange={this.filterThemeProject} style={{ width: 200 }}>
                {this.state.projectnames.map(row => (
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
                    PROGRESSING <Icon style={{ color: 'green' }} type="login" />
                  </div>{' '}
                </Option>
                <Option value="yellow">
                  <div style={{ flex: 1 }}>
                    IMPEDIMENT <Icon style={{ color: 'yellow' }} type="login" />
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
  );

  handleClose = () => {
    this.setState({ setOpen: false });
    this.setState({ setOpenEdit: false });
  };

  onSave = (task, scope, order) => {
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
        order,
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

  fixStatus = status => {
    if (status === 'green') {
      return 'PRGRESSING';
    }
    if (status === 'yellow') {
      return 'IMPEDIMENT';
    }
    if (status === 'orange') {
      return 'PARKED';
    }
    if (status === 'red') {
      return 'STOPPED';
    }
  };

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    console.log('DEST', destination);
    console.log('SRC', source);
    console.log('dragId', draggableId);

    const {
      initiate,
      scope,
      problem,
      solution,
      bussiness,
      scalelaunch,
      softlaunch,
      mvp,
      feasibility,
    } = this.state;

    this.onSave(draggableId, destination.droppableId, destination.index);
    const draggedFrom = source.droppableId;
    const targetContainer = destination.droppableId;
    const targ = !!(draggedFrom && destination.droppableId);

    const mak = this.state[draggedFrom].find(
      task => task.task_id === draggableId,
    );
    this.setState({ draggedTask: mak });

    const start = source.droppableId;
    const finish = destination.droppableId;

    if (start === finish) {
      console.log('FIREDSAAME');
      const modules = reorder(
        this.state[start],
        result.source.index,
        result.destination.index,
      );
      this.setState({
        [start]: modules,
      });
    }
    if (start !== finish) {
      if (draggedFrom === 'initiate' && targ) {
        this.setState({
          initiate: initiate.filter(tasks => tasks.task_id !== draggableId),
        });
      }

      if (draggedFrom === 'problem' && targ) {
        this.setState({
          problem: problem.filter(tasks => tasks.task_id !== draggableId),
        });
      }
      console.log('dragedTask', this.state.draggedTask);

      if (draggedFrom === 'scope' && targ) {
        this.setState({
          scope: scope.filter(tasks => tasks.task_id !== draggableId),
        });
      }
      if (draggedFrom === 'initiate' && targ) {
        this.setState({
          initiate: initiate.filter(tasks => tasks.task_id !== draggableId),
        });
      }
      if (draggedFrom === 'problem' && targ) {
        this.setState({
          problem: problem.filter(tasks => tasks.task_id !== draggableId),
        });
      }
      if (draggedFrom === 'solution' && targ) {
        this.setState({
          solution: solution.filter(tasks => tasks.task_id !== draggableId),
        });
      }
      if (draggedFrom === 'bussiness' && targ) {
        this.setState({
          bussiness: bussiness.filter(tasks => tasks.task_id !== draggableId),
        });
      }
      if (draggedFrom === 'mvp' && targ) {
        this.setState({
          mvp: mvp.filter(tasks => tasks.task_id !== draggableId),
        });
      }
      if (draggedFrom === 'feasibility' && targ) {
        this.setState({
          feasibility: feasibility.filter(
            tasks => tasks.task_id !== draggableId,
          ),
        });
      }
      if (draggedFrom === 'softlaunch' && targ) {
        this.setState({
          softlaunch: softlaunch.filter(tasks => tasks.task_id !== draggableId),
        });
      }
      if (draggedFrom === 'scalelaunch' && targ) {
        this.setState({
          scalelaunch: scalelaunch.filter(
            tasks => tasks.task_id !== draggableId,
          ),
        });
      }

      const { draggedTask } = this.state;

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

      // this.getData();
    }
  };

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
        {this.filterBar()}
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Container>
            {columnsdata.map(col => (
              <Column key={col.id} column={col} tasks={this.state[col.id]} />
            ))}
          </Container>
        </DragDropContext>
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
