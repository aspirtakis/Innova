/* eslint-disable react/prefer-stateless-function */
import React from 'react';

import '../agenda.css';
import { Select  } from 'antd';
const { Option } = Select;

class MeetingSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: null,

    };
  }

  render() {
    const { title, selectedValue,valueData } = this.props;

    return (
      <div>
        <dt className="smallInputTitle">{title}</dt>
        <dd>

          <Select
            className="meetingSelector"
            style={{ width: 200 }}
            placeholder="Select a type"
            defaultValue={valueData}
            onChange={(value) => selectedValue(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="StageGate">Stagegate</Option>
            <Option value="FundingMoment">Funding moment</Option>

          </Select>
        </dd>
      </div>
    );
  }
}

export default MeetingSelector;
