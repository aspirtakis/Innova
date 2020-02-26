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
      accepted:props.record.status === 'Accepted',
      result:props.record.result,
      status:props.record.status,
    };
  }

onSelectedStatus = (e) => {
  console.log(`checked = ${e.target.checked}`);
}
  render() {
    const {
      record, open, onSave, result,
    } = this.props;
    return (
      <Popover
        content={(
          <div>
            <Row style={{ marginBottom: 10 }}>

            </Row>
            <Row>
              <Checkbox checked={this.state.accepted} onChange={() => {this.setState({accepted:true}); this.setState({status:'Accepted'})}}> Accepted</Checkbox>
              <Checkbox checked={!this.state.accepted} onChange={() => {this.setState({accepted:false}); this.setState({status:'Rejected'})}} >Rejected</Checkbox>
            </Row>
            <Row>
              <TextArea
                rows={6}
                defaultValue={result}
                onChange={(e) => this.setState({result:e.target.value})}
              />
            </Row>
            <Row>
              <a onClick={() => onSave(this.state.result,this.state.status)}>Save</a>
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
