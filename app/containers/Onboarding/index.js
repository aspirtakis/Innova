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
        this.changeIdeaStatus("ARCHIVE");
      })
      .catch(taskData => this.setState({ spinning: false }));
  };

  changeIdeaStatus = (status) => {
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
        status: status,
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
    const ideas = this.state.list.filter(idea => idea.status === "OPEN");
    const rankedideas = this.state.list.filter(idea => idea.status === "RANKED");
    const completeideas = this.state.list.filter(idea => idea.status === "COMPLETE");
    const archivedideas = this.state.list.filter(idea => idea.status === "ARCHIVE");
    console.log(this.state.selectedItem);

    return (

      <div>
        {!openAddform &&
          <div style={{ padding: 25 }}>
            <div className="row">
              <div className="col col--6" >
              <div className="table-toolbar">
              <div className="table-toolbar__data">({this.state.list.length}) Ideas</div>
              <div className="table-toolbar__action">

                <button className="button" onClick={() => this.setState({ openAddform: true })}>Add new idea</button>
              </div>
            </div>

              <Tabs tabBarStyle={{ borderBlockColor: "#009900", color: 'green' }} >
              <TabPane tab={<span className="titlesTab"> Inbox ({ideas.length})</span>} key="1">
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

              <Column
              title="status"
              key="status"
              render={(text, record) => (
                <div size="middle">
                  <span >{record.status}</span>
                </div>
              )}
            />
            <Column
            title="Created"
            key="created"
            render={(text, record) => (
              <div size="middle">
                <span >{record.created}</span>
              </div>
            )}
          />
            </Table>
              </TabPane>

              <TabPane tab={<span className="titlesTab"> Vote ({completeideas.length})</span>} key="2">


              <Table rowKey={(record) => record.id} dataSource={completeideas}>
              <Column
                title="Title"
                key="Title"
                render={(text, record) => (
                  <div onClick={() => this.setState({ selectedItem: record })} size="middle">
                    <span >{record.Title}</span>
                  </div>
                )}
              />
              <Column
              title="status"
              key="status"
              render={(text, record) => (
                <div size="middle">
                  <span >{record.status}</span>
                </div>
              )}
            />

            </Table>
              
              
              </TabPane>

              

              <TabPane tab={<span className="titlesTab"> Backlog ({rankedideas.length})</span>} key="3">


              <Table rowKey={(record) => record.id} dataSource={rankedideas}>
              <Column
                title="Title"
                key="Title"
                render={(text, record) => (
                  <div onClick={() => this.setState({ selectedItem: record })} size="middle">
                    <span >{record.Title}</span>
                  </div>
                )}
              />
              <Column
              title="status"
              key="status"
              render={(text, record) => (
                <div size="middle">
                  <span >{record.status}</span>
                </div>
              )}
            />

            </Table>
              
              
              </TabPane>


              <TabPane tab={<span className="titlesTab"> Graveyard ({archivedideas.length})</span>} key="4">


              <Table rowKey={(record) => record.id} dataSource={archivedideas}>
              <Column
                title="Title"
                key="Title"
                render={(text, record) => (
                  <div onClick={() => this.setState({ selectedItem: record })} size="middle">
                    <span >{record.Title}</span>
                  </div>
                )}
              />
              <Column
              title="status"
              key="status"
              render={(text, record) => (
                <div size="middle">
                  <span >{record.status}</span>
                </div>
              )}
            />

            </Table>
              
              
              </TabPane>
              </Tabs>
            </div>

            <div className="col col--6" >


              {this.state.selectedItem &&

                <div>

                  {/* <div className="table-toolbar">

                    <div className="table-toolbar__action">

                      <Popover
                        content={<div>
                          <div>You are transferring this idea to the funnel - idea will be archived and will not be visible anymore.</div> <br />
                          <div>Are you sure?</div>
                          <button onClick={this.addNewFunnelTask}>Send</button>
                          <a onClick={() => this.setState({ visible: false })}>Cancel</a>
                        </div>
                        }
                        title={"Idea " + this.state.selectedItem.Title}
                        trigger="click"
                        visible={this.state.visible}
                        onVisibleChange={this.handleVisibleChange}
                      >
                      {this.state.selectedItem.status === "RANKED" && 
                        <button style={{ maxWidth: 100 }} className="button button--secondary" onClick={() => this.setState({ visible: true })}>Approve</button>
                     
                         }   </Popover>

                      <Popover
                        content={<div>
                          <div>Idea will be archived and will not be visible anymore.</div> <br />
                          <div>Are you sure?</div>
                          <button onClick={() => this.changeIdeaStatus("ARCHIVE")}>Archive</button>
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

                      <Popover
                      content={<div>
                        <div>Idea will be completed and will be made ready to be ranked.</div> <br />
                        <div>Are you sure?</div>
                        <button onClick={() => this.changeIdeaStatus("COMPLETE")}>Complete</button>
                        <a onClick={() => this.setState({ visibleComplete: false })}>Cancel</a>
                      </div>
                      }
                      title={"Idea " + this.state.selectedItem.Title}
                      trigger="click"
                      visible={this.state.visibleComplete}
                      onVisibleChange={this.handleVisibleChange}
                    >
                    {this.state.selectedItem.status === "OPEN" && 
                      <button style={{ maxWidth: 100 }} className="button button--secondary" onClick={() => this.setState({ visibleComplete: true })}>Complete</button>
                    }
                      </Popover>

                    </div>
                  </div> */}

                      {this.state.selectedItem && <Votingform completeIdea={this.changeIdeaStatus} saveReload={this.closeandReload} item={this.state.selectedItem}></Votingform>}

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
