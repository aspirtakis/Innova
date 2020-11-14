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
import { Popover,List, Avatar, Button, Skeleton,Tabs } from 'antd';
import './ideaOnboardingFormStyles.css';
import Votes from './votes';

import { backend } from '../../utils/config';
import Onboardingform from './addForm';
import Votingform from './voting';

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
      list:[],
      selectedItem:null,
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

closeandReload = () =>{

  this.setState({ openAddform: false });
  this.getData();
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
             this.setState({list:datas})
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
          status:"ARCHIVE",
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
            this.setState({selectedItem:null})
            this.setState({visible:false});
        })
        .catch(taskData => console.log(taskData));
};

  render() {
    const { openAddform } = this.state;
    const ideas = this.state.list.filter(idea => idea.status === "ACTIVE");




    return (

      <div>



      
        {!openAddform && 
          <div style={{padding:25}}>
          <div className="row">

          <button onClick={() => this.setState({openAddform:true})}>Add New Idea</button>

        </div>

          <div className="row"> 
          <div className="col col--4" >

          <List
          style={{maxWidth:500}}
          itemLayout="vertical"
          size="large"
          dataSource={ideas}
          footer={
            <div>
              <b>Backlog Ideas</b> 
            </div>
          }
          renderItem={item => (
            <List.Item
              key={item.Title}
              extra={
                <img
                onClick={() => this.setState({selectedItem:item})}
                  width={272}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.Title}</a>}
                description={item.OwnerFirstName}
    
              />

              <button   >Vote</button>
              <button>Innovate</button>
            </List.Item>
          )}
        />
          
         </div>
         <div className="col col--8" >

{this.state.selectedItem && 
         <Tabs tabBarStyle={{borderBlockColor:"#009900", color:'green'}} >
         <TabPane  tab={<span className="titlesTab"> General</span>} key="1">
         {this.state.selectedItem && <Votingform  item={this.state.selectedItem}></Votingform>} 
         </TabPane>

         <TabPane  tab={<span className="titlesTab" >Votes</span>} key="2">
         <div>
         <Votes item={this.state.selectedItem}></Votes>
       </div>
  
         
         </TabPane>
         <TabPane  tab={<span className="titlesTab" >Actions</span>} key="3">
         <div>
         COACH AND PO AREA  <br/>
         Here You can transform IDEA to Innovation Card <br/>
         <br/>
         <div>{this.state.selectedItem.Title}</div>
         <div>{this.state.selectedItem.OwnerFirstName}</div>
         <div>{this.state.selectedItem.ElevatorPitch}</div>
        <br/>
         <Popover
         content={<div>
          <div>You are trasfering Idea to Funnel - Idea Will be archived and will not be visible anymore </div> <br/>
          <div>Are you sure ?</div>
          <button onClick={this.addNewFunnelTask}>Send</button>
          <a onClick={() => this.setState({visible:false})}>Cancel</a>
          </div>
         }
         title={"Idea "+this.state.selectedItem.Title }
         trigger="click"
         visible={this.state.visible}
         onVisibleChange={this.handleVisibleChange}
       >
       <Button onClick={() => this.setState({visible:true})}>Approve and send to  funnel Backlog</Button>
       </Popover>
   
       </div>
  
         
         </TabPane>
         </Tabs>
        }

         
          </div>
         </div>


</div>
          
   }
        {openAddform && <Onboardingform closeForm={this.closeandReload} />}

      </div>

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
