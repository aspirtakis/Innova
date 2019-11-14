import React from 'react';
import { Select, Form, Input, Icon, Modal, Button } from 'antd';

const { Option } = Select;
const apptoken =
  '36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88';
// eslint-disable-next-line react/prefer-stateless-function
class ModalAddTask extends React.Component {
  onSave = values => {
    const url4 = `https://aws.openinnovationhub.nl./api/v2/funnel/_table/funnel.tasks`;
    fetch(url4, {
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
            prjid: 1,
            status: values.status,
            FunnelPhase: values.funnelPhase,
            title: values.taskname,
            themeid: 1,
            funnel: values.funnel,
            coach: values.coach,
            leader: values.leader,
            sponsor: values.sponsor,
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
        console.log(taskData);
      })
      .catch(taskData => console.log(taskData));
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.onSave(values);
      }
    });
  };

  render() {
    const { visible, onOK, onCancel } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Modal
          title="add new Card"
          centered
          visible={visible}
          onOk={onOK}
          onCancel={onCancel}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('funnel', {
                rules: [{ required: true, message: 'funnel' }],
              })(
                <Select key={8} style={{ width: 150 }}>
                  <Option value="PLATFORM">PLATFORM</Option>
                  <Option value="ECOSYSTEM">ECOSYSTEM</Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('theme', {
                rules: [{ required: true, message: 'Themes!' }],
              })(
                <Select key={7} style={{ width: 150 }}>
                  <Option value="AGRI">AGRI</Option>
                  <Option value="MOBILITY">MOBILITY</Option>
                  <Option value="HEALTH">HEALTH</Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('project', {
                rules: [{ required: true, message: 'Project!' }],
              })(
                <Select key={6} style={{ width: 200 }}>
                  <Option value="MOBILE-CONNECT">MOBILE-CONNECT</Option>
                  <Option value="API-STORE">API-STORE</Option>
                  <Option value="CBAAS">CBAAS</Option>
                  <Option value="SMART-CAR">SMART-CAR</Option>
                  <Option value="MOBILITY-AAS">MOBILITY AAS</Option>
                  <Option value="MEDIA-AGGREGATOR">MEDIA-AGGREGATOR</Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('taskname', {
                rules: [{ required: true, message: 'input Title!' }],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Card Title"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('description', {
                rules: [
                  { required: true, message: 'Please input description' },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Description"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('coach', {
                rules: [
                  { required: true, message: 'Please input your username!' },
                ],
              })(
                <Select key={1} style={{ width: 150 }} placeholder="Coach">
                  <Option value="Kevin">KEVIN</Option>
                  <Option value="Mike">Mike</Option>
                  <Option value="Melvin">Melvin</Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('leader', {
                rules: [
                  { required: true, message: 'Please input your username!' },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Leader"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('horizon', {
                rules: [{ required: true, message: 'Horizon!' }],
              })(
                <Select key={2} placeholder="Horizon" style={{ width: 150 }}>
                  <Option value="H1">H1</Option>
                  <Option value="H2">H2</Option>
                  <Option value="H3">H3</Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('sponsor', {
                rules: [{ required: true, message: 'Horizon!' }],
              })(
                <Select key={3} placeholder="Sponsored" style={{ width: 150 }}>
                  <Option value="1ppl">1-ppl</Option>
                  <Option value="2ppl">2-ppl</Option>
                  <Option value="3ppl">3-ppl</Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('funnelPhase', {
                rules: [
                  { required: true, message: 'Please input your username!' },
                ],
              })(
                <Select
                  key={4}
                  placeholder="FunnelPhase"
                  style={{ width: 150 }}
                >
                  <Option value="initiate">INITIATE</Option>
                  <Option value="scope">SCOPE</Option>
                  <Option value="problem">PROBLEM</Option>
                  <Option value="solution">SOLUTIONs</Option>
                  <Option value="bussiness">BUSSINESS</Option>
                  <Option value="feasibility">FEASIBILITY</Option>
                  <Option value="mvp">MVP</Option>
                  <Option value="softlaunch">SOFTLAUNCH</Option>
                  <Option value="scalelaunch">SCALELAUNCH</Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('status', {
                rules: [
                  { required: true, message: 'Please input your username!' },
                ],
              })(
                <Select key={5} placeholder="Status" style={{ width: 150 }}>
                  <Option value="green">
                    <div style={{ flex: 1, alignContent: 'center' }}>
                      PROGRESSING{' '}
                      <Icon style={{ color: 'green' }} type="login" />
                    </div>{' '}
                  </Option>
                  <Option value="yellow">
                    <div style={{ flex: 1 }}>
                      IMPEDIMENT{' '}
                      <Icon style={{ color: 'yellow' }} type="login" />
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
                </Select>,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add task
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(
  ModalAddTask,
);
export default WrappedNormalLoginForm;
