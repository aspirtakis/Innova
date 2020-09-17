import React from 'react';
import { Select, Form, Input, Icon, Modal, Button, Spin } from 'antd';
import styled, { css } from 'styled-components';
import { backend } from '../utils/config';

import IdeaOnboardingForm from '../containers/IdeaOnboardingForm/index';

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
      buttonEnabled: true,
    };
  }

  handleSubmit = e => {
    this.setState({ spinning: true });
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.addNewTask(values);
      }
      this.setState({ spinning: false });
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
            funnel: values.funnel,
            coach: values.coach,
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
      .catch(taskData => this.setState({ spinning: false }));
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
          <IdeaOnboardingForm />
        </Spin>
      </Modal>
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(
  ModalAddTask,
);
export default WrappedNormalLoginForm;
