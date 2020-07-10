/* eslint-disable react/prefer-stateless-function */
import {
  Button, Row, Col, Card, Icon, Avatar, Input, List,Popconfirm
} from 'antd';
import React from 'react';
import moment from 'moment';
import { Editor } from '@tinymce/tinymce-react';

const { Meta } = Card;
const { TextArea } = Input;

class Remarks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: null,
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
          pagination={{
            pageSize: 4,
          }}
          renderItem={(remark) => (
            <List.Item
              style={{ minwidth: '100%' }}
              actions={[remark.remarker === user.first_name
                && (
                <div>
                  {this.state.editable !== remark.id && <Icon style={{ fontSize: '16px', padding: 5 }} onClick={(e) => this.setState({ editable: remark.id })} type="edit" /> }
                  {this.state.editable === remark.id && <Icon style={{ fontSize: '16px', padding: 5 }} onClick={(e) => { this.setState({ editable: null }); }} type="save" /> }
                  <Popconfirm title="Delete Remark?" onConfirm={(e) => deleteRemark(e, remark)}>
                    <Icon type="delete" />
                  </Popconfirm>
                </div>
                )]}
            >
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={(
                  <div>
                    <a>
                      {remark.remarker}
                      <br />
                      <div style={{ fontSize: 10 }}>
                        Created:
                        {' '}
                        {moment(remark.created).format('MM/DD/YYYY')}
                      </div>

                    </a>

                  </div>
                )}
                description={this.state.editable === remark.id && remark.remarker === user.first_name


                  ? (
                    <Editor

                      initialValue={remark.description}
                      init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                          'advlist autolink lists link image charmap print preview anchor',
                          'searchreplace visualblocks code fullscreen',
                          'insertdatetime media table paste code help wordcount',
                        ],
                        toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help',
                      }}
                      onEditorChange={(content) => saveRemark(content, remark)}
                    />
                  )


                  : (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: remark.description,
                      }}
                    />
                  )}
              />
            </List.Item>
          )}
        />
      </Row>
    );
  }
}

export default Remarks;
