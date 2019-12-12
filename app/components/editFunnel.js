import React from 'react';
import {
  Select,
  Input,
  Icon,
  Modal,
  Button,
  Spin,
  Collapse,
  Row,
  Col,
} from 'antd';
import styled, { css } from 'styled-components';
import moment from 'moment';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { backend } from '../utils/config';

const { Panel } = Collapse;

const apptoken = backend.apptoken;
const tasksUrl = backend.beUrl + backend.tasks;

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
      
    });
  }

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
        remarks:this.state.remarks,
        value:this.state.value,
        prjcost:this.state.prjcost,
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
    const { visible, onOK, onCancel } = this.props;
    console.log(this.props.data);
    const data = this.state;

    return (
      <Modal
        title="Update funnel Card"
        centered
        visible={visible}
        onOk={onOK}
        onCancel={onCancel}
        footer={null}
        style={{minWidth:750}}

      >
        <Spin spinning={this.state.spinning} tip="Updating...">
          <Collapse defaultActiveKey={['1']}>
            <Panel header={this.fixheader(data)} key="1">
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
                    <p>Open remarks : {data.remarks} </p>
                    <p>Team Members : {data.sponsor} </p>
                    <p>Created Date : {data.createDate} </p>
                    <p>Added :{moment(data.createDate).fromNow()}</p>
                    <p>Updated :{moment(data.updateDate).fromNow()}</p>
        
                  </Col>
                </Row>
              </div>
            </Panel>
            <Panel header="Update" key="2">
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
                      <option>PLATFORM</option>
                      <option>ECOSYSTEM</option>
                      <option>OTHER</option>
                    </Form.Control>

                    <Form.Label style={{ marginTop: 5 }}>Theme</Form.Label>
     
                    <Form.Control
                    value={this.state.theme}
                    onChange={e => this.setState({ theme: e.target.value })}
                    type="text"
                    placeholder="Theme"
                  />

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

                    <Form.Label style={{ marginTop: 5 }}>FunnelPhase</Form.Label>
                    <Form.Control
                      value={this.state.FunnelPhase}
                      onChange={e =>
                        this.setState({ FunnelPhase: e.target.value })
                      }
                      as="select"
                    >
                      <option value="initiate">INITIATE</option>
                      <option value="scope">SCOPE</option>
                      <option value="problem">PROBLEM</option>
                      <option value="solution">SOLUTIONS</option>
                      <option value="bussiness">BUSSINESS</option>
                      <option value="feasibility">FEASIBILITY</option>
                      <option value="mvp">MVP</option>
                      <option value="softlaunch">SOFTLAUNCH</option>
                      <option value="scalelaunch">SCALELAUNCH</option>
                    </Form.Control>

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

                <Form.Group style={{flexWrap:"nowrap", marginLeft:10}} as={Col} controlId="ControlFunnel2"
                    style={{ marginLeft: 10 }}
                    as={Col}
                    controlId="Title"
                  >

                  <Form.Label style={{ marginTop: 5 }}>Title</Form.Label>
                  <Form.Control
                    value={this.state.title}
                    onChange={e => this.setState({ title: e.target.value })}
                    type="text"
                    placeholder="Card Title"
                  />
                    <Form.Label style={{ marginTop: 5 }}>Description</Form.Label>
                    <Form.Control
                      value={this.state.description}
                      onChange={e =>
                        this.setState({ description: e.target.value })
                      }
                      as="textarea"
                      rows="4"
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

                    <Form.Label style={{ marginTop: 5 }}>Sponsor</Form.Label>
                    <Form.Control
                      value={this.state.spnsr}
                      onChange={e => this.setState({ spnsr: e.target.value })}
                      type="text"
                      placeholder="Sponsor"
                    />

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

                  <Form.Label style={{ marginTop: 5 }}>Open remarks</Form.Label>
                  <Form.Control
                    value={this.state.remarks}
                    onChange={e =>
                      this.setState({ remarks: e.target.value })
                    }
                    as="textarea"
                    rows="7"
                  />
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
            </Panel>
          </Collapse>
        </Spin>
      </Modal>
    );
  }
}

export default ModalEditTask;
