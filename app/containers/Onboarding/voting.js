/**
 *
 * Onboarding
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { compose } from 'redux';
import { Popover, List, Avatar, Button, Skeleton, Tabs ,Table,Rate ,Tooltip} from 'antd';
import KpnLongText from './components/kpnLongText';
import KpnSmallText from './components/kpnSmallText';
import KpnSelect from './components/kpnSelect';
import KpnTextArea from './components/kpnTextArea';

import './ideaOnboardingFormStyles.css';
import { backend } from '../../utils/config';

const { apptoken } = backend;

const votesUrl = backend.beUrl + backend.votes;

class Votingform extends React.Component {
  constructor(props) {
    //     useInjectReducer({ key: 'onboarding', reducer });
    //     useInjectSaga({ key: 'onboarding', saga });
    super(props);
    this.state = {
      ideaTitle: null,
      ownerFirstName: null,
      ownerLastName: null,
      ownerEmail: null,
      ownerPhone: null,
      ownerValue: null,
      elevatorPitch: null,
      problem: null,
      orgValue: null,
      buttonDisabled: false, // button always available
      voteNow: false,
      vot1:"1",
      vot2:"1",
      vot3:"1",
      vot4:"1",
      vot5:"1",
      votComment:"",
      score:"",

    };
  }


  avatChar = (text) => {
    var avatChars = text ? text.charAt(0) :null ;
  return avatChars;
  }
  
  voteNow = () => {

    const {vot1,vot2,vot3,vot4,vot5} = this.state;
const scores = parseInt(vot1)+parseInt(vot2)+parseInt(vot3)+parseInt(vot4)+parseInt(vot5);


const vots = JSON.stringify({ Boportunity:vot1,
Seagment:vot2,
ProblemSolving:vot3,
KPNfit:vot4,
ticketFit:vot5});


    fetch(votesUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'X-DreamFactory-API-Key': apptoken,
        'X-DreamFactory-Session-Token': this.props.user.session_token,
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resource: [
         {
           idea_id: this.props.item.id,
           comment: this.state.votComment,
           voteData: vots,
           user_email:this.props.user.email,
           score:scores,

         },
        ],
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(assumptionData => {
        this.setState({voteNow:false})
        this.props.saveReload();

      })
      .catch(taskData => console.log(taskData));
 };



  render() {

    const {item} = this.props;
    console.log(this.props);


    return (

      <div className="votingForms">

        <div className="row">
          <div className="col col--12">
            <div className="leftForm">
              <div className="leftFormContent">
                <div >
                  <h2 className="content__title">{item.Title}</h2>
                </div>
                <div className="content__body">
                  <dl className="dl">
                    <KpnSmallText
                      title={"Idea owner"}
                      description={item.OwnerFirstName + " " + item.OwnerLastName}
                    />
                    <KpnSmallText
                      title="Email address"
                      description={item.OwnerEmail}
                    />
                    <KpnSmallText
                    title="Phone"
                    description={item.OwnerPhone}
                  />
                  </dl>
                </div>
                
                {item !== null && item.votes.length > 0 ?
                  <div className="row">
        
                  <div className="col col--4" >
                  <div className="row"><div> Ranking </div>:</div>
           
             {item && item.votes.map((vote) =>    
              <div key={vote.id}>
        
              <Tooltip placement="top" title={vote.user_email}>
              <Avatar style={{maxWidth:24, maxHeight:24}} >{this.avatChar(vote.user_email)}</Avatar>
        </Tooltip>
  
              <Rate allowClear={false}  defaultValue={parseInt(vote.score) / 5} />    </div>
              )}

                  </div>
                  </div>
            : <div></div> }

                <div className="content__header">
                  <h2 className="content__title">Idea specifications</h2>
                </div>
                <div className="content__body">
                  <dl className="dl">
      
                    <KpnSmallText
                      title="Idea code"
                      description={item.id}
                    />
                    <KpnLongText
                      title="Elevator Pitch"
                      description={item.ElevatorPitch}
                    />
        
                    <KpnLongText
                      title="Problem"
                      description={item.Problem}
                    />
                    <KpnLongText
                      title="KPN value"
                      description={item.orgValue}
                    />
                    <KpnLongText
                      title="Owner Value"
                      description={item.OwnerValue}
                    />
                  </dl>
                </div>
                {!this.state.voteNow 
                  && <button onClick={() => this.setState({voteNow:true})} className="kpnNotesFieldButton button">Vote</button>}
                 

              </div>
            </div>
          </div>

          <div className="col col--4">
            {this.state.voteNow
            && (
            <div className="rightForm">
              <div className="content__header">
                <h2 className="content__title">Voting</h2>
              </div>
              <div className="content__body">
                <dl className="dl">

             
                  <dt className="kpnSelectTitle">Business opportunity</dt>
                  <select onChange={(e) => this.setState({vot1:e.target.value})} className="kpnSelectSelector select">
                    <option hidden disabled > 1 - 5 </option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>


                  <dt className="kpnSelectTitle">Clear user segment</dt>
                  <select value={this.state.vot2} onChange={(e) => this.setState({vot2:e.target.value})} className="kpnSelectSelector select">
                    <option hidden disabled > 1 - 5 </option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>

                  <dt className="kpnSelectTitle">Problem Solving</dt>
                  <select value={this.state.vot3}  onChange={(e) => this.setState({vot3:e.target.value})} className="kpnSelectSelector select">
                    <option hidden disabled > 1 - 5 </option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
           
                  <dt className="kpnSelectTitle">KPN Fit</dt>
                  <select value={this.state.vot4}  onChange={(e) => this.setState({vot4:e.target.value})} className="kpnSelectSelector select">
                    <option hidden disabled > 1 - 5 </option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>

                  <dt className="kpnSelectTitle">Ticket Fit</dt>
                  <select value={this.state.vot5}  onChange={(e) => this.setState({vot5:e.target.value})} className="kpnSelectSelector select">
                    <option hidden disabled > 1 - 5 </option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>

                </dl>
              </div>
              <div className="content__body kpnNotesField">
                <dl className="dl">
                <div>
                <dt className="kpnTextAreaTitle">Comment</dt>
                <dd>
                  <textarea 
                  value={this.state.votComment} 
                  onChange={(e) => this.setState({votComment:e.target.value})}
                  className="kpnTextAreaDescription textarea">
           
                  </textarea>
                </dd>
              </div>
                  
         
                  <button onClick={this.voteNow}disabled={this.state.votComment.length < 5} className="kpnNotesFieldButton button">Vote</button>
                  {this.state.voteNow 
                    && <button onClick={() => this.setState({voteNow:false})} className="kpnNotesFieldButton button">Cancel</button>}
                </dl>
              </div>
            </div>
            )}

          </div>
        </div>
      </div>

    );
  }
}

Votingform.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.global.user,

  };
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Votingform);
