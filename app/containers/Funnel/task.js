/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './fun.css';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import { Avatar, Icon, Collapse } from 'antd';
import { styles } from './funnel_styles';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 2px;
  margin-bottom: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props =>
    props.isDragDisabled
      ? 'lightgrey'
      : props.isDragging
      ? 'lightgreen'
      : 'white'};
`;

export default class Task extends React.Component {
  fixStatus = status => {
    if (status === 'green') {
      return 'PRGRESSING';
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
    console.log('CARD', this.props);

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
            innerRef={provided.innerRef}
            isDragging={snapshot.isDragging}
            isDragDisabled={isDragDisabled}
          >
            <Paper onDoubleClick={() => this.props.openEdit(taskproblem)}>
            <div style={styles.cardTitle}>{taskproblem.theme}</div>
              <div style={styles.cardTitle2}>{taskproblem.projectname}</div>
       
              <Row>
                <Col
                  style={{
                    paddingRight: 10,
                  }}
                  sm={8}
                >
                  <div
                    style={{
                      minWidth: 90,
                      fontWeight: 'bolder',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: 3,
                      fontSize: 11,
                      color:
                        taskproblem.status === 'yellow' ? 'black' : 'white',
                      backgroundColor: taskproblem.status,
                      textAlign: 'center',
                    }}
                  >
                    {this.fixStatus(taskproblem.status)}
                  </div>
                </Col>
                <Col sm={4}>
                  <div
                    style={{
                      paddingLeft: 5,
                      color: 'white',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'gray',
                      fontWeight: 'bolder',
                      fontSize: 10,
                      minHeight: 18,
                      maxHeight: 18,
                      marginTop: 3,
                      minWidth: '100%',
                    }}
                  >
                    {taskproblem.horizon}
                  </div>
                </Col>
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
                  {`${taskproblem.title.substring(0, 12)}...`}
                </div>
              </Row>


              <Row style={{ marginLeft: 0.5 }}>
                <Col >
                  <div
                    style={{
                      fontWeight: 'bold',
                      maxWidth: '90%',
                      padding: 1,
                      color:'black',
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
                    color:'black',
                    fontSize:12,
                  }}
                >
                  PO:{`${taskproblem.leader.substring(0, 10)}...`}
                </div>
              </Row>

              <Row style={{ marginLeft: 3, marginBottom: 2 }}>
                <div
                  style={{
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    alignItems: 'center',
                    maxWidth: '90%',
                    fontSize: 12,
                    marginRight: 13,
                    color:'green',
                  }}
                >
                  <Avatar
                    size={25}
                    src="https://retohercules.com/images/schedule-7.png"
                    style={{
                      margin: 5,
                      marginRight:5,
                    }}
                  />
                  {moment(taskproblem.createDate).fromNow()}
                </div>
              </Row>



            </Paper>
          </Container>
        )}
      </Draggable>
    );
  }
}
