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

const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;

const apptoken =
  '36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Rect6 = styled.div`
  flex: 0.5 1 0%;
  display: flex;
  flex-direction: column;
`;

const Rect7 = styled.div`
  flex: 0.5 1 0%;
  display: flex;
  flex-direction: column;
`;

const formItemLayout = {};
// eslint-disable-next-line react/prefer-stateless-function
class ModalEditTask extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      spinning: false,
      title: data.title,
      funnel: data.funnelPhase,
      project: data.projectname,
      description: data.description,
      projectname: data.project,
      horizon: data.horizon,
      theme: data.theme,
      status: data.status,
      FunnelPhase: data.funnelPhase,
      coach: data.coach,
      leader: data.leader,
      sponsor: data.sponsor,
    };
  }

  componentWillReceiveProps(next) {
    const { data } = next;
    this.setState({
      spinning: false,
      title: data.title,
      funnel: data.funnelPhase,
      project: data.projectname,
      description: data.description,
      projectname: data.project,
      horizon: data.horizon,
      theme: data.theme,
      status: data.status,
      FunnelPhase: data.funnelPhase,
      coach: data.coach,
      leader: data.leader,
      sponsor: data.sponsor,
    });
    console.log(data);
  }

  onUpdate = values => {
    this.setState({ spinning: true });
    const taskid = this.props.data.task_id;
    const url4 = `https://aws.openinnovationhub.nl./api/v2/funnel/_table/funnel.tasks/${taskid}`;

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
        projectname: this.state.project,
        horizon: this.state.horizon,
        theme: this.state.theme,
        status: this.state.status,
        FunnelPhase: this.state.funnelPhase,
        title: this.state.taskname,
        funnel: this.state.funnel,
        coach: this.state.coach,
        leader: this.state.leader,
        sponsor: this.state.sponsor,
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

  onDelete = values => {
    this.setState({ spinning: true });
    const taskid = this.props.data.task_id;
    const url4 = `https://aws.openinnovationhub.nl./api/v2/funnel/_table/funnel.tasks/${taskid}`;

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

  render() {
    const { visible, onOK, onCancel, data } = this.props;
    console.log(data);

    return (
      <Modal
        title="Update funnel Card"
        centered
        visible={visible}
        onOk={onOK}
        onCancel={onCancel}
        footer={null}
        style={{ minWidth: 600 }}
      >
        <Spin spinning={this.state.spinning} tip="Updating...">
          <Collapse defaultActiveKey={['1']}>
            <Panel header="prev" key="1">
              <div>
                <Row>
                  <Col span={12}>
                    <div
                      style={{
                        minHeigh: 50,
                        maxWidth: 100,
                        fontWeight: 'bolder',
                        color: data.status === 'yellow' ? 'black' : 'white',
                        backgroundColor: data.status,
                        textAlign: 'center',
                      }}
                    >
                      {this.fixStatus(data.status)}
                    </div>
                    <h4>Funnel : {data.funnel} </h4>
                    <h4>Theme : {data.theme} </h4>

                    <h4>Description : {data.description} </h4>
                  </Col>
                  <Col span={12}>
                    <h4>Project : {data.projectname} </h4>
                    <h4>Horizon : {data.horizon} </h4>
                    <h4>Created Date : {data.createDate} </h4>
                    <h4>Days on Board :{moment(data.createDate).fromNow()}</h4>
                  </Col>
                </Row>
              </div>
            </Panel>
            <Panel header="Update" key="2">
              <Form>
                <Form.Row>
                  <Form.Group as={Col} controlId="ControlFunnel">
                    <Form.Label>Funnel Phase</Form.Label>
                    <Form.Control
                      value={this.state.FunnelPhase}
                      onChange={e =>
                        this.setState({ FunnelPhase: e.target.value })
                      }
                      as="select"
                    >
                      <option>PLATFORM</option>
                      <option>ECOSYSTEM</option>
                      <option>OTHER</option>
                    </Form.Control>
                    
                    <Form.Label>Theme</Form.Label>
                    <Form.Control
                      value={this.state.theme}
                      onChange={e => this.setState({ theme: e.target.value })}
                      as="select"
                    >
                      <option>AGRI</option>
                      <option>MOBILITY</option>
                      <option>HEALTH</option>
                      <option>D-IDENTITY</option>
                      <option>BLOCKCHAIN</option>
                    </Form.Control>

                    <Form.Label>Project</Form.Label>
                    <Form.Control
                      value={this.state.projectname}
                      onChange={e =>
                        this.setState({ projectname: e.target.value })
                      }
                      as="select"
                    >
                      <option>MOBILE-CONNECT</option>
                      <option>API-STORE</option>
                      <option>CBAAS</option>
                      <option>SMART-CAR</option>
                      <option>MOBILITY-AAS</option>
                      <option>MEDIA-AGGREGATOR</option>
                      <option>DAAF</option>
                      <option>AUTONOMUS-KAS</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} controlId="Title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      value={this.state.title}
                      onChange={e => this.setState({ title: e.target.value })}
                      type="text"
                      placeholder="Card Title"
                    />
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      value={this.state.description}
                      onChange={e =>
                        this.setState({ description: e.target.value })
                      }
                      as="textarea"
                      rows="3"
                    />
                  </Form.Group>
                </Form.Row>

                <Button onClick={this.onUpdate} variant="primary" type="submit">
                  Submit
                </Button>
                <Button onClick={onCancel} variant="primary" type="submit">
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
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
