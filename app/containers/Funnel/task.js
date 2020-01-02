/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './fun.css';
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

                  <div style={styles.mainCard}>
                  <div style={styles.cardTitle}>{taskproblem.projectname}</div>
                
                  <div style={styles.cardStatus}>
                  <Col  sm={8}>
                  <div  style={{
                   color:taskproblem.status === 'yellow' ? 'black' : 'white', 
                   borderRadius:'20%',
                   backgroundColor:taskproblem.status}} >
                  {this.fixStatus(taskproblem.status)}
                  </div>
                  </Col>
                  <Col sm={4}>
                  <div  style={{
                    color:'white', 
                    fontSize: 10,
                    padding:1,
                    borderRadius:'35%',
                    backgroundColor:'gray'}} >
                    {taskproblem.horizon}
                   </div>
                  </Col>
                  </div>
                  <div style={styles.cardR}>PO:{taskproblem.leader}</div>
                  <div style={styles.cardR}>Coach:{taskproblem.coach}</div>
                  <div style={styles.cardFooter}>
                  <div>
                       <Avatar
                         size={20}
                         src="https://cdn1.iconfinder.com/data/icons/ui-colored-3-of-3/100/UI_3__23-512.png"
                         style={{
                           margin: 5,
                           marginRight: 5,
                         }}
                       >
                       </Avatar>
                       {taskproblem.sponsor}
                  </div>

                  <div>
                  <Avatar
                  size={20}
                  src="https://retohercules.com/images/schedule-7.png"
                  style={{
                    margin: 5,
                    marginRight: 5,
                  }}
                >
                </Avatar>
                {taskproblem.sponsor}
                  </div>

                  <div>
                  <Avatar
                  size={20}
                  src="https://retohercules.com/images/schedule-7.png"
                  style={{
                    margin: 5,
                    marginRight: 5,
                  }}
                >
                </Avatar>
                {taskproblem.sponsor}
                  </div>
        
                  <div>
                  <Avatar
                  size={20}
                  src="https://retohercules.com/images/schedule-7.png"
                  style={{
                    margin: 5,
                    marginRight: 5,
                  }}
                >
                </Avatar>
                {taskproblem.sponsor}
                  </div>
                  </div>
                  </div>
                  </div>
                  <div className="backside">
                  <div style={styles.backCard}>
                  <div style={styles.cardTitle}>{taskproblem.funnel}</div>
                  <div style={styles.cardR}>{taskproblem.title}</div>
                  <div style={styles.cardFooter}> {moment(taskproblem.updateDate).fromNow()}</div>
                  </div>
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



