/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import moment from 'moment';

import '../agenda.css';

import TextSmall from './textSmall';
import TextLarge from './textLarge';
import Avatar from './avatar';

class MeetingRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      active: false,

    };
  }

  handleClick() {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  }

  render() {
    const {
      meetingData, editMeetingRow, deteteMeetinRow, user,
    } = this.props;

    return (
      <>
        {/* insert quick-view content here */}
        <tr
          className={this.state.active ? 'table__row-expanded' : 'table__row-collapsed'}
          onClick={this.handleClick}
        >
          <td>{meetingData.type}</td>
          <td>{moment(meetingData.meetingDate).format('ddd DD-MM-YYYY, HH:mm')}</td>
          <td>{meetingData.stage}</td>
          <td className="text-align-right" />
        </tr>
        {/* insert detailed content here, it shows when the row is clicked */}
        <tr className="table__row-content">
          <td colSpan="5">
            <div className="row">
              <div className="col col--5">
                <dl className="dl">
                  {meetingData && meetingData.title
                    ? (
                      <TextLarge
                        title="Goal"
                        description={meetingData.title}
                      />
                    )
                    : (
                      <TextLarge
                        title="Goal"
                        description={meetingData.goal}
                      />
                    )}

                  {meetingData && meetingData.type == "FundingMoment" && (
                    <TextSmall
                      title="Requested funding"
                      description={meetingData.funding_request}
                    />
                  )}

                  {/* <dt>Documents</dt>
									<dd>Linkje na linkje naar allemaal docs</dd> */}

                </dl>
                {user && meetingData && user.first_name == meetingData.editor && (
                  <dl className="dl meetingButtons">
                    <button
                      className="button"
                      onClick={() => editMeetingRow(meetingData)}
                    >
                      Edit
                    </button>

                    <button
                      className="button button--link"
                      onClick={() => deteteMeetinRow(meetingData)}
                    >
                      Delete
                    </button>

                  </dl>
                )}
              </div>


              {/* Column with data after concluding meeting */}
              {meetingData && meetingData.feedback && (
                <div className="col col--5">
                  <dl className="dl">
                    <dt className="dt">Feedback</dt>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: meetingData.feedback,
                      }}
                    />

                  </dl>
                </div>
              )}

            </div>
          </td>
        </tr>
      </>
    );
  }
}

export default MeetingRow;
