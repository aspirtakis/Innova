import React from 'react';
import {
  Modal,
  Button,
  Spin,
  Collapse,
  Row,
  Col,
DatePicker, 
Tabs 
} from 'antd';

const { TabPane } = Tabs;
import moment from 'moment';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { backend } from '../utils/config';
import Remarks from '../components/remarks';
import ReactQuill from 'react-quill'; // ES6
import EditableTable from './editableTable';
import StageGates from './stagegates';


const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Panel } = Collapse;
const apptoken = backend.apptoken;
const tasksUrl = backend.beUrl + backend.tasks;
const remarksUrl = backend.beUrl + backend.remarks;
const assumptionsUrl = backend.beUrl + backend.assumptions;
const checklistsUrl = backend.beUrl + backend.checklists;
const stageGatesUrl = backend.beUrl + backend.stageGates;
const dateFormat = 'YYYY/MM/DD';

// eslint-disable-next-line react/prefer-stateless-function
class ModalEditTask extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      spinning: false,
      title: data.title,
      funnel: data.funnel,
      description: data.description,
      projectname: data.projectname,
      horizon: data.horizon,
      theme: data.theme,
      status: data.status,
      FunnelPhase: data.FunnelPhase,
      coach: data.coach,
      leader: data.leader,
      sponsor: data.sponsor,
      task_id: data.task_id,
      createDate: data.createDate,
      spnsr: data.spnsr,
      remarks:data.remarks,
      value:data.value,
      prjcost:data.prjcost,
      assumptions:data.assumptions,
      nexStageGate:data.nexStageGate,
      visiblePopoverRecId: null,
      stageGates:data.stageGates,
    };
  }

  componentWillReceiveProps(next) {
    const { data } = next;
    this.setState({
      spinning: false,
      title: data.title,
      funnel: data.funnel,
      projectname: data.projectname,
      description: data.description,
      horizon: data.horizon,
      theme: data.theme,
      status: data.status,
      FunnelPhase: data.FunnelPhase,
      coach: data.coach,
      leader: data.leader,
      sponsor: data.sponsor,
      task_id: data.task_id,
      createDate: data.createDate,
      spnsr: data.spnsr,
      remarks:data.remarks,
      value:data.value,
      prjcost:data.prjcost,
      assumptions:data.assumptions,
      nexStageGate:data.nexStageGate,
      stageGates:data.stageGates
      
    });
  }


  saveChecklist = (r,row) => {
    const url = checklistsUrl+'/'+row.id;
    console.log(row);
    console.log(r);
    fetch(url, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'X-DreamFactory-API-Key': apptoken,
        'X-DreamFactory-Session-Token': this.props.sestoken,
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: row.title,
        status: row.status,
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
    const newData = [...this.state.assumptions];
    const index = newData.findIndex(item => r.id === item.id);
    const item = newData[index];
    let chkl = item.experiments;
    const listitem = chkl.findIndex(litem => row.id === litem.id);
    const lit = chkl[listitem];
    lit.title= row.title;
    lit.status=row.status;
    this.setState({assumptions:newData});
      })
      .catch(taskData => console.log(taskData));
  };
  deleteChecklist = (r,checklist) => {
      this.setState({ spinning: true });
      const taskid = this.state.task_id;
      const url4 = checklistsUrl+'/'+checklist;

      fetch(url4, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'X-DreamFactory-API-Key': apptoken,
          'X-DreamFactory-Session-Token': this.props.sestoken,
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
 
        const newData = [...this.state.assumptions];
        const index = newData.findIndex(item => r.id === item.id);
        let item = newData[index];
        let chkl = item.experiments;
        console.log(chkl);
        const mak = chkl.filter(item1 => item1.id !== checklist);
        console.log(chkl);
        item.experiments=mak;
  
  
        this.setState({assumptions:newData});

        })
        .catch(taskData => console.log(taskData));
  };
  addNewCheckList = (r) => {
     fetch(checklistsUrl, {
       method: 'POST',
       headers: {
         Accept: 'application/json',
         'X-DreamFactory-API-Key': apptoken,
         'X-DreamFactory-Session-Token': this.props.sestoken,
         'Cache-Control': 'no-cache',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         resource: [
          {
            title: "New Experiment",
            assumptionid: r.id,
            status:"Backlog",
          },
         ],
       }),
     })
       .then(response => {
         if (!response.ok) {
           throw Error(response.statusText);
         }
         return response;
       })
       .then(response => response.json())
       .then(assumptionData => {

      const newData = [...this.state.assumptions];
      const index = newData.findIndex(item => r.id === item.id);
      let item = newData[index];
      let chkl = item.experiments;

      const newCheckList =     {
        title: "New Experiment",
        id:assumptionData.resource[0].id,
         assumptionid: r.id,
         status:"Backlog",
        };
      if(chkl) {
          chkl.push(newCheckList);
      }
      if(!chkl){
        console.log(item);
      item.experiments=[];
        item.experiments.push(newCheckList);

      }
      this.setState({assumptions:newData});
       })
       .catch(taskData => console.log(taskData));
  };
  deleteAssumption = (r) => {
    this.setState({ spinning: true });
    const url4 = assumptionsUrl+'/'+r.id;
    const checklistsU = checklistsUrl +"?filter=assumptionid="+r.id;


    fetch(url4, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'X-DreamFactory-API-Key': apptoken,
        'X-DreamFactory-Session-Token': this.props.sestoken,
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
      const newData = [...this.state.assumptions];
      this.setState({assumptions:newData.filter(item => item.id !== r.id)});


      fetch(checklistsU, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'X-DreamFactory-API-Key': apptoken,
          'X-DreamFactory-Session-Token': this.props.sestoken,
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
        })
        .catch(taskData => console.log(taskData));


      })
      .catch(taskData => console.log(taskData));
};
  addNewAssumption = values => {
    // this.setState({ spinning: true });
    const { assumptions } = this.state;
     fetch(assumptionsUrl, {
       method: 'POST',
       headers: {
         Accept: 'application/json',
         'X-DreamFactory-API-Key': apptoken,
         'X-DreamFactory-Session-Token': this.props.sestoken,
         'Cache-Control': 'no-cache',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         resource: [
          {
            title: "New Assumption",
            meta: "empty",
            task_id: this.state.task_id,
            category: "Choose",
            status:"Processing",
          },
         ],
       }),
     })
       .then(response => {
         if (!response.ok) {
           throw Error(response.statusText);
         }
         return response;
       })
       .then(response => response.json())
       .then(assumptionData => {
       //  this.props.onOK();
         this.setState({ spinning: false });
         console.log(assumptionData);
        
         const newRemark = {
          id:assumptionData.resource[0].id,
          title: "New Assumption",
          meta: "empty",
          task_id: this.state.task_id,
          category: "Choose",
          status:"Processing",
        };
  
        this.setState({
          assumptions: [...assumptions, newRemark],
        });
       })
       .catch(taskData => console.log(taskData));
  };
  saveAssumption = (r,result,status) => {
    const url = assumptionsUrl+'/'+r.id;
    console.log(result);
    console.log(status);
    fetch(url, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'X-DreamFactory-API-Key': apptoken,
        'X-DreamFactory-Session-Token': this.props.sestoken,
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: r.title,
        category: r.category,
        result:result ? result : r.result,
        status: status ? status : r.status,
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
          const newData = [...this.state.assumptions];
    const index = newData.findIndex(item => r.id === item.id);
    const item = newData[index];
    item.result=result ? result : r.result;
    item.status=status ? status : r.status;
    item.category=r.category;
    item.title=r.title;

    newData.splice(index, 1, {
      ...item,
      ...item,
    });
    this.setState({assumptions:newData});
      })
      .catch(taskData => console.log(taskData));
  };
  addNewRemark = values => {
    // this.setState({ spinning: true });
    const { remarks } = this.state;
     fetch(remarksUrl, {
       method: 'POST',
       headers: {
         Accept: 'application/json',
         'X-DreamFactory-API-Key': apptoken,
         'X-DreamFactory-Session-Token': this.props.sestoken,
         'Cache-Control': 'no-cache',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         resource: [
          {
            description: "New Remarka",
            funnelPhase: this.state.FunnelPhase,
            card_id: this.state.task_id,
            remarker: this.props.user.first_name,
          },
         ],
       }),
     })
       .then(response => {
         if (!response.ok) {
           throw Error(response.statusText);
         }
         return response;
       })
       .then(response => response.json())
       .then(remarkData => {
       //  this.props.onOK();
         this.setState({ spinning: false });
         console.log(remarkData);
         const newRemark = {
          id:remarkData.resource[0].id,
          description: "New Remar",
          card_id: this.state.task_id,
          remarker: this.props.user.first_name,
        };
  
        this.setState({
          remarks: [...remarks, newRemark],
        });
       })
       .catch(taskData => console.log(taskData));
  };


  addNewMeeting = (type) => {
    // this.setState({ spinning: true });
    const { stageGates } = this.state;
     fetch(stageGatesUrl, {
       method: 'POST',
       headers: {
         Accept: 'application/json',
         'X-DreamFactory-API-Key': apptoken,
         'X-DreamFactory-Session-Token': this.props.sestoken,
         'Cache-Control': 'no-cache',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         resource: [
          {
            title: "New Remarka",
            funnelPhase: this.state.FunnelPhase,
            cardid: this.state.task_id,
            editor: this.props.user.first_name,
            type: type,
            stage:0,
          },
         ],
       }),
     })
       .then(response => {
         if (!response.ok) {
           throw Error(response.statusText);
         }
         return response;
       })
       .then(response => response.json())
       .then(remarkData => {
       //  this.props.onOK();
         this.setState({ spinning: false });
         console.log(remarkData);
         const newRemark = {
          id:remarkData.resource[0].id,
          title: "New Remarka",
            funnelPhase: this.state.FunnelPhase,
            cardid: this.state.task_id,
            editor: this.props.user.first_name,
            type: type,
            stage:0,
        };
  
        this.setState({
          stageGates: [...stageGates, newRemark],
        });
       })
       .catch(taskData => console.log(taskData));
  };
  saveRemark = (e, remark) => {
    const newData = [...this.state.remarks];
    const index = newData.findIndex(item => remark.id === item.id);
    let item = newData[index];
    item.description= e.target.value;
    newData.splice(index, 1, {
      ...item,
      ...item,
    });
    this.setState({remarks:newData});
    const id = remark.id
    const url4 = remarksUrl+'/'+id;
    fetch(url4, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'X-DreamFactory-API-Key': apptoken,
        'X-DreamFactory-Session-Token': this.props.sestoken,
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: e.target.value,
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

      })
      .catch(taskData => console.log(taskData));
  };
  deleteRemark = (e, remark) => {
    const id = remark.id;
      this.setState({ spinning: true });
      const taskid = this.state.task_id;
      const url4 = remarksUrl+'/'+id;
   
      fetch(url4, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'X-DreamFactory-API-Key': apptoken,
          'X-DreamFactory-Session-Token': this.props.sestoken,
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
      const dataSource = [...this.state.remarks];
      this.setState({remarks: dataSource.filter(item => item.id !== id) });
        })
        .catch(taskData => console.log(taskData));
  };
  onUpdate = () => {
    this.setState({ spinning: true });
    const taskid = this.props.data.task_id;
    const url4 = tasksUrl+'/'+taskid;

    fetch(url4, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'X-DreamFactory-API-Key': apptoken,
        'X-DreamFactory-Session-Token': this.props.sestoken,
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: this.state.description,
        asssignedUser: '1',
        projectname: this.state.projectname,
        horizon: this.state.horizon,
        theme: this.state.theme,
        status: this.state.status,
        FunnelPhase: this.state.FunnelPhase,
        title: this.state.taskname,
        funnel: this.state.funnel,
        coach: this.state.coach,
        leader: this.state.leader,
        sponsor: this.state.sponsor,
        spnsr: this.state.spnsr,
        value:this.state.value,
        prjcost:this.state.prjcost,
        nexStageGate:this.state.nexStageGate,
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
        this.props.onCancel();
        this.setState({ spinning: false });
        this.props.onOK();
      })
      .catch(taskData => console.log(taskData));
  };
  onDelete = () => {
    this.setState({ spinning: true });
    const taskid = this.state.task_id;
    const url4 = tasksUrl+'/'+taskid;

    fetch(url4, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'X-DreamFactory-API-Key': apptoken,
        'X-DreamFactory-Session-Token': this.props.sestoken,
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
        this.props.onCancel();
        this.setState({ spinning: false });
        this.props.onOK();
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
  };
  fixheader = data => (
    <Row>
      <Col>{data.title}</Col>
      <Col>
        <div
          style={{
            minHeigh: 50,
            maxWidth: 115,
            fontWeight: 'bolder',
            color: data.status === 'yellow' ? 'black' : 'white',
            backgroundColor: data.status,
          }}
        >
          {this.fixStatus(data.status)}
        </div>
      </Col>
    </Row>
  );

  render() {
    const { visible, onOK, onCancel, user} = this.props;
    const data = this.state;

    return (
      <Modal
        title="Update funnel Card"
        centered
        visible={visible}

        onOk={onOK}
        onCancel={onOK}
        footer={null}
        style={{minWidth:'70%'}}
      >
       <div className="card-container">
    <Tabs type="card">
      <TabPane tab="Overview" key="1">
      <div>
                <Row>
                  <Col span={12}>
                    <p>Department : {data.funnel} </p>
                    <p>Theme : {data.theme} </p>
                    <p>Horizon : {data.horizon} </p>
                    <p>Project Name : {data.projectname} </p>
                    <p>Project Cost : {data.prjcost} </p>
                    <p>Value : {data.value} </p>
                    <p>Description :</p>
                    <p style={{ maxWidth: 220 }}> {data.description} </p>
                  </Col>
                  <Col span={12}>
                    <p>Coach : {data.coach} </p>
                    <p>P.Owner : {data.leader} </p>
                    <p>Sponsor : {data.spnsr} </p>
                    <p>Team Members : {data.sponsor} </p>
                    <p>NextStageGate :{data.nexStageGate}</p>
                    <p>Created Date : {data.createDate} </p>
                    <p>Added :{moment(data.createDate).fromNow()}</p>
                    <p>Updated :{moment(data.updateDate).fromNow()}</p>
        
                  </Col>
                </Row>
          
              </div>
      </TabPane>
      <TabPane tab="Update" key="2">
      <Form>
<Form.Row>
<Form.Group style={{flexWrap:"nowrap", marginLeft:10}} as={Col} controlId="ControlFunnel">
<Form.Label style={{ marginTop: 9 }}> NextStageGate</Form.Label> 
                             <br/>
                         <DatePicker 
    value={moment(this.state.nexStageGate, dateFormat)}
    format={dateFormat}
    onChange={(date, dateString) => this.setState({nexStageGate: moment(date).format()})} />
<br/>
    <Form.Label style={{ marginTop: 5 }}>Department</Form.Label>
    <Form.Control
      value={this.state.funnel}
      onChange={e =>
        this.setState({ funnel: e.target.value })
      }
      as="select"
    >
                      <option value="OIH">OIH</option>
                      <option value="CM">CM</option>
                      <option value="BM">BM</option>
                      <option value="WS">WS</option>
                      <option value="OPS">OPS</option>
    </Form.Control>
    <Form.Label style={{ marginTop: 5 }}>Theme</Form.Label>



  <Form.Control
  value={this.state.theme}
  onChange={e => this.setState({ theme: e.target.value })}
  as="select"
>

  <option value="NextGenInfra">Next-Gen Infra</option>
  <option value="DataTech">Data Tech</option>
  <option value="Techco">TechCo</option>
  <option value="Other">Other</option>
</Form.Control>

    <Form.Label style={{ marginTop: 5 }}>Description</Form.Label>
    <Form.Control
      value={this.state.description}
      onChange={e =>
        this.setState({ description: e.target.value })
      }
      as="textarea"
      rows="5"
    />
    </Form.Group>

<Form.Group style={{flexWrap:"nowrap", marginLeft:10}} as={Col} controlId="ControlFunnel2"
    style={{ marginLeft: 10 }}
    as={Col}
    controlId="Title"
  >

    <Form.Label style={{ marginTop: 5 }}>Project</Form.Label>
    <Form.Control
    value={this.state.projectname}
    onChange={e => this.setState({ projectname: e.target.value })}
    type="text"
    placeholder="project name"
  />


    <Form.Label style={{ marginTop: 5 }}>Status</Form.Label>
    <Form.Control
      value={this.state.status}
      onChange={e => this.setState({ status: e.target.value })}
      as="select"
    >
      <option value="green">PROGRESSING</option>
      <option value="yellow">IMPEDIMENT</option>
      <option value="red">STOPPED </option>
      <option value="orange">PARKED</option>
    </Form.Control>

  <Form.Label style={{ marginTop: 5 }}>Title</Form.Label>
  <Form.Control
    value={this.state.title}
    onChange={e => this.setState({ title: e.target.value })}
    type="text"
    placeholder="Card Title"
  />
        

    <Form.Label style={{ marginTop: 5 }}>Product Owner</Form.Label>
    <Form.Control
      value={this.state.leader}
      onChange={e => this.setState({ leader: e.target.value })}
      type="text"
      placeholder="Card Title"
    />

    <Form.Label style={{ marginTop: 5 }}>Coach</Form.Label>
    <Form.Control
      value={this.state.coach}
      onChange={e => this.setState({ coach: e.target.value })}
      as="select"
    >
      <option>Kevin</option>
      <option>Mike</option>
      <option>Mark </option>
      <option>Amber</option>
    </Form.Control>

  </Form.Group>
<Form.Group style={{flexWrap:"nowrap", marginLeft:10}}  as={Col} controlId="ControlFunnel3">
  <Form.Label style={{ marginTop: 5 }}>Value</Form.Label>
  <Form.Control
    value={this.state.value}
    onChange={e => this.setState({ value: e.target.value })}
    type="text"
    placeholder="Value"
  />


  <Form.Label style={{ marginTop: 5 }}>Project Cost</Form.Label>
  <Form.Control
    value={this.state.prjcost}
    onChange={e => this.setState({ prjcost: e.target.value })}
    type="number"
    placeholder="Project Cost"
  />

  <Form.Label style={{ marginTop: 5 }}>Team Members</Form.Label>
  <Form.Control
    value={this.state.sponsor}
    onChange={e => this.setState({ sponsor: e.target.value })}
    as="select"
  >
    <option>1</option>
    <option>2</option>
    <option>3 </option>
    <option>4</option>
  </Form.Control>
  <Form.Label style={{ marginTop: 5 }}>Sponsor</Form.Label>
    <Form.Control
      value={this.state.spnsr}
      onChange={e => this.setState({ spnsr: e.target.value })}
      type="text"
      placeholder="Sponsor"
    />

  <Form.Label style={{ marginTop: 5 }}>Horizon</Form.Label>
    <Form.Control
      value={this.state.horizon}
      onChange={e => this.setState({ horizon: e.target.value })}
      as="select"
    >
      <option>H1</option>
      <option>H2</option>
      <option>H3</option>
    </Form.Control>

</Form.Group>
</Form.Row>
<Button onClick={this.onUpdate} variant="primary" type="submit">
  Submit
</Button>
<Button onClick={onCancel} variant="primary" type="submit">
  Cancel
</Button>
<Button style={{marginLeft:100}} onClick={this.onDelete} variant="danger" type="submit">
  Delete
</Button>
</Form>
      </TabPane>
      <TabPane tab="Assumptions" key="3">
      <Button onClick={this.addNewAssumption} type="primary" style={{ marginBottom: 16 }}>
      Create New
    </Button>
      <EditableTable 
      saveAssumption={this.saveAssumption} 
      saveChecklist={this.saveChecklist} 
      deleteChecklist={this.deleteChecklist}
      deleteAssumption={this.deleteAssumption}
      assumptions={this.state.assumptions}
      addChecklist={this.addNewCheckList}
      />
      </TabPane>
            <TabPane tab="Remarks" key="4">
            <Button onClick={this.addNewRemark} type="primary" style={{  marginBottom: 16 }}>Create New
      </Button>
        <Remarks onOK={this.props.onOK} deleteRemark={this.deleteRemark} coach={data.coach} user={user} saveRemark={this.saveRemark} remarks={this.state.remarks} />
      </TabPane>


      <TabPane tab="Meetings" key="5">
      <Button 
      onClick={this.addNewMeeting("StageGate")} 
      type="primary" 
      style={{  marginBottom: 16 }}>
      Create SG/
      </Button>
      <Button onClick={this.addNewRemark} type="primary" style={{  marginBottom: 16 }}>Funding Momment
</Button>
  <StageGates onOK={this.props.onOK} deleteRemark={this.deleteRemark} coach={data.coach} user={user} saveRemark={this.saveRemark} remarks={this.state.stageGates} />
</TabPane>


      
    </Tabs>
  </div>
      </Modal>
    );
  }
}

export default ModalEditTask;
