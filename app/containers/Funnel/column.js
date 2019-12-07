/* eslint-disable react/button-has-type */
import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Task from './task';
import './fun.css';
import { styles } from './funnel_styles';
import { Select, Spin, Button, Icon, Collapse } from 'antd';

const Container = styled.div`
  margin: 3px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 150px;
  background-color: #f4f9f4;
  display: flex;
  flex-direction: column;
`;

const TaskList = styled.div`
  padding: 4px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')}
  flex-grow: 1;
  min-height: 700px;
  max-height:700px;
  overflow-y: auto;
  min-width:140px;
`;

export default class Column extends React.Component {
  render() {
    console.log(this.props);
    return (
      <Container>
        <div style={styles.ColTitles}>
          {this.props.column.title.toUpperCase()}
        </div>
        <Droppable droppableId={this.props.column.id} type="TASK">
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              innerRef={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.tasks.map((task, index) => (
                <Task
                  openEdit={this.props.openEdit}
                  key={task.task_id}
                  task={task}
                  index={index}
                />
              ))}
              {provided.placeholder}

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
                <Icon style={{marginRight:10}} type="plus-circle" />
                Add Task
              </button>
            </TaskList>
          )}
        </Droppable>
      </Container>
    );
  }
}
