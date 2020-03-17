import React from 'react';
import { Select, Form, Input, Icon, Modal, Button, Spin } from 'antd';
import styled, { css } from 'styled-components';
import {backend} from '../utils/config';

const tasksUrl = backend.beUrl + backend.tasks;
const apptoken = backend.apptoken;

const { Option } = Select;

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

class ModalAddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinning: false,
    };
  }

  handleSubmit = e => {this.setState({ spinning: true });
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.addNewTask(values);
      }
    });
  };


  addNewTask = values => {
    this.setState({ spinning: true });
    fetch(tasksUrl, {
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
            description: values.description,
            asssignedUser: '1',
            projectname: values.project,
            horizon: values.horizon,
            theme: values.theme,
            status: values.status,
            FunnelPhase: values.funnelPhase,
            title: values.taskname,
            funnel: values.funnel,
            coach: values.coach,
            leader: values.leader,
            sponsor: values.sponsor,
            spnsr: values.spnsr,
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
      .then(taskData => {
        this.props.onOK();
        this.setState({ spinning: false });
      })
      .catch(taskData => console.log(taskData));
  };

  render() {
    const { visible, onOK, onCancel } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title="add new Card"
        centered
        visible={visible}
        onOk={onOK}
        onCancel={onCancel}
        footer={null}
      >
        <Spin spinning={this.state.spinning} tip="Updating...">
          <Form onSubmit={this.handleSubmit}>
            <Container>
              <Rect6 className="nopadding">
                <Form.Item label="Department">
                  {getFieldDecorator('funnel', {
                    rules: [{ required: true, message: 'funnel' }],
                  })(
                    <Select key={8} style={{ width: 150 }}>
                      <Option value="OIH">OIH</Option>
                      <Option value="CM">CM</Option>
                      <Option value="BM">BM</Option>
                      <Option value="WS">WS</Option>
                      <Option value="OPS">OPS</Option>
                    </Select>,
                  )}
                </Form.Item>

                <Form.Item label="Theme">
                {getFieldDecorator('theme', {
                    rules: [{ required: true, message: 'theme' }],
                  })(
                    <Select key={8} style={{ width: 150 }}>
                      <Option value="NextGenInfra">Next-Gen Infra</Option>
                      <Option value="DataTech">Data Tech</Option>
                      <Option value="Techco">TechCo</Option>
                      <Option value="Other">Other</Option>
                    </Select>
                  )}
                </Form.Item>

                <Form.Item label="Project">
                  {getFieldDecorator('project', {
                    rules: [{ required: true, message: 'Project!' }],
                  })(
                    <Input
                    prefix={
                      <Icon
                        type="user"
                        style={{ color: 'rgba(0,0,0,.25)' }}
                      />
                    }
                    placeholder="Project"
                  />
                  )}
                </Form.Item>

                <Form.Item label="Task Title">
                  {getFieldDecorator('taskname', {
                    rules: [{ required: true, message: 'input Title!' }],
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      placeholder="Card Title"
                    />
                  )}
                </Form.Item>

                <Form.Item label="Sponsor">
                  {getFieldDecorator('spnsr', {
                    rules: [{ required: true, message: 'input Title!' }],
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      placeholder="Sponsor"
                    />,
                  )}
                </Form.Item>

                <Form.Item label="Description">
                  {getFieldDecorator('description', {
                    rules: [
                      { required: true, message: 'Please input description' },
                    ],
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      placeholder="Description"
                    />,
                  )}
                </Form.Item>
              </Rect6>

              <Rect7 className="nopadding">
                <Form.Item label="Product Owner">
                  {getFieldDecorator('leader', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your username!',
                      },
                    ],
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      placeholder="Product Owner"
                    />,
                  )}
                </Form.Item>
                <Form.Item label="Horizon">
                  {getFieldDecorator('horizon', {
                    rules: [{ required: true, message: 'Horizon!' }],
                  })(
                    <Select
                      key={2}
                      placeholder="Horizon"
                      style={{ width: 150 }}
                    >
                      <Option value="H1">H1</Option>
                      <Option value="H2">H2</Option>
                      <Option value="H3">H3</Option>
                    </Select>,
                  )}
                </Form.Item>
                <Form.Item label="Teammembers">
                  {getFieldDecorator('sponsor', {
                    rules: [{ required: true, message: 'Horizon!' }],
                  })(
                    <Select
                      key={3}
                      placeholder="Team Members"
                      style={{ width: 150 }}
                    >
                      <Option value="1">1</Option>
                      <Option value="2">2</Option>
                      <Option value="3">3</Option>
                      <Option value="4">4</Option>
                    </Select>,
                  )}
                </Form.Item>

                <Form.Item label="FunnelPhase">
                  {getFieldDecorator('funnelPhase', {})(
                    <Select
                      key={4}
                      placeholder="FunnelPhase"
                      style={{ width: 150 }}
                    >
                      <Option value="initiate">INITIATE</Option>
                      <Option value="backlog">BACKLOG</Option>
                      <Option value="archive">ARCHIVE</Option>
                      <Option value="scope">SCOPE</Option>
                      <Option value="problem">PROBLEM</Option>
                      <Option value="solution">SOLUTION</Option>
                      <Option value="bussiness">BUSSINESS</Option>
                      <Option value="feasibility">FEASIBILITY</Option>
                      <Option value="mvp">MVP</Option>
                      <Option value="softlaunch">SOFTLAUNCH</Option>
                      <Option value="scalelaunch">SCALELAUNCH</Option>
                    </Select>,
                  )}
                </Form.Item>
                <Form.Item label="Status">
                  {getFieldDecorator('status', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your username!',
                      },
                    ],
                  })(
                    <Select key={5} placeholder="Status" style={{ width: 150 }}>
                      <Option value="green">
                        <div style={{ flex: 1, alignContent: 'center' }}>
                          PROGRESSING{' '}
                          <Icon
                            style={{ marginLeft: 3, color: 'green' }}
                            type="login"
                          />
                        </div>{' '}
                      </Option>
                      <Option value="yellow">
                        <div style={{ flex: 1 }}>
                          IMPEDIMENT{' '}
                          <Icon
                            style={{ marginLeft: 3, color: 'yellow' }}
                            type="login"
                          />
                        </div>
                      </Option>
                      <Option value="orange">
                        <div style={{ flex: 1 }}>
                          PARKED{' '}
                          <Icon
                            style={{ marginLeft: 3, color: 'orange' }}
                            type="login"
                          />
                        </div>
                      </Option>
                      <Option value="red">
                        <div style={{ flex: 1 }}>
                          STOPPED{' '}
                          <Icon
                            style={{ marginLeft: 3, color: 'red' }}
                            type="login"
                          />
                        </div>
                      </Option>
                    </Select>,
                  )}
                </Form.Item>

                <Form.Item label="Coach">
                  {getFieldDecorator('coach', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your username!',
                      },
                    ],
                  })(
                    <Select key={1} style={{ width: 150 }} placeholder="Coach">
                      <Option value="Kevin">Kevin</Option>
                      <Option value="Mike">Mike</Option>
                      <Option value="Mark">Mark</Option>
                      <Option value="Amber">Amber</Option>
                      <Option value="Amber">Melvin</Option>
                    </Select>,
                  )}
                </Form.Item>
              </Rect7>
            </Container>
            <Button type="primary" htmlType="submit">
              Add task
            </Button>
          </Form>
        </Spin>
      </Modal>
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(
  ModalAddTask,
);
export default WrappedNormalLoginForm;
