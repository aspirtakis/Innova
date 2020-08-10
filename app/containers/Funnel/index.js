/* eslint-disable react/button-has-type */
import React, { memo, Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Paper from '@material-ui/core/Paper';
import { DragDropContext } from 'react-beautiful-dnd';
import { ConfigProvider } from 'antd';
import {
   Button, Select, Icon, Collapse, Spin, Switch, LocaleProvider,Input,
} from 'antd';
import { DatePicker } from 'antd';


import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import makeSelectFunnel from './selectors';
import FunnelForm from '../../components/addFunnelForm';
import FunnelEditForm from '../../components/editFunnel';
import { styles } from './funnel_styles';
import Column from './column';
import { backend } from '../../utils/config';
import { sessionCheck } from 'containers/App/actions';
import nlNL from 'antd/es/locale/nl_NL';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from "react-router-dom";

  import moment from 'moment';
  const dateFormat = 'DD/MM/YYYY HH:mm:ss';
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
        id: 'business',
        title: 'business',
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
    {
        id: 'backlog',
        title: 'Backlog',
    },
    {
        id: 'archive',
        title: 'Archive',
    },
    {
        id: 'integration',
        title: 'integration',
    },

];
// const Container = styled.div`
//   display: flex;
// `;



const { Panel } = Collapse;
const { Option } = Select;

const url = backend.beUrl + backend.sessionUrl;
const tasksUrl = backend.beUrl + backend.tasks;

