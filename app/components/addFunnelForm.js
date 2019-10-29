import React from 'react';

import 'antd/dist/antd.css';

import { Select, Form, Input, Icon, Modal, Button } from 'antd';
const { Option } = Select;
// eslint-disable-next-line react/prefer-stateless-function
class ModalAddTask extends React.Component {


  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };


  render() {
    const { visible, onOK, onCancel} = this.props;
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

                <Select style={{ width: 150 }}>
                <Option value="AGRI">AGRI</Option>
                <Option value="API">API</Option>
                <Option value="MEDIA-ADV">MEDIA-ADV</Option>
              </Select>
              {getFieldDecorator('taskname', {
                rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                      <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Task"
                />,
              )}
                    {getFieldDecorator('description', {
                      rules: [
                  { required: true, message: 'Please input your username!' },
                ],
              })(
                      <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="FunnelPhase"
                />,
              )}
                    {getFieldDecorator('horizon', {
                      rules: [
                  { required: true, message: 'Please input your username!' },
                ],
              })(
                <Select style={{ width: 150 }}>
                <Option value="SMART-CAR">SMART-CAR</Option>
                <Option value="API-STORE">API-STORE</Option>
                <Option value="MOBILE-CONNECT">MOBILE-CONNECT</Option>
              </Select>
              )}
                  </Form.Item>
                  <Form.Item>
                  <Select style={{ width: 150 }}>
                  <Option value="INITIATE">INITIATE</Option>
                  <Option value="SCOPE">SCOPE</Option>
                  <Option value="PROBLEM">PROBLEM</Option>
                  <Option value="SOLUTION">SOLUTIONs</Option>
                  <Option value="BUSSINESS">BUSSINESS</Option>
                  <Option value="FEASIBILITY">FEASIBILITY</Option>
                  <Option value="MVP">MVP</Option>
                  <Option value="SOFLAUNCH">SOFTLAUNCH</Option>
                  <Option value="SCALELAUNCH">SCALELAUNCH</Option>
                </Select>
                  </Form.Item>
                  <Form.Item>
                  <Button type="primary" htmlType="submit">
                  Add task
                  </Button>
                  </Form.Item>
          </Form>
        </Modal>
        <br />
        <br />
      </div>
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(
  ModalAddTask,
);
export default WrappedNormalLoginForm;
