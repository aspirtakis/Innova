import {Button,Row,Col, Card, Icon, Avatar,Input } from 'antd';

const { Meta } = Card;
import React from 'react';
const { TextArea } = Input;

class Remarks extends React.Component {
  constructor(props) {
    super(props);

  }




  render() {
    const { remarks,cardClick, saveRemark ,user,coach,deleteRemark} = this.props;
    console.log(this.props);
    return (
     <Row style={{  display: 'flex', minWidth:'100%', flexWrap:"wrap", marginLeft:10}} >
      {remarks.map((remark,i) =>

        <Card
        key={i}
        style={{ width: 200, margin:10}}
      >
        <Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={remark.remarker}
          description= {remark.remarker !== user.first_name && remark.description}
        />
       
       {remark.remarker === coach && remark.remarker === user.first_name && <TextArea onChange={(e) => saveRemark(e,remark)} rows={4} defaultValue={remark.description} />}
       {remark.remarker === coach && remark.remarker === user.first_name &&  <Button onClick={(e) => deleteRemark(e,remark)} >Delete</Button> }
      </Card>
      )}
      </Row>
    );
  }
}

export default Remarks;