const { apptoken } = backend;

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
            sestoken:  '',
            setOpen: false,
            setOpenEdit: false,
            selectedTask: '',
            backlog: [],
            archive: [],
            integration: [],
            initiate: [],
            scope: [],
            problem: [],
            solution: [],
            business: [],
            mvp: [],
            feasibility: [],
            scalelaunch: [],
            softlaunch: [],
            projectnames: [],
            spinning: false,
            themes: [],
            expanded: '',
            setExpanded: true,
            activeOperations: false,
            checked: false,
            checkedToday: false,
        };
    }

    componentDidMount() {
        this.setState({ spinning: true });;
        //console.log(this.props.user);
        if (this.props.user && this.props.user.session_token.length > 0) {
            this.setState({ sestoken: this.props.user.session_token });
            this.getData();
            this.setState({ spinning: true });
            this.setState({permissions:this.props.user.role});
    
        }
        if (!this.props.user && !this.props.user.session_token.length > 0) {
            location.href = '/';
        }
        this.setState({ spinning: false });

    }

    // static getDerivedStateFromProps(nextProps, prevProps) {
    //   //console.log("NEXT",nextProps);
    //   if(nextProps.user && nextProps.user.session_token){
    //     this.setState({ sestoken: this.nextProps.user.session_token });
    //     this.getData();
    //     this.setState({ spinning: false });
    //   }
    // }

  getData = () => {
   this.props.dispatch(sessionCheck());
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
          .then((response) => {
              if (!response.ok) {
                  throw Error(response.statusText);
              }
              return response;
          })
          .then(response => response.json())
          .then((taskData) => {
              const datas = taskData.resource;
              this.setStates(datas);
          })
          .catch(taskData => console.log(taskData));
  };
  getDataFiltered = (e) => {
    this.props.dispatch(sessionCheck());
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
           .then((response) => {
               if (!response.ok) {
                   throw Error(response.statusText);
               }
               return response;
           })
           .then(response => response.json())
           .then((taskData) => {
               const datas = taskData.resource;
             
               const myName = datas.filter(name => name.includes("0"));


    
               console.log(myName);
          //     this.setStates(result);
           })
           .catch(taskData => console.log(taskData));
   };
  setStates = (datas) => {
      const officersIds = datas.map(officer => officer.projectname);
      const projectnames = officersIds.reduce(
          (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
          [],
      );
      const officersIds2 = datas.map(officer2 => officer2.theme);
      const themes = officersIds2.reduce(
          (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
          [],
      );
      const arch = datas.filter(word => word.FunnelPhase === 'archive');
      const backl = datas.filter(word => word.FunnelPhase === 'backlog');
      const inita = datas.filter(word => word.FunnelPhase === 'initiate');
      const prob = datas.filter(word => word.FunnelPhase === 'problem');
      const scop = datas.filter(word => word.FunnelPhase === 'scope');
      const sol = datas.filter(word => word.FunnelPhase === 'solution');
      const buss = datas.filter(word => word.FunnelPhase === 'business');
      const mvp = datas.filter(word => word.FunnelPhase === 'mvp');
      const feas = datas.filter(word => word.FunnelPhase === 'feasibility');
      const scale = datas.filter(word => word.FunnelPhase === 'scalelaunch');
      const soft = datas.filter(word => word.FunnelPhase === 'softlaunch');
      const integration = datas.filter(word => word.FunnelPhase === 'integration');

      this.setState({
          archive: arch.sort((a, b) => a.order - b.order),
          backlog: backl.sort((a, b) => a.order - b.order),
          initiate: inita.sort((a, b) => a.order - b.order),
          scope: scop.sort((a, b) => a.order - b.order),
          problem: prob.sort((a, b) => a.order - b.order),
          solution: sol.sort((a, b) => a.order - b.order),
          business: buss.sort((a, b) => a.order - b.order),
          mvp: mvp.sort((a, b) => a.order - b.order),
          feasibility: feas.sort((a, b) => a.order - b.order),
          scalelaunch: scale.sort((a, b) => a.order - b.order),
          softlaunch: soft.sort((a, b) => a.order - b.order),
          integration: integration.sort((a, b) => a.order - b.order),
          projectnames,
          themes,
      });
      this.setState({ spinning: false });
  };
  handleOpen = () => {
    this.props.dispatch(sessionCheck());
      this.setState({ setOpen: true });
  };
  handleOpenEdit = (data) => {
    this.props.dispatch(sessionCheck());
      this.setState({ selectedTask: data });
      this.setState({ setOpenEdit: true });
  };
  filter = (type, project) => {
      this.setState({ spinning: true });
      const projectUrl = `${tasksUrl}?filter=${type}=${project}`;
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
          .then((response) => {
              if (!response.ok) {
                  throw Error(response.statusText);
              }
              return response;
          })
          .then(response => response.json())
          .then((taskData) => {
              const datas = taskData.resource;
              this.setStates(datas);
              this.setState({ spinning: false });
          })
          .catch(taskData => console.log(taskData));
  };
  filterDepartment = (funnel) => {
      this.setState({ spinning: true });
      let funnelUrl = `${tasksUrl}?filter=funnel=${funnel}`;
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
          .then((response) => {
              if (!response.ok) {
                  throw Error(response.statusText);
              }
              return response;
          })
          .then(response => response.json())
          .then((taskData) => {
              const datas = taskData.resource;
              this.setStates(datas);
              this.setState({ spinning: false });
          })
          .catch(taskData => console.log(taskData));
  };
  filterToday = (e) => {
    console.log(e);
    const date = new Date();
    this.setState({ spinning: true });
    let funnelUrl = `${tasksUrl}?filter=nexStageGate=${e}`;
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
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => response.json())
        .then((taskData) => {
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
  reloadData = () => {
    //console.log("FIRE GET DATA");
    this.getData();
};
  showOperations = (checked) => {
      this.setState({ checked });
  };
  filterBar = () => (
      <Collapse>
          <Panel header="Filters" key="1">
              <Row style={styles.containerTop}>
                   {!(this.props.user.role === "Tv" || this.props.user.role === "Viewer") && <Col style={{ maxWidth: 100 }}>
                        <Row style={{ maxHeigth: 20 }}>BackLog</Row>
                        <Switch checked={this.state.checked} defaultChecked={false} onChange={this.showOperations} />
                    </Col>}
                    <Col>
     
                    <Row>
                        <Button onClick={this.reloadData} style={{ marginTop:15}}>Reset
                    
                        </Button>
                    </Row>
                </Col>

                    <Col>
                      <Row style={{ maxHeigth: 10 }}>StageGate</Row>
                      <Row>
                      <DatePicker 

                      showTime={{
                        hideDisabledOptions: true,
                      }}
                      
                      format={dateFormat}
                      onChange={(date, dateString) => {
                        this.filterToday(moment(date).format(dateFormat));
                       
                      } } />
                      </Row>
                  </Col>
              
                  <Col>
                      <Row style={{ maxHeigth: 10 }}>Department</Row>
                      <Row>
                          <Select allowClear onChange={this.filterDepartment} style={{ width: 80 }}>
                          <Option value="OIH">OIH</Option>
                      <Option value="CM">CM</Option>
                      <Option value="BM">BM</Option>
                      <Option value="WS">WS</Option>
                      <Option value="OPS">OPS</Option>
                          </Select>
                      </Row>
                  </Col>
       
                  <Col>
                      <Row style={{ maxHeigth: 5 }}>Search</Row>
                      <Row>
                          <Input allowClear  onChange={e => this.getDataFiltered(e.target.value)} style={{ width: 150 }}>
                          </Input>
                      </Row>
                  </Col>
                  <Col style={styles.containerTopCol}>
                      <Row style={{ maxHeigth: 5 }}> Status</Row>
                      <Row>
                          <Select allowClear  onChange={e => this.filter('status', e)} style={{ width: 150 }}>
                              <Option value="green">
                                  <div style={{ flex: 1, alignContent: 'center' }}>
                    PROGRESSING
                                      {' '}
                                      <Icon style={{ color: 'green' }} type="login" />
                                  </div>
                                  {' '}
                              </Option>
                              <Option value="yellow">
                                  <div style={{ flex: 1 }}>
                    IMPEDIMENT
                                      {' '}
                                      <Icon style={{ color: 'yellow' }} type="login" />
                                  </div>
                              </Option>
                              <Option value="orange">
                                  <div style={{ flex: 1 }}>
                    PARKED
                                      {' '}
                                      <Icon style={{ color: 'orange' }} type="login" />
                                  </div>
                              </Option>
                              <Option value="red">
                                  <div style={{ flex: 1 }}>
                    STOPPED
                                      {' '}
                                      <Icon style={{ color: 'red' }} type="login" />
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
  onSave = (task, scope, order ) => {
      const url4 = `${tasksUrl}/${task}`;
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
              updateDate: new Date(),
              order,
          }),
      })
          .then((response) => {
              if (!response.ok) {
                  throw Error(response.statusText);
              }
              return response;
          })
          .then(response => response.json())
          .then((taskData) => {
              // //console.log(taskData);
              this.getData();
          })
          .catch(taskData => console.log(taskData));
  };
  onSaveBirth = (task,date ) => {
    const url4 = `${tasksUrl}/${task}`;
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
            updateDate: new Date(),
            birthonproblem:date,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => response.json())
        .then((taskData) => {
            // //console.log(taskData);
            this.getData();
        })
        .catch(taskData => console.log(taskData));
};
  fixStatus = (status) => {
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
  onDragEnd = (result) => {
      const { destination, source, draggableId } = result;
      console.log(result);
      if (!destination) {
          return;
      }

      if (
          destination.droppableId === source.droppableId
      && destination.index === source.index
      ) {
          return;
      }
      const {
          initiate,
          integration,
          archive,
          backlog,
          scope,
          problem,
          solution,
          business,
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
      console.log(mak);
      const birth = !mak.birthonproblem && mak.FunnelPhase === 'problem' &&  this.onSaveBirth(draggableId, new Date);
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
          if (draggedFrom === 'backlog' && targ) {
              this.setState({
                  backlog: backlog.filter(tasks => tasks.task_id !== draggableId),
              });
          }
          if (draggedFrom === 'archive' && targ) {
              this.setState({
                  archive: archive.filter(tasks => tasks.task_id !== draggableId),
              });
          }
          if (draggedFrom === 'initiate' && targ) {
              this.setState({
                  initiate: initiate.filter(tasks => tasks.task_id !== draggableId),
              });
          }

          if (draggedFrom === 'scope' && targ) {
              this.setState({
                  scope: scope.filter(tasks => tasks.task_id !== draggableId),
              });
          }

          if (draggedFrom === 'problem' && targ) {
              this.setState({
                  problem: problem.filter(tasks => tasks.task_id !== draggableId),
              });
          }

          if (draggedFrom == 'solution' && targ) {
              this.setState({
                  solution: solution.filter(tasks => tasks.task_id !== draggableId),
              });
          }
          if (draggedFrom === 'business' && targ) {
              this.setState({
                  business: business.filter(tasks => tasks.task_id !== draggableId),
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
          if (draggedFrom === 'integration' && targ) {
            this.setState({
                integration: integration.filter(
                    tasks => tasks.task_id !== draggableId,
                ),
            });
        }

          const { draggedTask } = this.state;
          // /ADD STATE
          if (targetContainer === 'backlog') {
              this.setState({
                  backlog: [...backlog, draggedTask],
                  draggedTask: {},
              });
          }
          if (targetContainer === 'archive') {
              this.setState({
                  archive: [...archive, draggedTask],
                  draggedTask: {},
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
          if (targetContainer === 'problem') {
              this.setState({
                  problem: [...problem, draggedTask],
                  draggedTask: {},
              });
          }
          if (targetContainer === 'business') {
              this.setState({
                  business: [...business, draggedTask],
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
          if (targetContainer === 'integration') {
            this.setState({
                integration: [...integration, draggedTask],
                draggedTask: {},
            });
        }
      }
  };
  countTasks = (type) =>{

  }
  render() {


      const { selectedTask, sestoken, checked } = this.state;

      return (
          <ConfigProvider locale={nlNL}>
          <div style={{ marginLeft: 10 }}>
              <FunnelForm
                  userRole={this.props.user.role}
                  sestoken={sestoken}
                  visible={this.state.setOpen}
                  onCancel={this.handleClose}
                  onOK={this.handleOk}
          
                  handleSubmit={this.handleSubmit} />
              <FunnelEditForm
                  users={this.props.users}
                  user={this.props.user}
                  sessionCheck={() => this.props.dispatch(sessionCheck())}
                  userRole={this.props.user.role}
                  sestoken={sestoken}
                  visible={this.state.setOpenEdit}
                  onCancel={this.handleClose}
                  onOK={this.handleOk}
                  data={selectedTask}
                  reload={this.getData}
                  footer={null} />
              {/*!(this.props.user.role === 'Tv' ) && this.filterBar()*/}
              <DragDropContext  
              onDragEnd={this.onDragEnd}>
                  <div style={styles.coreContainer}>
                      { checked && (
                          <Col style={styles.coreColumn}>
                              <Row>
                                  <div style={styles.titles}>
                                      <div className="title-bar__title">Operations</div>
                                  </div>
                              </Row>
                              <Row style={styles.rowsborder}></Row>
                              <Row style={{ flexWrap: 'nowrap' }}>
                                  <Column
                          
                                      userRole={this.props.user.role}
                                      xs={6}
                                      openEdit={this.handleOpenEdit}
                                      addNewTask={this.handleOpen}
                                      key={columnsdata[9].id}
                                      column={columnsdata[9]}
                                      tasks={this.state[columnsdata[9].id]} />
                                  <Column
                                      userRole={this.props.user.role}
                                      xs={6}
                                      openEdit={this.handleOpenEdit}
                                      addNewTask={this.handleOpen}
                                      key={columnsdata[10].id}
                                      column={columnsdata[10]}
                                      tasks={this.state[columnsdata[10].id]} />
                              </Row>
                          </Col>
                      )}
                      <Col style={styles.coreColumn}>
                          <Row>
                              <div style={styles.titles}>
                                  <div >Explore</div>
                              </div>
            
                          </Row>
                          <Row style={styles.rowsborder}></Row>

                          <Row style={{ flexWrap: 'nowrap' }}>
                              <Column
                                  userRole={this.props.user.role}
                                  xs={6}
                                  openEdit={this.handleOpenEdit}
                                  addNewTask={this.handleOpen}
                                  key={columnsdata[0].id}
                                  column={columnsdata[0]}
                                  style={{minWidth:260}}
                                  tasksCount={this.state.initiate.length}
                                  tasks={this.state[columnsdata[0].id]} />
                           
                              <Column
                                  userRole={this.props.user.role}
                                  xs={6}
                                  openEdit={this.handleOpenEdit}
                                  addNewTask={this.handleOpen}
                                  key={columnsdata[1].id}
                                  tasksCount={this.state.scope.length}
                                  column={columnsdata[1]}
                                  style={{minWidth:260}}
                        
                                  tasks={this.state[columnsdata[1].id]} />
                          </Row>
                      </Col>
                      <Col xs={4} style={styles.coreColumnExp}>
                          <Row>
                              <div style={styles.titles}>
                                  <div className="title-bar__title">Validate</div>
                              </div>
                          </Row>
                          <Row style={styles.rowsborder}></Row>
                          <Row style={{ flexWrap: 'nowrap' }}>
                              <Column
                                      userRole={this.props.user.role}
                                  openEdit={this.handleOpenEdit}
                                  addNewTask={this.handleOpen}
                                  key={columnsdata[2].id}
                                  column={columnsdata[2]}
                                  tasksCount={this.state.problem.length}
                                  tasks={this.state[columnsdata[2].id]} />
                              <Column
                                      userRole={this.props.user.role}
                                  openEdit={this.handleOpenEdit}
                                  addNewTask={this.handleOpen}
                                  key={columnsdata[3].id}
                                  column={columnsdata[3]}
                                  tasksCount={this.state.solution.length}
                                  tasks={this.state[columnsdata[3].id]} />
                              <Column
                                      userRole={this.props.user.role}
                                  openEdit={this.handleOpenEdit}
                                  addNewTask={this.handleOpen}
                                  key={columnsdata[4].id}
                                  column={columnsdata[4]}
                                  tasksCount={this.state.business.length}
                                  tasks={this.state[columnsdata[4].id]} />
                                                        <Column
                                  userRole={this.props.user.role}
                                  openEdit={this.handleOpenEdit}
                                  addNewTask={this.handleOpen}
                                  key={columnsdata[6].id}
                                  column={columnsdata[6]}
                                  tasksCount={this.state.feasibility.length}
                                  tasks={this.state[columnsdata[6].id]} />
                          </Row>
                      </Col>
                      <Col style={styles.coreColumn}>
                          <Row>
                              <div style={styles.titles}>
                                  <div className="title-bar__title">Execute</div>
                              </div>
                          </Row>
                          <Row style={styles.rowsborder}></Row>

                          <Row style={{ flexWrap: 'nowrap' }}>
        
                              <Column
                                      userRole={this.props.user.role}
                                  openEdit={this.handleOpenEdit}
                                  addNewTask={this.handleOpen}
                                  key={columnsdata[5].id}
                                  column={columnsdata[5]}
                                  tasksCount={this.state.mvp.length}
                                  tasks={this.state[columnsdata[5].id]} />
                                        <Column
                                      userRole={this.props.user.role}
                                  openEdit={this.handleOpenEdit}
                                  addNewTask={this.handleOpen}
                                  key={columnsdata[8].id}
                                  column={columnsdata[8]}
                                  tasksCount={this.state.softlaunch.length}
                                  tasks={this.state[columnsdata[8].id]} />
                          </Row>
                      </Col>
                      <Col style={styles.coreColumn}>
                          <Row>
                              <Paper style={styles.titles}>
                                  <div className="title-bar__title">Scale</div>
                              </Paper>
                          </Row>
                          <Row style={styles.rowsborder}></Row>

                          <Row style={{ flexWrap: 'nowrap' }}>
                          <Column
                                  userRole={this.props.user.role}
                                  openEdit={this.handleOpenEdit}
                                  addNewTask={this.handleOpen}
                                  key={columnsdata[7].id}
                                  tasksCount={this.state.scalelaunch.length}
                                  column={columnsdata[7]}
                                  tasks={this.state[columnsdata[7].id]} />
                          <Column
                                  userRole={this.props.user.role}
                                  openEdit={this.handleOpenEdit}
                                  addNewTask={this.handleOpen}
                                  key={columnsdata[11].id}
                                  column={columnsdata[11]}
                                  tasksCount={this.state.integration.length}
                                  tasks={this.state[columnsdata[11].id]} />

                                                

                          </Row>
                      </Col>
                  </div>
              </DragDropContext>
          </div>
          </ConfigProvider>
      );
  }
}

function mapStateToProps(state) {
    return {
        user: state.global.user,
        users: state.global.users,
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
