import {Button,Row,Col, Card, Icon, Avatar,Input } from 'antd';

const { Meta } = Card;
import React from 'react';
const { TextArea } = Input;

class Remarks extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {
    const { remarks,cardClick, saveRemark } = this.props;
    console.log(this.props);
    return (
     <Row>
      {remarks.map((remark,i) =>
        <Col key={i}>
        <Card
        style={{ width: 200}}
      >
        <Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={remark.remarker}
        />
        {<h4>{remark.description}</h4>}
       { <TextArea onChange={saveRemark} rows={4} defaultValue={remark.description} />}
      </Card>
        </Col>
      )}
      </Row>
    );
  }
}

export default Remarks;