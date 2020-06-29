/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import {
  Select, Spin, Button, Icon, Collapse,
} from 'antd';
import Task from './task';

import { styles } from './funnel_styles';

const Container = styled.div`
  display: flex;
  width:100%;
  min-height: 780px;
  flex-direction: column;
  height: calc(100vh - 8.6rem);
  background-color: ${(props) => (props.isDraggingOver ? 'green' : '#F3F3F3')}

`;

const TaskList = styled.div`
  padding: 1px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? 'green' : '#F3F3F3')}
  max-height: calc(100vh - 11.8rem);
  height: calc(100vh - 8.6rem);
  overflow-y: auto;
`;

export default class Column extends React.Component {
  render() {
    const { userRole } = this.props;

    return (
      <Container>
        <div style={styles.ColTitles}>
          <div className="title-bar__title">{this.props.column.title}(5)</div>
        </div>
        <Droppable droppableId={this.props.column.id} type="TASK">
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.tasks.map((task, index) => (
                <Task
                  userRole={userRole}
                  openEdit={this.props.openEdit}
                  key={task.task_id}
                  task={task}
                  index={index}
                />
              ))}
              {provided.placeholder}
              {(userRole === 'DashboardCoach' || userRole === 'Coach' || userRole === 'BO' || userRole === 'Manager')
              && (
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'black',
                  margin: 'auto',
                  backgroundColor: 'lightgray',
                  minWidth: '100%',
                  fontSize: 14,
                }}
                id="music"
                className="nav"
                onClick={() => this.props.addNewTask()}
              >
                <Icon style={{ marginRight: 10 }} type="plus-circle" />
                Add Task
              </button>
              )}
            </TaskList>
          )}
        </Droppable>
      </Container>
    );
  }
}
