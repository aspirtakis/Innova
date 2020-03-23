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

import { FaBeer ,FaBullhorn,FaRoad,FaRegClock
} from 'react-icons/fa';
import Tooltip from '@material-ui/core/Tooltip';




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

                  <Tooltip placement="top" title={taskproblem.projectname}>
                      <div onClick={() => this.props.openEdit(taskproblem)}>
                          <div style= {{margin: 2, border: '3px solid lightgray', borderRadius: 8}} className="card">
                         
                              <div className="card__body" style={{padding:6}}>
                                  <div className="row">
                                  <div  style={{ whiteSpace: 'nowrap' }}  className="col col--10">
                                  <h1 style={styles.cardTitle} >{this.truncated(taskproblem.projectname,12)}</h1>
                                  </div>
                                  <div  className="col col--2" >

                                  <div style={styles.cardStatus2} className="row">

                                  {taskproblem.status === 'green' && <SentimentVerySatisfiedIcon style= {{color: 'green'}}></SentimentVerySatisfiedIcon>}
                                  {taskproblem.status === 'yellow' && <SentimentSatisfiedIcon style= {{marginRight:3 ,color: 'orange'}}></SentimentSatisfiedIcon>}
                                  {taskproblem.status === 'orange' && <SentimentVeryDissatisfiedIcon></SentimentVeryDissatisfiedIcon>}
                                  {taskproblem.status === 'red' && <SentimentVeryDissatisfiedIcon style= {{marginRight:3 ,color: 'red'}} ></SentimentVeryDissatisfiedIcon>}
                                  </div>
                                  </div>

                                  <div className="col col--12">
                                  <h1 style={styles.cardTitleleader} >{taskproblem.leader}</h1>
                                 
                                  </div>


        
                                  </div>
                      
                                  <div style={{ color:'gray', marginTop:15, flexWrap: 'nowrap'}} className="row">
                            <div style={{minWidth:50 ,marginLeft:10}}  className="col col--4">
                                  <div style={styles.cardTools} className="row">
                                  <FaRegClock style={styles.cardToolsIcons}></FaRegClock>
                                  <h1 style={styles.cardToolsText}>{this.getTime()}</h1>
                             </div>

                                  </div>

                                  <div style={{minWidth:70 }} className="col col--4">
     
                                  <div className="row">
                                  <FaBullhorn style={styles.cardToolsIcons}/>
                                  <h1 style={styles.cardToolsText}>{taskproblem.coach}</h1>
                  
                          
                             </div>
                                  </div>

                                  <div style={{maxWidth:42 }} className="col col--4">
     
                                  <div style={styles.cardTools} className="row">
                                  <FaRoad style={styles.cardToolsIcons}></FaRoad>
                                  <h1 style={styles.cardToolsText} >{taskproblem.horizon}</h1>
                               
                               
                             </div>
                                  </div>
                                  </div>



                                  

                              </div>
                          </div>
                      </div>

                      </Tooltip>
                  </Container>
              )}
          </Draggable>
      );
  }
}
