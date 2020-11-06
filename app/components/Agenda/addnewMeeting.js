/* eslint-disable react/prefer-stateless-function */
import React from 'react';

import FundingSmall from "./subcomponents/fundingInput";
import InputLarge from "./subcomponents/inputLarge";
import { DatePicker } from 'antd';
import './agenda.css';
import MeetingSelector from './subcomponents/meetingSelector';
import moment from 'moment';
const dateFormat = 'DD/MM/YYYY HH:mm';

class AddNewMeeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meetingName: null,
      meetingDate: null,
      fundingRequest: null,
      meetingGoal: null,
    };
  }

  settingValueStates = (type, e) => {

    this.setState({ [type]: e });

    console.log(this.state);
  };

  saveData = () => {
    this.props.onSaveMeeting(this.state);
    this.props.addMeetingCancel();
  }

  render() {
    const { addMeetingCancel, saveMeeting } = this.props;
    return (
      <div className="meetingFormPadding">
        <div className="content__body">
          <div className="row">
            <div className="col col--7">
              <dl className="dl">
                <MeetingSelector
                  title="Meeting type"
                  selectedValue={(e) => this.settingValueStates("meetingType", e)}
                />

                <dt className="dt smallInputTitle">Meeting date</dt>
                <dd>
                  <DatePicker
                    title="Meeting date"
                    showTime={{
                      hideDisabledOptions: true,
                    }}

                    className="datePicker"
                    //  value={moment(this.state.meetingDate, dateFormat)}
                    format={dateFormat}
                    onChange={(date, dateString) => {
                      this.settingValueStates("meetingDate", moment(date, dateFormat))
                    }}
                    required
                  />
                </dd>

                <InputLarge
                  title="Goal"
                  placeholder="What do you want to present or discuss? What do you need help with?"
                  largeInputValue={(e) => this.settingValueStates("meetingGoal", e)}
                />

                <FundingSmall
                  title="Funding request"
                  smallInputValue={(e) => this.settingValueStates("fundingRequest", e)}
                />

              </dl>
              <div className="meetingButtons">
                {(this.state.meetingType && this.state.meetingDate && this.state.meetingGoal) ? (
                  <button onClick={this.saveData} className="button button--4">Send meeting</button>
                ) : (
                    <button onClick={this.saveData} className="button button--4" disabled>Send meeting</button>
                  )}
                <button onClick={addMeetingCancel} className="button button--link">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddNewMeeting;
