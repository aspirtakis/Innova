/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import moment from 'moment';



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
                              <div style={{ backgroundColor: '#ECEFEC' }} className="card__header">
                                  <h1 style={styles.cardTitle} className="h2 h2--strong">{taskproblem.projectname}</h1>
                              </div>
                              <div className="card__body">
                                  <div style={styles.cardStatus} className="row">
                                      <div className="col col--8">
                                          <div
                                              className="one-edge-shadow corners2"
                                              style={{
                                                  color: taskproblem.status === 'yellow' ? 'black' : 'white',
                                                  backgroundColor: taskproblem.status,
                                              }}
                                          >
                                              {this.fixStatus(taskproblem.status)}
                                          </div>
                                      </div>
                                      <div className="col col--4 ">
                                          <div
                                              className="corners2"
                                              style={{
                                                  color: 'white',
                                                  fontSize: 11,

                                                  backgroundColor: 'gray',
                                              }}
                                          >
                                              {taskproblem.horizon}
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div className="card__body">
                                  <dl style={{ fontSize: 11 }} className="dl">
                                      <div className="row">
                                          <div className="col col--7">
                                              <dt>PO</dt>
                                              <dd>{taskproblem.leader}</dd>
                                          </div>
                                          <div className="col col--5">
                                              <dt>Coach</dt>
                                              <dd>{taskproblem.coach}</dd>
                                          </div>
                 

                                      </div>
                                      {taskproblem.nexStageGate &&
                                      <div  style={{ paddingLeft:5 }} className="row">
                                    
                                    <dt>SGDate: </dt>
                                    <dd>{moment(taskproblem.nexStageGate).format("MM/DD/YYYY")}</dd>
                                </div>
                                      }
                                  </dl>
                              </div>

                


                          </div>
                      </div>
                  </Container>
              )}
          </Draggable>
      );
  }
}
