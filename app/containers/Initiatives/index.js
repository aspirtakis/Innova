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
import './initiativesStyles.css';
import Agenda  from  '../../components/Agenda';
import AddNewMeeting from '../../components/Agenda/addnewMeeting';
import UpdateMeeting from '../../components/Agenda/updateMeeting';
import Canvas from '../../components/canvas';

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

    this.state = {
      hasSelectedcard: false,
    };

  }

  UNSAFE_componentWillMount(){
const data = this.props.location.state ? this.props.location.state.data :null ;
if(!data){
  this.setState({
      hasSelectedcard: false,
  });
}
if(data){
  const gates = data.stageGates;
  this.setState({
    hasSelectedcard: true,
    users:this.props.location.state.users,
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
    meetingAddPanel: false, 
    meetingEditPanel: false,
    meetingEditData: null,
  });
}
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
      .catch(taskData => this.props.sessionCheck());
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
        .catch(taskData => this.props.sessionCheck());
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
       .catch(taskData => this.props.sessionCheck());
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
      .catch(taskData => this.props.sessionCheck());
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
       .catch(taskData => this.props.sessionCheck());
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
      .catch(taskData => this.props.sessionCheck());
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
       .catch(taskData => this.props.sessionCheck());
  };
  addNewMeeting = () =>{
    console.log("clickadd");
    this.setState({meetingAddPanel: true});
  };
  editOldMeeting = (data) =>{
    console.log("clickedit");
    this.setState({meetingEditData: data});
    this.setState({meetingEditPanel: true});
  };
  saveNewMeeting = (formData) => {
   // this.props.sessionCheck();
    // this.setState({ spinning: true });
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
            type: formData.meetingType,
            cardid: this.state.task_id,
            editor: this.props.location.state.user.first_name,
            stage:this.state.FunnelPhase,
            funding_request: formData.fundingRequest,
            title: formData.meetingName,
            meetingDate: formData.meetingDate,
            feedback: formData.meetingFeedback,
            goal: formData.meetingGoal,
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
          type: formData.meetingType,
          title: formData.meetingName,
          cardid: this.state.task_id,
          editor: this.props.location.state.user.first_name,
          stage:this.state.FunnelPhase,
          funding_request: formData.fundingRequest,
          goal: formData.meetingGoal,
          meetingDate: formData.meetingDate,
          feedback: formData.meetingFeedback,
        };
        
        const { stageGates } = this.state;

        this.setState({
          stageGates: [newRemark,...stageGates],
        });
       })
       .catch(taskData => this.props.sessionCheck());
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
  saveMeeting = (formData) => {


    const newData = [...this.state.stageGates];
    const index = newData.findIndex(item => formData.id === formData.id);
    let item = newData[index];

    this.setState({stageGates:newData});
    
    const id = formData.id
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
      body: JSON.stringify(          {
        type: formData.meetingType,
        editor: this.props.location.state.user.first_name,
        stage:0,
        funding_request: formData.fundingRequest,
        title: formData.meetingName,
        meetingDate: formData.meetingDate,
        feedback: formData.meetingFeedback,
        goal: formData.meetingGoal,
      },),
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(taskData => 
        
        {
          const index = newData.findIndex(item => formData.id === item.id);
          let item = newData[index];
          item.type= formData.meetingType;
          item.editor= this.props.location.state.user.first_name;
          item.funding_request=formData.fundingRequest;
          item.title= formData.meetingName;
          item.meetingDate= formData.meetingDate;
          item.feedback= formData.meetingFeedback;
          item.goal= formData.meetingGoal;

          newData.splice(index, 1, {
            ...item,
            ...item,
          });
      }
        
)
      .catch(taskData => this.props.sessionCheck());
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
      .catch(taskData => this.props.sessionCheck());
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
        .catch(taskData => this.props.sessionCheck());
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

        this.setState({ spinning: false });
      })
      .catch(taskData => this.props.sessionCheck());
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
      //  this.props.onCancel();
        this.setState({ spinning: false });
        this.props.onOK();
      })
      .catch(taskData => this.props.sessionCheck());
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
      //  this.props.onCancel();
        this.setState({ spinning: false });
        this.props.onOK();
      })
      .catch(taskData => this.props.sessionCheck());
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
  fixTitles = () =>
  {
    const titles =  this.state.cardPO === this.props.location.state.user.first_name + " " + this.props.location.state.user.last_name ? data.projectname + "overview - You are PO of this project" : data.projectname + " overview";

  };
  remarksType = (type) =>
  {
  const TeamRemarks = this.state.remarks && this.state.remarks.filter(city => city.type === "User");
  const CoachRemarks = this.state.remarks && this.state.remarks.filter(city => (city.type == null || city.type === "Coach"));
  if(type === "coach"){
    return CoachRemarks;
  }
  if(type === "team"){
    return TeamRemarks;
  }
  
  };
  render() {

    const  data = this.state;
    const {meetingAddPanel, meetingEditPanel, meetingEditData} = this.state;


    return (
      <div className="row">
      {this.state.hasSelectedcard ? 
        <div
      >
       <div className="mainContainer">
       <div className="titleContainer">
       <div className="titleInit">{this.state.projectname}</div>
       </div>
    <Tabs tabBarStyle={{borderBlockColor:"#009900", color:'green', fontFamily:"kpn-metric-bold",  }} className="mainTab">
      <TabPane  tab={<span className="titlesTab"> General</span>} key="1">
      <div>
                <Row>
                  <Col span={8}>
                  <p className="titleInit">Team Members </p>
                  <p className="titleGeneral" >Product Owner </p>
                  <p className="dataGeneral" > {data.cardPO} </p>

                  <p className="titleGeneral" >Coach </p>
                  <p className="dataGeneral" > {data.coach} </p>
       

                  <p className="titleGeneral" >Sponsor </p>
                  <p className="dataGeneral" > {data.spnsr} </p>

                  <p className="titleGeneral" >Growth Hacker  </p>
                  <p className="dataGeneral" > XXXXXX </p>

                  <p className="titleGeneral" >Data Expert  </p>
                  <p className="dataGeneral" > XXXXXX </p>
                  <p>Created Date : {data.createDate} </p>
                  <p>Added :{moment(data.createDate).fromNow()}</p>
                  <p>Updated :{moment(data.updateDate).fromNow()}</p>
                  <p>Updated :{moment(data.birthonproblem).fromNow()}</p>

  
                  </Col>
                  <Col span={6}>
                  <p className="titleInit">Project </p>

                  <p className="titleGeneral" >Department</p>
                  <p className="dataGeneral" > {data.funnel} </p>

                  <p className="titleGeneral" >Theme</p>
                  <p className="dataGeneral" > {data.theme} </p>

                  <p className="titleGeneral" >Horizon</p>
                  <p className="dataGeneral" > {data.horizon} </p>
              
                  <p className="titleGeneral" >Project Cost</p>
                  <p className="dataGeneral" > {data.prjcost} </p>

                  <p className="titleGeneral" >Value</p>
                  <p className="dataGeneral" > {data.value} </p>

                  <p className="titleGeneral" >Description</p>
                  <p className="dataDescription" > {data.description} </p>

                  <p className="titleGeneral" >Team Members</p>
                  <p className="dataGeneral" > {data.sponsor} </p>

                  <p className="titleGeneral" >Next StageGate</p>
                  <p className="dataGeneral" > {data.nextStageGate} </p>


                  </Col>
                </Row>
              </div>
      </TabPane>
     {(this.state.cardPO === this.props.location.state.user.first_name+" "+this.props.location.state.user.last_name || this.props.location.state.user.role === 'Coach') && 
      <TabPane   tab={<span className="titlesTab"> Update</span>} key="2">
      <Form>
<Form.Row>
<Form.Group style={{flexWrap:"nowrap", marginLeft:10}} as={Col} controlId="ControlFunnel">
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
    
    <Form.Label style={{ marginTop: 5 }}>CardPO</Form.Label>
    <Form.Control
      value={this.state.cardPO}
      onChange={e => this.setState({ cardPO: e.target.value })}
      as="select"
    >
{this.state.users && this.state.users.map(username =>  <option  key={username.id} value={username.first_name +" " + username.last_name}>{username.first_name +" "+ username.last_name}</option>)}
    </Form.Control>

    <Form.Label style={{ marginTop: 5 }}>Coach</Form.Label>
    <Form.Control
      value={this.state.coach}
      onChange={e => this.setState({ coach: e.target.value })}
      as="select"
    >
    {this.state.users && this.state.users.map(username =>  <option  key={username.id} value={username.first_name +" " + username.last_name}>{username.first_name +" "+ username.last_name}</option>)}
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

<Button style={{marginLeft:100}} onClick={this.onDelete} variant="danger" type="submit">
  Delete
</Button>
</Form>




      </TabPane>
}


{ this.props.location.state.user.role !== 'Tv' && 
<TabPane tab={<span className="titlesTab"> Assumptions </span>} key="3">

{ (this.state.cardPO === this.props.location.state.user.first_name + " " + this.props.location.state.user.last_name || this.props.location.state.user.role === 'Coach' || this.props.location.state.user.role === 'CardPO' || this.props.location.state.user.role === 'BO' ||  this.props.location.state.user.role === 'User' ) && 
      <Button onClick={this.addNewAssumption} type="primary" style={{ marginBottom: 16 }}>
      Create New
    </Button>}

      <EditableTable 

      saveAssumption={this.saveAssumption} 
      saveChecklist={this.saveChecklist} 
      deleteChecklist={this.deleteChecklist}
      deleteAssumption={this.deleteAssumption}
      assumptions={this.state.assumptions}
      addChecklist={this.addNewCheckList}
      role={this.props.location.state.user.role}

      />


      </TabPane>}

      { (this.props.location.state.user.role === 'Coach' || this.props.location.state.user.role === 'Manager' ) &&
            <TabPane tab={<span className="titlesTab"> Coach remarks</span>} key="4">

      { this.props.location.state.user.role === 'Coach'  && <Button onClick={() => this.addNewRemark("Coach")} type="primary" style={{  marginBottom: 16 }}>Create New
      </Button>}
        <Remarks style={{maxWidth:100}} onOK={this.props.onOK} deleteRemark={this.deleteRemark} coach={data.coach} user={this.props.location.state.user} saveRemark={this.saveRemark} remarks={  this.remarksType("coach")  }/>
      </TabPane>}

      {<TabPane tab={<span className="titlesTab"> Team remarks</span>} key="5">

{ <Button onClick={() => this.addNewRemark("User")} type="primary" style={{  marginBottom: 16 }}>Create New
</Button>}
  <Remarks onOK={this.props.onOK} deleteRemark={this.deleteRemark} coach={data.coach} user={this.props.location.state.user} saveRemark={this.saveRemark} remarks={  this.remarksType("team") } />
</TabPane>}
       
  <TabPane tab={<span className="titlesTab"> Agenda</span>} key="6">
     
{!meetingAddPanel && !meetingEditPanel ? <Agenda phase={this.state.FunnelPhase} AddNewMeeting={() => this.addNewMeeting()} AgendaData={this.state.stageGates} deleteMeetings={this.deleteMeeting} editMeeting={this.editOldMeeting} user={this.props.location.state.user} /> : 
<div>
  {meetingEditPanel && <UpdateMeeting editMeetingCancel={() => this.setState({meetingEditPanel:false})} meetingData={meetingEditData} onSaveMeeting={this.saveMeeting} />}
  {meetingAddPanel && <AddNewMeeting addMeetingCancel={() => this.setState({meetingAddPanel:false})} onSaveMeeting={this.saveNewMeeting} />}
</div>
  }
</TabPane>
<TabPane style={{fontSize:10 ,color:'white'}} tab={<span className="titlesTab"> Canvas</span>} key="7">
<Canvas
data={data}
assumptions={this.state.assumptions}
TeamRemarks={this.remarksType("team")} />

</TabPane>
    </Tabs>
  </div>
      </div>:<div>You have to Select a Card from funnel</div>
      }
    </div>
    );
  }
}

export default Initiatives;
