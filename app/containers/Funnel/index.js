/* eslint-disable react/button-has-type */
import React, { memo, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Paper from '@material-ui/core/Paper';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { Select, Icon, Collapse, Spin } from 'antd';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import makeSelectFunnel from './selectors';
import FunnelForm from '../../components/addFunnelForm';
import FunnelEditForm from '../../components/editFunnel';
import { styles } from './funnel_styles';
import './fun.css';
import Column from './column';
import {backend} from '../../utils/config';

const columnsdata = [
  {
    id: 'initiate',
    title: 'Initiate',
  },
  {
    id: 'scope',
    title: 'Scope',
  },
  {
    id: 'problem',
    title: 'Problem',
  },
  {
    id: 'solution',
    title: 'Solution',
  },
  {
    id: 'bussiness',
    title: 'Bussiness',
  },
  {
    id: 'mvp',
    title: 'Mvp',
  },
  {
    id: 'feasibility',
    title: 'Feasibility',
  },
  {
    id: 'scalelaunch',
    title: 'Scalelaunch',
  },
  {
    id: 'softlaunch',
    title: 'Softlaunch',
  },
];
const Container = styled.div`
  display: flex;
`;

const { Panel } = Collapse;
const { Option } = Select;

const url = backend.beUrl+backend.sessionUrl;
const tasksUrl = backend.beUrl + backend.tasks;

const apptoken = backend.apptoken;

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

class Funnel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetOn: true,
      sestoken:'',
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
    this.setState({ spinning: true });
    console.log("MINT",this.props);
    console.log("BE",backend);
    if(this.props.user && this.props.user.session_token.length > 0 ){
      this.setState({ sestoken: this.props.user.session_token });
      this.getData();
      this.setState({ spinning: true });
    }
    this.setState({ spinning: false });
  }

  // static getDerivedStateFromProps(nextProps, prevProps) {
  //   console.log("NEXT",nextProps);
  //   if(nextProps.user && nextProps.user.session_token){
  //     this.setState({ sestoken: this.nextProps.user.session_token });
  //     this.getData();
  //     this.setState({ spinning: false });
  //   }
  // }

  getData = () => {
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


  filter = (type, project) => {
    this.setState({ spinning: true });
    const projectUrl = tasksUrl+'?filter='+type+'='+project;
    fetch(projectUrl, {
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


  filterDepartment = funnel => {
    this.setState({ spinning: true });
    let funnelUrl = tasksUrl+'?filter=funnel=' + funnel;
    if (funnel === 'ALL') {
      funnelUrl = tasksUrl;
    }
    fetch(funnelUrl, {
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
    this.getData();
  };

  filterBar = () => (
    <Collapse>
      <Panel header="Filters" key="1">
        <Row style={styles.containerTop}>
          <Col style={styles.containerTopCol}>
            <Row style={{ maxHeigth: 10 }}>Department</Row>
            <Row>
              <Select onChange={ this.filterDepartment} style={{ width: 180 }}>
                <Option value="PLATFORM">PLATFORM</Option>
                <Option value="ECOSYSTEM">ECOSYSTEM</Option>
                <Option value="ALL">ALL</Option>
              </Select>
            </Row>
          </Col>

          <Col style={styles.containerTopCol}>
            <Row style={{ maxHeigth: 5 }}> Theme</Row>
            <Row>
              <Select onChange={(e) => this.filter('theme',e)} style={{ width: 150 }}>
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
              <Select onChange={(e) => this.filter('projectname',e)} style={{ width: 200 }}>
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
              <Select onChange={(e) => this.filter("status",e)} style={{ width: 200 }}>
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
    const url4 = tasksUrl+'/'+task;
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
      return 'PROGRESSING';
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
    return 'NO SET';
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

    const newLocal = this.state;
    const mak = newLocal[draggedFrom].find(
      task => task.task_id === draggableId,
    );
    this.setState({ draggedTask: mak });

    const start = source.droppableId;
    const finish = destination.droppableId;

    if (start === finish) {
      const bart = this.state;
      const modules = reorder(
        bart[start],
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
    console.log("{PROPS",this.props);
    const { selectedTask, sestoken } = this.state;
    return (
      <div style={{ marginLeft: 10 }}>
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
        />
        {this.filterBar()}
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Container>
            <Col style={styles.coreColumn}>
              <Row>
                <div style={styles.titles}>
                  <h2 style={styles.funnelHeaders} className="h2">
                    Explore
                  </h2>
                </div>
              </Row>

              <Row>
                <Column
                  openEdit={this.handleOpenEdit}
                  addNewTask={this.handleOpen}
                  key={columnsdata[0].id}
                  column={columnsdata[0]}
                  tasks={this.state[columnsdata[0].id]}
                />
                <Column
                  openEdit={this.handleOpenEdit}
                  addNewTask={this.handleOpen}
                  key={columnsdata[1].id}
                  column={columnsdata[1]}
                  tasks={this.state[columnsdata[1].id]}
                />
              </Row>
            </Col>
            <Col style={styles.coreColumnExp}>
              <Row>
                <Paper style={styles.titles}>
                  <h2 style={styles.funnelHeaders} className="h2">
                    Experiment
                  </h2>
                </Paper>
              </Row>

              <Row>
                <Column
                  openEdit={this.handleOpenEdit}
                  addNewTask={this.handleOpen}
                  key={columnsdata[2].id}
                  column={columnsdata[2]}
                  tasks={this.state[columnsdata[2].id]}
                />
                <Column
                  openEdit={this.handleOpenEdit}
                  addNewTask={this.handleOpen}
                  key={columnsdata[3].id}
                  column={columnsdata[3]}
                  tasks={this.state[columnsdata[3].id]}
                />
                <Column
                  openEdit={this.handleOpenEdit}
                  addNewTask={this.handleOpen}
                  key={columnsdata[4].id}
                  column={columnsdata[4]}
                  tasks={this.state[columnsdata[4].id]}
                />
              </Row>
            </Col>
            <Col style={styles.coreColumn}>
              <Row>
                <Paper style={styles.titles}>
                  <h2 style={styles.funnelHeaders} className="h2">
                    Execute
                  </h2>
                </Paper>
              </Row>

              <Row>
                <Column
                  openEdit={this.handleOpenEdit}
                  addNewTask={this.handleOpen}
                  key={columnsdata[5].id}
                  column={columnsdata[5]}
                  tasks={this.state[columnsdata[5].id]}
                />
                <Column
                  openEdit={this.handleOpenEdit}
                  addNewTask={this.handleOpen}
                  key={columnsdata[6].id}
                  column={columnsdata[6]}
                  tasks={this.state[columnsdata[6].id]}
                />
              </Row>
            </Col>
            <Col style={styles.coreColumn}>
              <Row>
                <Paper style={styles.titles}>
                  <h2 style={styles.funnelHeaders} className="h2">
                    Scale Up
                  </h2>
                </Paper>
              </Row>

              <Row>
                <Column
                  openEdit={this.handleOpenEdit}
                  addNewTask={this.handleOpen}
                  key={columnsdata[8].id}
                  column={columnsdata[8]}
                  tasks={this.state[columnsdata[8].id]}
                />
                <Column
                  openEdit={this.handleOpenEdit}
                  addNewTask={this.handleOpen}
                  key={columnsdata[7].id}
                  column={columnsdata[7]}
                  tasks={this.state[columnsdata[7].id]}
                />
              </Row>
            </Col>
          </Container>
        </DragDropContext>
     </div>
     
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user:state.global.user,
  };
}
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
