/* eslint-disable react/prefer-stateless-function */
import {
  Button, Row, Col, Card, Icon, Avatar, Input, List,
} from 'antd';
import React from 'react';

const { Meta } = Card;
const { TextArea } = Input;

class Remarks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      edit: true,
    };
  }



  render() {
    const {
      remarks, user, deleteRemark, saveRemark,
    } = this.props;


    return (
      <Row style={{
        display: 'flex', minWidth: '100%', flexWrap: 'wrap', marginLeft: 10,
      }}
      >
        <List
          itemLayout="horizontal"
          dataSource={remarks}
          renderItem={(remark) => (
            <List.Item
              style={{ minwidth: '100%' }}
              actions={[remark.remarker === user.first_name
                && (
                <div>
                  {!this.state.editable && <Icon style={{ fontSize: '16px', padding: 5 }} onClick={(e) => this.setState({ editable: true })} type="edit" /> }
                  {this.state.editable && <Icon style={{ fontSize: '16px', padding: 5 }} onClick={(e) => {  this.setState({ editable: false }); }} type="save" /> }
                  <Icon style={{ fontSize: '16px', padding: 5 }} onClick={(e) => deleteRemark(e, remark)} type="delete" />
                </div>
                )]}
            >
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={(
                  <div>
                    <a>{remark.remarker}</a>
                  </div>
                )}
                description={this.state.editable && remark.remarker === user.first_name ? <TextArea style={{ minWidth: 400 }} defaultValue={remark.description} onPressEnter={() => this.setState({ editable: false })} onChange={(e) => saveRemark(e, remark)} /> : remark.description}
              />
            </List.Item>
          )}
        />
      </Row>

    );
  }
}

export default Remarks;
