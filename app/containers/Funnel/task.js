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
                  <div style={styles.cardTitle}>{taskproblem.projectname}</div>
                    <p>{this.fixStatus(taskproblem.status)}</p>
                    <p>{taskproblem.horizon}</p>
                    <p>Members:{taskproblem.sponsor}</p>
                    <p>Coach:{taskproblem.coach}</p>
                    <p>PO:{taskproblem.leader}</p>
                  </div>
                
                  <div className="backside">

                  <p>{taskproblem.description}</p>
                  <p>{taskproblem.funnel}</p>
                  <p>Sponsor:{taskproblem.spnsr}</p>
                  {moment(taskproblem.updateDate).fromNow()}

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



