import {Row,Col, Card, Icon, Avatar } from 'antd';

const { Meta } = Card;
import React from 'react';


class Remarks extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    const { remarks } = this.props;
    return (
     <Row>
      {remarks.map((remark) =>
        <Card
        style={{ width: 200}}
        actions={[
          <Icon type="edit" key="edit" />,
        ]}
      >
        <Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={remark.created}
          title={remark.remarker}
          description={remark.description}
        />
      </Card>

      )}
      </Row>

    );
  }
}

export default Remarks;