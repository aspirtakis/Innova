/* eslint-disable react/prefer-stateless-function */
import {
  Button, Row, Col, Card, Icon, Avatar, Input, List,
} from 'antd';
import React from 'react';
import moment from 'moment';

const { Meta } = Card;
const { TextArea } = Input;

class StageGates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: null,
      edit: true,
    };
  }


  render() {
    const {
      stageGates, user, deleteMeeting, saveMeeting,
    } = this.props;


    return (
      <Row style={{
        display: 'flex', minWidth: '100%', flexWrap: 'wrap', marginLeft: 10,
      }}
      >
        <List
          itemLayout="horizontal"
          dataSource={stageGates}
          renderItem={(meeting) => (
            <List.Item
              style={{ minWidth: 700, backgroundColor: meeting.type === 'FundingMoment' ? '#ccffcc' : '#cce6ff', margin:10 }}
              actions={[meeting.editor === user.first_name
                && (
                <div>
                  {this.state.editable !== meeting.id && <Icon style={{ fontSize: '16px', padding: 5 }} onClick={(e) => this.setState({ editable: meeting.id })} type="edit" /> }
                  {this.state.editable === meeting.id && <Icon style={{ fontSize: '16px', padding: 5 }} onClick={(e) => { this.setState({ editable: null}); }} type="save" /> }
                  <Icon style={{ fontSize: '16px', padding: 5 }} onClick={() => deleteMeeting(meeting)} type="delete" />
                </div>
                )]}
            >
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={(
                  <div>
                    <a>
                      Editor :
                      {meeting.editor}
                      Created:
                      {' '}
                      {moment(meeting.created).format('DD/MM/YYYY')}
                      <div>{meeting.type}</div>
                      <div style={{ fontSize: 10 }}>
                        Updated:
                        {' '}
                        {moment(meeting.updated).format('DD/MM/YYYY')}
                      </div>
                    </a>
                  </div>
                )}
                description={this.state.editable === meeting.id && meeting.editor === user.first_name ? <TextArea style={{ minWidth: 400 }} defaultValue={meeting.title} onPressEnter={() => this.setState({ editable: null })} onChange={(e) => saveMeeting(e, meeting)} /> : meeting.title}
              />
            </List.Item>
          )}
        />
      </Row>
    );
  }
}

export default StageGates;
