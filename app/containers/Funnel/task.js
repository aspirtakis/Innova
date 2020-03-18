/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import moment from 'moment';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import LocalParkingIcon from '@material-ui/icons/LocalParking'


import { styles } from './funnel_styles';

const Container = styled.div`
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDragDisabled
        ? 'lightgrey'
        : props.isDragging
            ? '#009900'
            : 'white')};
`;

export default class Task extends React.Component {
  fixStatus = (status) => {
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

  getTime = () => {
// Code goes here
//console.clear();
// var now = moment(new Date()); //todays date
// var end = moment(this.props.task.birthonproblem); // another date
// var duration = moment.duration(now.diff(end));
// var days = duration.asDays();
// console.log(days)
// var n = days.toFixed();

const n = moment(this.props.task.birthonproblem).fromNow();
return n;

  }

  render() {
      const isDragDisabled = this.props.task.task_id === '1' || this.props.userRole === 'Tv' || this.props.userRole === "Viewer";
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
                          <div className="card">
                         
                              <div className="card__body">
             
                                  <div  className="row">
                                  <h1 style={styles.cardTitle} >{taskproblem.projectname}</h1>
                        
                                 {taskproblem.status === 'green' && <SentimentVerySatisfiedIcon style= {{color: 'green'}}></SentimentVerySatisfiedIcon>}
                                 {taskproblem.status === 'yellow' && <SentimentSatisfiedIcon ></SentimentSatisfiedIcon>}
                                 {taskproblem.status === 'orange' && <SentimentSatisfiedIcon style= {{color: 'orange'}}></SentimentSatisfiedIcon>}
                                 {taskproblem.status === 'red' && <SentimentVeryDissatisfiedIcon style= {{color: 'red'}} ></SentimentVeryDissatisfiedIcon>}
                                  </div>
                                  <div  className="row">
                                  <h2 style={styles.cardTitle} >{taskproblem.leader}</h2>
                                  </div>
                                  <div className="row">
                                  {this.getTime()}
                                   <dd>{taskproblem.coach}</dd>
                                   {taskproblem.horizon}
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
