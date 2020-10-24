/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import moment from 'moment';

import './agenda.css';
import AddNewMeeting from './addnewMeeting';

import MeetingRow from './subcomponents/meetingRow';

class Agenda extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: null,

    };
  }

  render() {
    const {
   AgendaData, AddNewMeeting, editMeeting, deleteMeetings, user,
    } = this.props;


    return (
      <div>

        <div className="scroll-x">
          <div className="table-toolbar">
            <div className="table-toolbar__data">
              {AgendaData.length}
              {' '}
              items
            </div>
            <div className="table-toolbar__action">
              <button onClick={() => AddNewMeeting()} className="button">Add item</button>
            </div>
          </div>
          <div className="scroll-table">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <a>Meeting</a>
                  </th>
                  <th>
                    <a>Time & Date</a>
                  </th>
                  <th>
                    <a>Stage</a>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {AgendaData.map((meeting) => (
                  <MeetingRow
                    key={meeting.id}
            
                    meetingData={meeting}
                    editMeetingRow={editMeeting}
                    deteteMeetinRow={deleteMeetings}
                    user={user}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    );
  }
}

export default Agenda;
