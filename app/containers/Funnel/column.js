/* eslint-disable react/button-has-type */
import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Task from './task';
import './fun.css';
import { styles } from './funnel_styles';
import { Select, Spin, Button, Icon, Collapse } from 'antd';

const Container = styled.div`
  margin: auto;
  margin-left: 5px;
  margin-right: 5px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding:2px;
  background-color: #f4f9f4;
  display: flex;
  width:90%;
  min-height: 780px;
  flex-direction: column;
  margin-top:5px;
`;

const TaskList = styled.div`
  padding: 4px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')}
  flex-grow: 1;
  min-height: 100%;
  max-height:700px;
  overflow-y: auto;

`;

export default class Column extends React.Component {
  render() {
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
