import React from 'react';

import 'antd/dist/antd.css';

import { Select, Form, Input, Icon, Modal, Button } from 'antd';
const { Option } = Select;

const apptoken =
'36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88';
// eslint-disable-next-line react/prefer-stateless-function
class ModalAddTask extends React.Component {

  constructor(props) {
    super(props);
  }

  onSave = (values) => {
    console.log(values);
    const url4 = `http://datafactory.openinnovationhub.nl./api/v2/Funelis/_table/funnel.tasks`;
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
        
          "resource": [
            {
              "description": values.description,
              "asssignedUser": "1",
              "projectname": values.project,
              "horizon": values.horizon,
              "theme": values.theme,
              "prjid": 1,
              "status": values.status,
              "FunnelPhase": values.funnelPhase,
              "title": values.taskname,
              "themeid": 1
            }
        
          ]
        
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
                {getFieldDecorator('project', {
                  rules: [
              { required: true, message: 'Horizon!' },
            ],
          })(
            <Select style={{ width: 150 }}>
            <Option value="AGRI">PLATFORM</Option>
            <Option value="API">ECOSYSTEM</Option>
          </Select>
          )}
          {getFieldDecorator('theme', {
            rules: [
        { required: true, message: 'Horizon!' },
      ],
    })(
      <Select style={{ width: 150 }}>
      <Option value="AGRI">AGRI</Option>
      <Option value="MOBILITY">MOBILITY</Option>
      <Option value="HEALTH">HEALTH</Option>
    </Select>
    )}
         
              {getFieldDecorator('taskname', {
                rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                      <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="title"
                />,
              )}
                    {getFieldDecorator('description', {
                      rules: [
                  { required: true, message: 'Please input your username!' },
                ],
              })(
                      <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Description"
                />,
              )}
                    {getFieldDecorator('horizon', {
                      rules: [
                  { required: true, message: 'Horizon!' },
                ],
              })(
                <Select style={{ width: 150 }}>
                <Option value="H1">H1</Option>
                <Option value="H2">H2</Option>
                <Option value="H3">H3</Option>
              </Select>
              )}

              {getFieldDecorator('funnelPhase', {
                rules: [
            { required: true, message: 'Please input your username!' },
          ],
        })(
          <Select style={{ width: 150 }}>
          <Option value="initiate">INITIATE</Option>
          <Option value="scope">SCOPE</Option>
          <Option value="problem">PROBLEM</Option>
          <Option value="solution">SOLUTIONs</Option>
          <Option value="bussiness">BUSSINESS</Option>
          <Option value="feasibility">FEASIBILITY</Option>
          <Option value="mvp">MVP</Option>
          <Option value="softlaunch">SOFTLAUNCH</Option>
          <Option value="scalelaunch">SCALELAUNCH</Option>
        </Select>
        )}
        {getFieldDecorator('status', {
          rules: [
      { required: true, message: 'Please input your username!' },
    ],
  })(
    <Select style={{ width: 150 }}>
    <Option value="green">GREEN</Option>
    <Option value="red">RED</Option>
    <Option value="pink">PINK</Option>

  </Select>
  )}
  
        
                  </Form.Item>
                  <Form.Item>

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
