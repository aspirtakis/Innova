/* eslint-disable react/prefer-stateless-function */
import {
  Popover,
  Input,
  Row,
  Checkbox,
} from 'antd';
import React from 'react';

const { TextArea } = Input;
class AssumptionStatus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accepted: props.record.status === 'Accepted',
      rejected: props.record.status === 'Rejected',
      result: props.record.result,
      status: props.record.status,
    };
  }


  render() {
    const {
      record, open, onSave, result, onCloseResult,
    } = this.props;
    return (
      <Popover
        content={(
          <div>
            <Row style={{ marginBottom: 10 }} />
            <Row>
              <Checkbox checked={this.state.accepted} onChange={() => { this.setState({ accepted: true, rejected: false }); this.setState({ status: 'Accepted' }); }}> Accepted</Checkbox>
              <Checkbox checked={this.state.rejected} onChange={() => { this.setState({ accepted: false, rejected: true }); this.setState({ status: 'Rejected' }); }}>Rejected</Checkbox>
            </Row>
            <Row>
              <TextArea
                rows={6}
                defaultValue={result}
                onChange={(e) => this.setState({ result: e.target.value })}
              />
            </Row>
            <Row>
              <a onClick={() => onSave(this.state.result, this.state.status)}>Save</a>
              <a
                style={{ marginLeft: 10 }}
                onClick={() => onCloseResult()}
              >
                Close
              </a>
            </Row>
          </div>
        )}
        title="Assumption Result"
        trigger="click"
        visible={open === record.id}
        placement="topRight"
        onVisibleChange={this.handleVisibleChange}
      />
    );
  }
}

export default AssumptionStatus;
