/* eslint-disable react/prefer-stateless-function */
import React from 'react';

import InputSmall from "./subcomponents/inputSmall";
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
      meetingLocation: null,
      fundingRequest: null,
      meetingGoal: null,
      meetingFeedback: null,
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
      <div className="content">
        <div className="content__body">
          <div className="row">
            <div className="col col--7">
              <dl className="dl">
                <MeetingSelector
                  title="Meeting type"
                  selectedValue={(e) => this.settingValueStates("meetingType", e)}
                />
                
                <dt className="dt smallInputTitle">Meeting date</dt>
                <DatePicker 
                title="Meeting date"
                showTime={{
                  hideDisabledOptions: true,
                }}
                
                className="datePicker"
              //  value={moment(this.state.meetingDate, dateFormat)}
                format={dateFormat}
                onChange={(date, dateString) => {
                  this.settingValueStates("meetingDate", moment(date,dateFormat))
                } } />


                <InputSmall
                  title="Funding request"
                  inputType="text"
                  placeholder="€"
                  smallInputValue={(e) => this.settingValueStates("fundingRequest", e)}
                />

                <InputLarge
                  title="Goal"
                  placeholder="Explain why this meeting is required"
                  largeInputValue={(e) => this.settingValueStates("meetingGoal", e)}
                />
                
                {/* 
                <div>
                  <dt className="documentTitle">Add documents</dt>
                  <dd className="documentField">Drag and drop your documents here or add them HERE.</dd>
                </div> 
                */}

              </dl>
              <div className="meetingButtons">
                <button onClick={this.saveData} className="button button--4">Send meeting</button>
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
