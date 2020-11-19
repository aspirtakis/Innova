/**
 *
 * Onboarding
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { sessionCheck } from 'containers/App/actions';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectOnboarding from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import KpnSmallInput from './components/kpnSmallInput';
import KpnLargeInput from './components/kpnLargeInput';
import { Popover, List, Avatar, Button, Skeleton, Tabs, Table, Rate, Tooltip } from 'antd';
import './ideaOnboardingFormStyles.css';
import Votes from './votes';

import { backend } from '../../utils/config';
import Onboardingform from './addForm';
import Votingform from './voting';
const { Column, ColumnGroup } = Table;

const { TabPane } = Tabs;

const { apptoken } = backend;
const onboardingUrl = backend.beUrl + backend.onboarding;
const tasksUrl = backend.beUrl + backend.tasks;

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

class Onboarding extends React.Component {
  constructor(props) {
    //     useInjectReducer({ key: 'onboarding', reducer });
    //     useInjectSaga({ key: 'onboarding', saga });
    super(props);
    this.state = {

      openAddform: false, // button always available
      list: [],
      selectedItem: null,
    };
  }


  componentDidMount() {

    //console.log(this.props.user);
    if (this.props.user && this.props.user.session_token.length > 0) {
      this.getData();
    }
    if (!this.props.user && !this.props.user.session_token.length > 0) {
      location.href = '/';
    }

  }

  closeandReload = () => {
    this.getData();
    this.setState({ openAddform: false });
    this.setState({ selectedItem: null });

  }

  getData = () => {
    this.props.dispatch(sessionCheck());
    fetch(onboardingUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-DreamFactory-API-Key': apptoken,
        'X-DreamFactory-Session-Token': this.props.user.session_token,
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then((taskData) => {
        const datas = taskData.resource;
        //console.log(datas);
        this.setState({ list: datas })
      })
      .catch(taskData => console.log(taskData));
  };


  addNewFunnelTask = values => {
    const data = this.state.selectedItem;
    const datastring = JSON.stringify(data);
    this.setState({ spinning: true });
    fetch(tasksUrl, {
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
            description: data.ElevatorPitch,
            asssignedUser: '1',
            projectname: data.Title,
            horizon: "H1",
            theme: "Other",
            status: "red",
            FunnelPhase: "backlog",
            funnel: "OTHER",
            coach: "NotSet",
            sponsor: "1ppl",
            spnsr: "NotSet",
            ideaData: datastring,
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
      .then(taskData => {

        this.setState({ spinning: false });
        this.archiveIdea();
      })
      .catch(taskData => this.setState({ spinning: false }));
  };

  archiveIdea = () => {
    const url4 = `${onboardingUrl}/${this.state.selectedItem.id}`;
    fetch(url4, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'X-DreamFactory-API-Key': apptoken,
        'X-DreamFactory-Session-Token': this.props.user.session_token,
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: "ARCHIVE",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then((taskData) => {
        this.getData();
        this.setState({ selectedItem: null })
        this.setState({ visible: false });
      })
      .catch(taskData => console.log(taskData));
  };


  avatChar = (text) => {
    var avatChars = text ? text.charAt(0) : null;
    return avatChars;
  }


  render() {
    const { openAddform } = this.state;
    const ideas = this.state.list.filter(idea => idea.status === "ACTIVE");
    console.log(this.state.selectedItem);



    const columns = [
      {
        title: 'Title',
        dataIndex: 'Title',
        key: 'Title',
      },


    ];




    return (

      <div>
        {!openAddform &&
          <div style={{ padding: 25 }}>
            <div className="row">
              <div className="col col--6" >

                <div className="table-toolbar">
                  <div className="table-toolbar__data">({ideas.length}) Ideas</div>
                  <div className="table-toolbar__action">
                    <div className="input-field">
                      <div className="input-field__input">
                        <input className="input" type="text" placeholder="Search keyword" />
                      </div>
                      <button className="input-field__action-button"><i className="ui-search"></i></button>
                    </div>
                    <button className="button" onClick={() => this.setState({ openAddform: true })}>Add new idea</button>
                  </div>
                </div>

                <Table rowKey={(record) => record.id} dataSource={ideas}>
                  <Column
                    title="Title"
                    key="Title"
                    render={(text, record) => (
                      <div onClick={() => this.setState({ selectedItem: record })} size="middle">
                        <span >{record.Title}</span>
                      </div>
                    )}
                  />
                </Table>
                {this.state.selectedItem !== null && this.state.selectedItem.votes.length > 0 ?
                  <div className="row">

                    <div className="col col--4" >
                      <div className="row"><div> Ranking </div>:</div>

                      {this.state.selectedItem && this.state.selectedItem.votes.map((vote) =>
                        <div key={vote.id}>

                          <Tooltip placement="top" title={vote.user_email}>
                            <Avatar style={{ maxWidth: 24, maxHeight: 24 }} >{this.avatChar(vote.user_email)}</Avatar>
                          </Tooltip>


                          <Rate allowClear={false} defaultValue={parseInt(vote.score) / 5} />    </div>
                      )}

                    </div>

                    <div className="col col--4" >
                      <div className="row"><div> Status</div>:</div>
                      <Rate defaultValue={3} />
                      <br />
                      <Rate allowClear={false} defaultValue={3} />
                      <br />
                      <Rate allowClear={false} defaultValue={6} />
                    </div>

                    <div className="col col--4" >
                      <div className="row"><div>Sinds</div>:</div>
                      <Rate defaultValue={3} />
                      <br />
                      <Rate allowClear={false} defaultValue={3} />
                      <br />
                      <Rate allowClear={false} defaultValue={6} />
                    </div>
                  </div>
                  : <div></div>}




            </div>
            <div className="col col--6" >


              {this.state.selectedItem &&

                <div>

                  <div className="table-toolbar">

                    <div className="table-toolbar__action">

                      <Popover
                        content={<div>
                          <div>You are trasfering Idea to Funnel - Idea Will be archived and will not be visible anymore </div> <br />
                          <div>Are you sure ?</div>
                          <button onClick={this.addNewFunnelTask}>Send</button>
                          <a onClick={() => this.setState({ visible: false })}>Cancel</a>
                        </div>
                        }
                        title={"Idea " + this.state.selectedItem.Title}
                        trigger="click"
                        visible={this.state.visible}
                        onVisibleChange={this.handleVisibleChange}
                      >
                        <button style={{ maxWidth: 100 }} className="button button--secondary" onClick={() => this.setState({ visible: true })}>Approve</button>
                      </Popover>


                      <Popover
                        content={<div>
                          <div>Idea Will be archived and will not be visible anymore </div> <br />
                          <div>Are you sure ?</div>
                          <button onClick={this.archiveIdea}>Archive</button>
                          <a onClick={() => this.setState({ visibleArch: false })}>Cancel</a>
                        </div>
                        }
                        title={"Idea " + this.state.selectedItem.Title}
                        trigger="click"
                        visible={this.state.visibleArch}
                        onVisibleChange={this.handleVisibleChange}
                      >
                        <button style={{ maxWidth: 100 }} className="button button--secondary" onClick={() => this.setState({ visibleArch: true })}>Reject</button>
                      </Popover>


                    </div>
                  </div>

                  <Tabs tabBarStyle={{ borderBlockColor: "#009900", color: 'green' }} >
                    <TabPane tab={<span className="titlesTab"> General</span>} key="1">










                      {this.state.selectedItem && <Votingform saveReload={this.closeandReload} item={this.state.selectedItem}></Votingform>}



                    </TabPane>

                    <TabPane tab={<span className="titlesTab">Votes</span>} key="2">
                      <div>
                        <Votes item={this.state.selectedItem}></Votes>
                      </div>
                    </TabPane>
                    <TabPane tab={<span className="titlesTab">PO Actions</span>} key="3">
                      <div>
                        <br />
         Here you can approve of an idea and send it to the funnel!<br />
                        <br />
                        <dl className="dl">
                          <dt>Idea name</dt>
                          <dd>{this.state.selectedItem.Title}</dd>
                          <dt>Idea owner</dt>
                          <dd>{this.state.selectedItem.OwnerFirstName + " " + this.state.selectedItem.OwnerLastName}</dd>
                          <dt>Elevator pitch</dt>
                          <dd>{this.state.selectedItem.ElevatorPitch}</dd>
                        </dl>
                        <br />
                        <Popover
                          content={<div>
                            <div>
                              You are transferring this idea to the funnel.<br />
                            This idea will be archived and will not be visible anymore.</div> <br />
                            <div>Are you sure ?</div><br />
                            <button className="button button--link" onClick={this.addNewFunnelTask}>Send</button>
                            <button className="button" onClick={() => this.setState({ visible: false })}>Cancel</button>
                          </div>
                          }
                          title={"Idea " + this.state.selectedItem.Title}
                          trigger="click"
                          visible={this.state.visible}
                          onVisibleChange={this.handleVisibleChange}
                        >
                          <button className="button" onClick={() => this.setState({ visible: true })}>Approve idea</button>
                        </Popover>
                      </div>
                    </TabPane>
                  </Tabs>
                </div>
              }
            </div>
          </div>
          </div>

        }
        { openAddform && <Onboardingform closeForm={this.closeandReload} /> }

      </div >

    );
  }
}

Onboarding.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.global.user,
    users: state.global.users,
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
)(Onboarding);
