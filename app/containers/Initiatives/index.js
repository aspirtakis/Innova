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
import nlNL from 'antd/es/locale/nl_NL';

import { FaCheck } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa';

const { TabPane } = Tabs;
import moment from 'moment';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { backend } from '../../utils/config';
import Remarks from '../../components/remarks';
import ReactQuill from 'react-quill'; // ES6
import EditableTable from '../../components/editableTable';
import StageGates from '../../components/stagegates';
import { size } from 'lodash';


import { Tab, TabItem, TabLink, TabMenu } from '@kpn-style/react';
//import { boolean, withKnobs } from "@storybook/addon-knobs";

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Panel } = Collapse;
const apptoken = backend.apptoken;
const tasksUrl = backend.beUrl + backend.tasks;
const remarksUrl = backend.beUrl + backend.remarks;
const assumptionsUrl = backend.beUrl + backend.assumptions;
const checklistsUrl = backend.beUrl + backend.checklists;
const stageGatesUrl = backend.beUrl + backend.stageGates;
const dateFormat = 'DD/MM/YYYY HH:mm:ss';

// eslint-disable-next-line react/prefer-stateless-function
class Initiatives extends React.Component {
  constructor(props) {
    super(props);

  }
  componentWillMount(){
  //  this.props.sessionCheck();
    console.log(this.props);
const data = this.props.location.state.data;
const gates = data.stageGates;
this.setState({
  users:this.props.location.users,
  spinning: false,
  cardPO:data.cardpo,
  funnel: data.funnel,
  projectname: data.projectname,
  description: data.description,
  horizon: data.horizon,
  theme: data.theme,
  status: data.status,
  FunnelPhase: data.FunnelPhase,
  coach: data.coach,
  sponsor: data.sponsor,
  task_id: data.task_id,
  createDate: data.createDate,
  spnsr: data.spnsr,
  remarks:data.remarks ? data.remarks.slice().sort((a, b) => new Date(b.created) - new Date(a.created)) : data.remarks,
  value:data.value,
  value:data.value,
  prjcost:data.prjcost,
  assumptions:data.assumptions,
  nexStageGate:data.nexStageGate,
  stageGates: gates ? gates.slice().sort((a, b) => new Date(b.created) - new Date(a.created)) : gates ,
  
});

  }

  componentWillReceiveProps(next) {

    const  data  = next.location.state.data;
    console.log(next);

//const test1 = next.users && next.users.map(allusers => allusers.user_to_app_to_role_by_user_id);

const gates = data.stageGates;
    this.setState({
      users:next.users,
      spinning: false,
      cardPO:data.cardpo,
      funnel: data.funnel,
      projectname: data.projectname,
      description: data.description,
      horizon: data.horizon,
      theme: data.theme,
      status: data.status,
      FunnelPhase: data.FunnelPhase,
      coach: data.coach,
      sponsor: data.sponsor,
      task_id: data.task_id,
      createDate: data.createDate,
      spnsr: data.spnsr,
      remarks:data.remarks ? data.remarks.slice().sort((a, b) => new Date(b.created) - new Date(a.created)) : data.remarks,
      value:data.value,
      value:data.value,
      prjcost:data.prjcost,
      assumptions:data.assumptions,
      nexStageGate:data.nexStageGate,
      stageGates: gates ? gates.slice().sort((a, b) => new Date(b.created) - new Date(a.created)) : gates ,
      
    });
  }

