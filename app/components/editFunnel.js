import React from 'react';
import { Select, Form, Input, Icon, Modal, Button, Spin ,Collapse,Row,Col} from 'antd';
import styled, { css } from 'styled-components';
import moment from 'moment';

const { Option } = Select;

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
    this.state = {
      spinning: false,
    };
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

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        //  console.log(values);
        this.onUpdate(values);
      }
    });
  };

  render() {
    const { visible, onOK, onCancel, data } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (

        <Modal
          title="Update funnel Card"
          centered
          visible={visible}
          onOk={onOK}
          onCancel={onCancel}
          footer={null}
          style = {{minWidth: 600}}
        >


          <Spin spinning={this.state.spinning} tip="Updating...">


          <Collapse
          defaultActiveKey={['1']}

        >

        <Panel header={"Preview:"+data.title} key="1">
        <div>
        
        <Row>
        <Col span={12}>
        <div
        style={{
          minHeigh: 50,
          maxWidth: 50,
          fontWeight: 'bolder',
          color: 'white',
          backgroundColor: data.status,
          textAlign: 'center',
        }}
      >
        Status
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
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <span>
            <Container>
                <Rect6>
                <Form.Item label="Funnel">
                    {getFieldDecorator('funnel', {
                    initialValue: data.funnel,
                      rules: [{ required: true, message: 'funnel' }],
                    })(
                        <Select key={8} style={{ width: 150 }}>
                        <Option value="PLATFORM">PLATFORM</Option>
                          <Option value="ECOSYSTEM">ECOSYSTEM</Option>
                          <Option value="ECOSYSTEM">OTHER</Option>
                      </Select>,
                    )}
                  </Form.Item>
                <Form.Item label='Theme'>
                  {getFieldDecorator('theme', {
                      initialValue: data.theme,
                      rules: [{ required: true, message: 'Themes!' }],
                      })(
                      <Select key={7} style={{ width: 150 }}>
                        <Option value="AGRI">AGRI</Option>
                      <Option value="MOBILITY">MOBILITY</Option>
                      <Option value="HEALTH">HEALTH</Option>
                      </Select>,
                    )}
                  </Form.Item>
                <Form.Item label='Project'>
                    {getFieldDecorator('project', {
                      initialValue: data.projectname,
                      rules: [{ required: true, message: 'Project!' }],
                    })(
                        <Select key={6} style={{ width: 200 }}>
                        <Option value="MOBILE-CONNECT">MOBILE-CONNECT</Option>
                      <Option value="API-STORE">API-STORE</Option>
                          <Option value="CBAAS">CBAAS</Option>
                        <Option value="SMART-CAR">SMART-CAR</Option>
                      <Option value="MOBILITY-AAS">MOBILITY AAS</Option>
                        <Option value="MEDIA-AGGREGATOR">
                        MEDIA-AGGREGATOR
                      </Option>
                      </Select>,
                    )}
                  </Form.Item>

                <Form.Item label="Phase">
                      {getFieldDecorator('funnelPhase', {
                        initialValue: data.FunnelPhase,
                        rules: [
                          {
                        required: true,
                        message: 'Please input your username!',
                      },
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
                          <Option value="solution">SOLUTIONS</Option>
                          <Option value="bussiness">BUSSINESS</Option>
                      <Option value="feasibility">FEASIBILITY</Option>
                          <Option value="mvp">MVP</Option>
                      <Option value="softlaunch">SOFTLAUNCH</Option>
                          <Option value="scalelaunch">SCALELAUNCH</Option>
                        </Select>,
                  )}
                    </Form.Item>
                <Form.Item label='Status'>
                      {getFieldDecorator('status', {
                        initialValue: data.status,
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
                          PARKED{' '}
                          <Icon style={{ color: 'orange' }} type="login" />
                            </div>
                          </Option>
                          <Option value="red">
                            <div style={{ flex: 1 }}>
                          STOPPED{' '}
                          <Icon style={{ color: 'red' }} type="login" />
                            </div>
                      </Option>
                        </Select>,
                  )}
                    </Form.Item>
                </Rect6>
              <Rect7 >
                <Form.Item label='Card Title'>
                  {getFieldDecorator('taskname', {
                    initialValue: data.title,
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

                <Form.Item label='Description'>
                  {getFieldDecorator('description', {
                          initialValue: data.description,
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

                <Form.Item label='Coach'>
                  {getFieldDecorator('coach', {
                            initialValue: data.coach,
                            rules: [
                      { required: true, message: 'Please input your username!' },
                    ],
                          })(
                            <Select
                      key={1}
                      style={{ width: 150 }}
                      placeholder="Coach"
                    >
                    <Option value="Kevin">Kevin</Option>
                    <Option value="Mike">Mike</Option>
                    <Option value="Mark">Mark</Option>
                    <Option value="Amber">Amber</Option>
                            </Select>,
                  )}
                        </Form.Item>

                <Form.Item label='Sponsor'>
                            {getFieldDecorator('leader', {
                    initialValue: data.leader,
                              rules: [
                      { required: true, message: 'Please input your username!' },
                    ],
                  })(
                    <Input
                      prefix={
                        <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                                }
                      placeholder="Sponsor"
                              />,
                  )}
                          </Form.Item>


              </Rect7>
              <Rect7>
              <Form.Item label="Horizon">
              {getFieldDecorator('horizon', {
                initialValue: data.horizon,
    rules: [{ required: true, message: 'Horizon!' }],
              })(
    <Select key={2} placeholder="Horizon" style={{ width: 150 }}>
                  <Option value="H1">H1</Option>
      <Option value="H2">H2</Option>
      <Option value="H3">H3</Option>
    </Select>,
              )}
            </Form.Item>

<Form.Item label="‘Teammembers">
                {getFieldDecorator('sponsor', {
                  initialValue: data.sponsor,
                  rules: [{ required: true, message: 'Horizon!' }],
                })(
                  <Select
      key={3}
                    placeholder="Teammembers"
      style={{ width: 150 }}
                  >
                    <Option value="1ppl">1-ppl</Option>
      <Option value="2ppl">2-ppl</Option>
      <Option value="3ppl">3-ppl</Option>
                  </Select>,
  )}
</Form.Item>
              
              </Rect7>
            </Container>
          </span>

          <Form.Item>
            <Button style={{ margin: 10 }} type="primary" htmlType="submit">
              Update Card
            </Button>
            <Button
              style={{ margin: 10 }}
              onClick={this.onDelete}
              type="danger"
            >
              Delete
            </Button>
            <Button
              style={{ margin: 10 }}
              onClick={onCancel}
              type="danger"
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
          </Panel>
        
        
          </Collapse>
          </Spin>
        </Modal>
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(
  ModalEditTask,
);
export default WrappedNormalLoginForm;
