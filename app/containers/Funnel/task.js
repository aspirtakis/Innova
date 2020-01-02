/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './fun.css';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import './card.css';


import { Avatar, Icon } from 'antd';
import { styles } from './funnel_styles';

const Container = styled.div`
  transition: background-color 0.2s ease;
  background-color: ${props =>
    props.isDragDisabled
      ? 'lightgrey'
      : props.isDragging
      ? '#009900'
      : 'white'};
`;

export default class Task extends React.Component {
  fixStatus = status => {
    if (status === 'green') {
      return 'PROGRESSING';
    }
    if (status === 'yellow') {
      return 'IMPEDIMENT';
    }
    if (status === 'orange') {
      return 'PARKED';
    }
    if (status === 'red') {
      return 'STOPPED';
    }
  };

  render() {
    const isDragDisabled = this.props.task.task_id === '1';
    const taskproblem = this.props.task;

    return (
      <Draggable
        draggableId={this.props.task.task_id}
        index={this.props.index}
        isDragDisabled={isDragDisabled}
      >
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            isDragDisabled={isDragDisabled}
          >
<div onClick={() => this.props.openEdit(taskproblem)}>
          <div className="image-flip" ontouchstart="this.classNameList.toggle('hover');">
              <div className="mainflip">

                  <div className="frontside">


   
            <div style={styles.cardTitle}>{taskproblem.projectname}</div>
              <Row>
                <Col
                  sm={8}
                >
                  <div
                    style={{
                      minWidth: '40%',
                      maxWidth: '80%',
                      fontWeight: 'bolder',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: 3,
                      fontSize: 11,
                      minHeight:20,
                      color:
                        taskproblem.status === 'yellow' ? 'black' : 'white',
                      backgroundColor: taskproblem.status,
                      textAlign: 'center',
                    }}
                  >
                    {this.fixStatus(taskproblem.status)}
                  </div>
                </Col>
                <div sm={4} 
                style={{
                  paddingLeft: 5,
                  flexDirection: 'column',
                  color: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'gray',
                  fontWeight: 'bolder',
                  fontSize: 10,
                  marginTop: 3,
                  minHeight:20,
                  minWidth:25,
                  borderRadius: '50%',
                }}>

                    <div style={{marginTop:3}}>{taskproblem.horizon}</div>
         
                </div>
              </Row>


              <Row style={{ marginLeft: 3 }}>
                <div
                  style={{
                    fontWeight: 'bolder',
                    maxWidth: '90%',
                    padding: 3,
                    fontSize: 14,
                    color: 'black',
                  }}
                >
    
                </div>
              </Row>

              <Row style={{ marginLeft: 0.5 }}>
                <Col>
                  <div
                    style={{
                      fontWeight: 'bold',
                      maxWidth: '90%',
                      padding: 1,
                      color: 'black',
                      fontSize: 12,
                    }}
                  >
                    <Icon
                      style={{ fontSize: '20px', color: '#08c' }}
                      type="usergroup-add"
                    />
                    {taskproblem.sponsor}
                  </div>
                </Col>

                <Col>
                  <div
                    style={{
                      fontWeight: 'bold',
                      maxWidth: '90%',
                      padding: 3,
                      fontSize: 12,
                      minWidth: 50,
                    }}
                  >
                    <Icon
                      style={{ fontSize: '20px', color: '#08c' }}
                      type="user"
                    />
                    {taskproblem.coach}
                  </div>
                </Col>
              </Row>

              <Row style={{ marginLeft: 3 }}>
                <div
                  style={{
                    fontWeight: 'bold',
                    maxWidth: '90%',
                    padding: 5,
                    color: 'black',
                    fontSize: 12,
                  }}
                >
                  PO:{taskproblem.leader}
                </div>
              </Row>



                  
                  </div>
                

                  <div className="backside">

                  <Row style={{ marginLeft: 3, marginBottom: 2 }}>
                  <div
                    style={{
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      alignItems: 'center',
                      maxWidth: '90%',
                      fontSize: 12,
                      marginRight: 13,
                      color: 'green',
                    }}
                  >
                    <Avatar
                      size={25}
                      src="https://retohercules.com/images/schedule-7.png"
                      style={{
                        margin: 5,
                        marginRight: 5,
                      }}
                    />
                    {moment(taskproblem.updateDate).fromNow()}
                  </div>
                </Row>


                  </div>
              </div>
          </div>
          </div>
          </Container>
        )}
      </Draggable>
    );
  }
}