  saveChecklist = (r,row) => {
    //this.props.sessionCheck();
    const url = checklistsUrl+'/'+row.id;
    //console.log(row);
    //console.log(r);
    fetch(url, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'X-DreamFactory-API-Key': apptoken,
        'X-DreamFactory-Session-Token': this.props.location.state.sestoken,
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
    //this.props.sessionCheck();
      this.setState({ spinning: true });
      const taskid = this.state.task_id;
      const url4 = checklistsUrl+'/'+checklist;

      fetch(url4, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'X-DreamFactory-API-Key': apptoken,
          'X-DreamFactory-Session-Token': this.props.location.state.sestoken,
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
        const mak = chkl.filter(item1 => item1.id !== checklist);
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
         'X-DreamFactory-Session-Token': this.props.location.state.sestoken,
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
        //console.log(item);
      item.experiments=[];
        item.experiments.push(newCheckList);

      }
      this.setState({assumptions:newData});
       })
       .catch(taskData => console.log(taskData));
  };
  deleteAssumption = (r) => {
   // this.props.sessionCheck();
    this.setState({ spinning: true });
    const url4 = assumptionsUrl+'/'+r.id;
    const checklistsU = checklistsUrl +"?filter=assumptionid="+r.id;


    fetch(url4, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'X-DreamFactory-API-Key': apptoken,
        'X-DreamFactory-Session-Token': this.props.location.state.sestoken,
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
          'X-DreamFactory-Session-Token': this.props.location.state.sestoken,
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
   // this.props.sessionCheck();
    // this.setState({ spinning: true });
    const { assumptions } = this.state;
     fetch(assumptionsUrl, {
       method: 'POST',
       headers: {
         Accept: 'application/json',
         'X-DreamFactory-API-Key': apptoken,
         'X-DreamFactory-Session-Token': this.props.location.state.sestoken,
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
         //console.log(assumptionData);
        
         const newRemark = {
          id:assumptionData.resource[0].id,
          title: "New Assumption",
          meta: "empty",
          task_id: this.state.task_id,
          category: "Choose",
          status:"Processing",
          phase: this.state.FunnelPhase,
        };
  
        this.setState({
          assumptions: [...assumptions, newRemark],
        });
       })
       .catch(taskData => console.log(taskData));
  };
  saveAssumption = (r,result,status) => {
    //this.props.sessionCheck();
    const url = assumptionsUrl+'/'+r.id;
    console.log(result);
    console.log(status);
    console.log(r);
    fetch(url, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'X-DreamFactory-API-Key': apptoken,
        'X-DreamFactory-Session-Token': this.props.location.state.sestoken,
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
      
      body: JSON.stringify({
        title: r.title,
        category: r.category,
        result:result ? result : r.result,
        status: status ? status : r.status,
        phase: this.state.FunnelPhase,
     
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
  addNewRemark = type => {
  // this.props.sessionCheck();
    // this.setState({ spinning: true });
   const { remarks } = this.state;
     fetch(remarksUrl, {
       method: 'POST',
       headers: {
         Accept: 'application/json',
         'X-DreamFactory-API-Key': apptoken,
         'X-DreamFactory-Session-Token': this.props.location.state.sestoken,
         'Cache-Control': 'no-cache',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         resource: [
          {
            description: "New Remark",
            funnelPhase: this.state.FunnelPhase,
            card_id: this.state.task_id,
            remarker: this.props.location.state.user.first_name,
            type:type,
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
         //console.log(remarkData);
         const newRemark = {
          id:remarkData.resource[0].id,
          description: "New Remark",
          card_id: this.state.task_id,
          remarker: this.props.location.state.user.first_name,
          type:type,
        };
        
        this.setState({
          remarks: [newRemark, ...remarks ],
        });
       })
       .catch(taskData => console.log(taskData));
  };
  addNewMeeting = (type) => {
   // this.props.sessionCheck();
    // this.setState({ spinning: true });
    const { stageGates } = this.state;
     fetch(stageGatesUrl, {
       method: 'POST',
       headers: {
         Accept: 'application/json',
         'X-DreamFactory-API-Key': apptoken,
         'X-DreamFactory-Session-Token': this.props.location.state.sestoken,
         'Cache-Control': 'no-cache',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         resource: [
          {
            title: "New Meeting",
            cardid: this.state.task_id,
            editor: this.props.location.state.user.first_name,
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
         //console.log(remarkData);
         const newRemark = {
          id:remarkData.resource[0].id,
          title: "New Meeting",
          cardid: this.state.task_id,
          editor: this.props.location.state.user.first_name,
          type: type,
          stage:0,
        };
  
        this.setState({
          stageGates: [newRemark,...stageGates],
        });
       })
       .catch(taskData => console.log(taskData));
  };
  deleteMeeting = (meeting) => {
  //  this.props.sessionCheck();
    const id = meeting.id;
      this.setState({ spinning: true });
      const url4 = stageGatesUrl+'/'+id;
   
      fetch(url4, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'X-DreamFactory-API-Key': apptoken,
          'X-DreamFactory-Session-Token': this.props.location.state.sestoken,
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
      const dataSource = [...this.state.stageGates];
      this.setState({stageGates: dataSource.filter(item => item.id !== id) });
        })
        .catch(taskData => this.props.sessionCheck());
  };
  saveMeeting = (e, remark) => {
    const newData = [...this.state.stageGates];
    const index = newData.findIndex(item => remark.id === item.id);
    let item = newData[index];
    item.title= e;
    newData.splice(index, 1, {
      ...item,
      ...item,
    });
    this.setState({stageGates:newData});
    const id = remark.id
    const url4 = stageGatesUrl +'/'+id;
    fetch(url4, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'X-DreamFactory-API-Key': apptoken,
        'X-DreamFactory-Session-Token': this.props.location.state.sestoken,
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: e,
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
  saveRemark = (e, remark) => {
    const newData = [...this.state.remarks];
    const index = newData.findIndex(item => remark.id === item.id);
    let item = newData[index];
    item.description= e;
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
        'X-DreamFactory-Session-Token': this.props.location.state.sestoken,
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: e,
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
          'X-DreamFactory-Session-Token': this.props.location.state.sestoken,
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
  onSTGUpdate = (newDate) => {
    this.setState({ spinning: true });
    const taskid = this.props.location.state.data.task_id;
    const url4 = tasksUrl+'/'+taskid;

    fetch(url4, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'X-DreamFactory-API-Key': apptoken,
        'X-DreamFactory-Session-Token': this.props.location.state.sestoken,
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        nexStageGate:newDate,
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
      //  this.props.onCancel();
        this.setState({ spinning: false });
      })
      .catch(taskData => console.log(taskData));
  };
  onUpdate = () => {
    this.setState({ spinning: true });
    const taskid = this.props.location.state.data.task_id;
    const url4 = tasksUrl+'/'+taskid;

    fetch(url4, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'X-DreamFactory-API-Key': apptoken,
        'X-DreamFactory-Session-Token': this.props.location.state.sestoken,
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
        sponsor: this.state.sponsor,
        spnsr: this.state.spnsr,
        value:this.state.value,
        prjcost:this.state.prjcost,
        cardpo:this.state.cardPO,
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
        'X-DreamFactory-Session-Token': this.props.location.state.sestoken,
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
    const { visible, onOK, onCancel, user} = this.props.location.state;

    const  data  = this.state;
    const titles =  this.state.cardPO === this.props.location.state.user.first_name + " " + this.props.location.state.user.last_name ? data.projectname + "overview - You are PO of this project" : data.projectname + " overview";
    const rema =this.state.remarks;

 const TeamRemarks = rema && rema.filter(city => city.type === "User");
 const CoachRemarks = rema && rema.filter(city => (city.type == null || city.type === "Coach"));

//  const remUser = remarks.filter(mak => mak.type === "User");

    return (
      <div className="row">
      <div className="col col--4">
        <Tab>
          <TabMenu>
            <TabItem>
              <TabLink active>
                Home
              </TabLink>
            </TabItem>
            <TabItem>
              <TabLink>
                Services
              </TabLink>
            </TabItem>
          </TabMenu>
        </Tab>
      </div>
    </div>
    );
  }
}

export default Initiatives;
