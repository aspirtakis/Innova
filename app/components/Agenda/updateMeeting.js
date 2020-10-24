/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import moment from 'moment';
import InputSmall from "./subcomponents/inputSmall";
import InputLarge from "./subcomponents/inputLarge";
import MeetingSelector from "./subcomponents/meetingSelector";
const dateFormat = 'DD/MM/YYYY HH:mm:ss';
import './agenda.css';
import { Select ,DatePicker } from 'antd';
const { Option } = Select;
import { Editor } from '@tinymce/tinymce-react';


class UpdateMeeting extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    const {meetingData} = props;

    this.state = {
      id: meetingData.id,
      meetingType: meetingData.type,
      meetingDate: meetingData.meetingDate,
      fundingRequest: meetingData.funding_request,
      meetingGoal: meetingData.goal,
      meetingFeedback: meetingData.feedback,
      meetingName: meetingData.title,
    };
  }


  settingValueStates = (type, e) => {
    this.setState({ [type]: e });
    console.log(this.state);
  };

  saveData = () => {
    this.props.onSaveMeeting(this.state);
    this.props.editMeetingCancel();
  }

  render() {
    const { editMeetingCancel, meetingData } = this.props;
  //  console.log(this.state);
    return (
      <div className="content">
        <div className="content__body">
          <div className="row">
            <div className="col col--7">
              <dl className="dl">

              <Select
              style={{ width: 200 }}
              placeholder="Select a person"
              value={this.state.meetingType}
              onChange={(value) => this.settingValueStates("meetingType", value)}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option value="StageGate">Stage Gate</Option>
              <Option value="FundingMoment">Funding momment</Option>
            </Select>


                {/* {/* fix avatar dots */}
                {/* <div>
                  <dt className="smallInputTitle">Invite</dt>
                  <dd className="smallInputField">
                    There should be avatars and an add button here!
                    </dd>
                </div> */}

                <InputSmall
                  title="Meeting name"
                  inputType="text"
                  cval={this.state.meetingName}
                  smallInputValue={(e) => this.settingValueStates("meetingName", e)}
                />
                <DatePicker 
                showTime={{
                  hideDisabledOptions: true,
                }}
                
                value={moment(this.state.meetingDate, dateFormat)}
                format={dateFormat}
                onChange={(date, dateString) => {
                  this.settingValueStates("meetingDate", moment(date,dateFormat))
                } } />


                <InputSmall
                  title="Funding request"
                  inputType="text"
                  cval={this.state.fundingRequest}
                  smallInputValue={(e) => this.settingValueStates("fundingRequest", e)}
                />
                <InputLarge
                  title="Goal"
                  cval={this.state.meetingGoal}
                  largeInputValue={(e) => this.settingValueStates("meetingGoal", e)}
                />
       {/*        <InputLarge
                  title="Feedback"
                  cval={this.state.meetingFeedback}
                  largeInputValue={(e) => this.settingValueStates("meetingFeedback", e)}
       />*/}

                <Editor

                initialValue={this.state.meetingFeedback}
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                  ],
                  toolbar:
              'undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help',
                }}
                onEditorChange={(content) => this.settingValueStates("meetingFeedback", content)}
              />

                {/*
                <div>
                  <dt className="documentTitle">Add documents</dt>
                  <dd className="documentField">Drag and drop your documents here or add them HERE.</dd>
                </div>
                */}

              </dl>
              <div className="addMeetingButtons">
                <button onClick={this.saveData} className="button button--4">Send meeting</button>
                <button onClick={editMeetingCancel} className="button button--link">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateMeeting;
