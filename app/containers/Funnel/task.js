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
import Avatar from '@material-ui/core/Avatar';
import { FaBeer ,FaBullhorn,FaRoad,FaRegClock
} from 'react-icons/fa';
import Tooltip from '@material-ui/core/Tooltip';
import './funnel.css';
import dots from '../../images/dots.png';




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

//console.clear();
var now = moment(new Date()); //todays date
var end = moment(this.props.task.birthonproblem); // another date
var duration = moment.duration(now.diff(end));
var days = duration.asDays();
//console.log(days)
//var n = days.toFixed();

const n = moment(this.props.task.birthonproblem).fromNow(true);
return n;

  }
  

 truncated = (source, size) => {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }

  render() {
      const isDragDisabled = this.props.task.task_id === '1' || this.props.userRole === 'Tv' || this.props.userRole === "Viewer";
      const taskproblem = this.props.task;
      var string = taskproblem.projectname;

console.log(taskproblem);
var po = taskproblem.cardpo.charAt(0);
var coach = taskproblem.coach.charAt(0);




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
                         
                              <div  style={{padding:6}}>
                                  <div className="row">
                                  <div  className="col col--1" >
                                  <div style={{ marginLeft:1, }} className="row">
                                  {taskproblem.status === 'green' && <SentimentVerySatisfiedIcon style= {{maxWidth:15, color: 'green'}}></SentimentVerySatisfiedIcon>}
                                  {taskproblem.status === 'yellow' && <SentimentSatisfiedIcon style= {{maxWidth:15, color: 'orange'}}></SentimentSatisfiedIcon>}
                                  {taskproblem.status === 'orange' && <SentimentVeryDissatisfiedIcon style= {{maxWidth:15}}></SentimentVeryDissatisfiedIcon>}
                                  {taskproblem.status === 'red' && <SentimentVeryDissatisfiedIcon style= {{maxWidth:15, color: 'red'}} ></SentimentVeryDissatisfiedIcon>}
                                  </div>
                                  </div>
                                  <div className="col col--8">
                                  <Tooltip placement="top" title={taskproblem.projectname}>
                                  <h3 className="titel">{this.truncated(taskproblem.projectname,10)}</h3>
                                  </Tooltip>
                                  </div>
                                  <div  className="col col--2">
                                  <img src={dots}></img>
                                  </div>
                                  </div>



                                  <div style={{ color:'gray', marginTop:10,}} className="row">
                                  <div className="col col--12 oih-fit"  >{taskproblem.theme}
                                  </div>
                    
                                  </div>

                                  <div style={{ color:'gray', marginTop:10,}} className="row">
                                  <div className="col col--12 experiments"  >4 Experiments | 10 Days
                                  </div>
                    
                                  </div>

                      
                                  <div style={{ color:'gray', marginTop:15, flexWrap: 'nowrap'}} className="row">
                                  <div  style={{maxWidth:24}} className="col col--4">
                                  <Tooltip placement="top" title={taskproblem.cardpo}>
                                  <Avatar style={{maxWidth:24, maxHeight:24}} >{po}</Avatar>
                         </Tooltip>
                                  </div>
                                  <div style={{maxWidth:39}} className="col col--4">
                                  <Tooltip placement="top" title={taskproblem.coach}>
                                  <Avatar style={{maxWidth:24, maxHeight:24}} >{coach}</Avatar>
                         </Tooltip>
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
