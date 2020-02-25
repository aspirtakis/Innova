/* eslint-disable react/prefer-stateless-function */
import {
  Popover,
  Input,
  Switch,
  Row,
  Badge,
  Col,
  Checkbox,
} from 'antd';
import React from 'react';

const { TextArea } = Input;
class AssumptionStatus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accepted:null,
    };
  }

onSelectedStatus = (e) => {
  console.log(`checked = ${e.target.checked}`);
}
  render() {
    const {
      record, open, onSave, result,
    } = this.props;
    console.log(this.props.record.id);
    console.log(this.props.open);
    return (
      <Popover
        content={(
          <div>
            <Row style={{ marginBottom: 10 }}>
              {record.status === 'Processing' ? <Badge count={5} status="processing"  />: null}
              {record.status}
            </Row>
            <Row>
              <Checkbox checked={this.state.accepted} onChange={() => this.setState({accepted:true})}> Accepted</Checkbox>
              <Checkbox checked={!this.state.accepted} onChange={() => this.setState({accepted:false})} >Rejected</Checkbox>
            </Row>
            <Row>
              <TextArea
                rows={6}
                defaultValue={result}
              />
            </Row>
            <Row>
              <a onClick={onSave}>Save</a>
            </Row>
          </div>
        )}
        title="Assumption Result"
        trigger="click"
        visible={ open === record.id }
        placement="topRight"
        onVisibleChange={this.handleVisibleChange}
      />
    );
  }
}

export default AssumptionStatus;
