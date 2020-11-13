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
import { List, Avatar, Button, Skeleton } from 'antd';
import './ideaOnboardingFormStyles.css';

import { backend } from '../../utils/config';
import Onboardingform from './addForm';
import Votingform from './voting';

const { apptoken } = backend;
const onboardingUrl = backend.beUrl + backend.onboarding;

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

  render() {
    const { openAddform } = this.state;



    return (

      <div>


      
        {!openAddform && 

  


          <div style={{padding:25}}>
          <div class="row">
          <button onClick={() => this.setState({ openAddform: true })}>Add New Idea</button>

        </div>

          <div class="row"> 
          <div class="col col--4" >

          <List
          style={{maxWidth:500}}
          itemLayout="vertical"
          size="large"
          dataSource={this.state.list}
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
                onClick={() => this.setState({selectedItem:item})} 
              />

              <button>Vote</button>
              <button>Innovate</button>
            </List.Item>
          )}
        />
          
         </div>
         <div class="col col--8" >
         {this.state.selectedItem && <Votingform  item={this.state.selectedItem}></Votingform>} 
          </div>
         </div>


</div>
          
   }
        {openAddform && <Onboardingform closeForm={() => this.setState({ openAddform: false })} />}
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
