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

              {record.status === 'Processing' ? <Badge count={5} status="processing"  />: null}
              {record.status}
            </Row>
            <Row>
              <Checkbox onChange={this.onSelectedStatus}> Accepted</Checkbox>
              <Checkbox onChange={this.onSelectedStatus} >Rejected</Checkbox>
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
        visible={open}
        placement="topRight"
        onVisibleChange={this.handleVisibleChange}
      />

    );
  }
}

export default AssumptionStatus;
