import React, { memo, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Paper from '@material-ui/core/Paper';
import { Row, Col } from 'react-flexbox-grid';

import Button from '@material-ui/core/Button';
import { Select } from 'antd';
import makeSelectFunnel from './selectors';
import FunnelForm from '../../components/addFunnelForm';

const { Option } = Select;

const url = 'http://datafactory.openinnovationhub.nl./api/v2/user/session';
const url2 =
  'http://datafactory.openinnovationhub.nl./api/v2/Funelis/_table/funnel.tasks';
const apptoken =
  '36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88';

const data = {
  initiate: [
    {
      task_id: 1,
      title: 'E-Sim',
      funnelPhase: 'initiate',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      horizon: 'MEDIA-ADV',
      status: 'yellow',
      project_name: 'API-STORE',
    },

    {
      task_id: 2,
      title: 'Familie Abbo',
      funnelPhase: 'initiate',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      horizon: 'AGRI',
      status: '#87F39E',
    },
  ],
  scope: [
    {
      task_id: 3,
      title: 'E-Sim Tracking',
      funnelPhase: 'scope',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      horizon: 'MEDIA-ADV',
      status: 'pink',
    },
    {
      task_id: 4,
      title: 'ReferalDeals',
      funnelPhase: 'scope',
      horizon: 'API',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      status: 'orange',
    },
    {
      task_id: 5,
      title: 'ReferalDeals',
      funnelPhase: 'scope',
      status: 'orange',
      horizon: 'API',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
    },
  ],
  problem: [
    {
      task_id: 6,
      title: 'E-Sim Tracking',
      funnelPhase: 'scope',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      horizon: 'MEDIA-ADV',
      status: '#C6F197',
    },
    {
      task_id: 7,
      title: 'ReferalDeals',
      funnelPhase: 'scope',
      horizon: 'API',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      status: '#81F0E4',
    },
    {
      task_id: 8,
      title: 'ReferalDeals',
      funnelPhase: 'scope',
      status: '#81F0E4',
      horizon: 'API',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
    },
  ],
  solution: [
    {
      task_id: 10,
      title: 'E-Sim Tracking',
      funnelPhase: 'scope',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      horizon: 'MEDIA-ADV',
      status: 'yellow',
    },
    {
      task_id: 11,
      title: 'ReferalDeals',
      funnelPhase: 'scope',
      horizon: 'API',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      status: '#81F0E4',
    },
  ],
  bussiness: [
    {
      task_id: 12,
      title: 'E-Sim Tracking',
      funnelPhase: 'scope',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      horizon: 'MEDIA-ADV',
      status: '#93D4F7',
    },
    {
      task_id: 13,
      title: 'ReferalDeals',
      funnelPhase: 'scope',
      horizon: 'API',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      status: '#81F0E4',
    },
  ],
  feasibility: [
    {
      task_id: 14,
      title: 'E-Sim Tracking',
      funnelPhase: 'scope',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      horizon: 'MEDIA-ADV',
      status: '#93D4F7',
    },
    {
      task_id: 15,
      title: 'ReferalDeals',
      funnelPhase: 'scope',
      horizon: 'API',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      status: '#81F0E4',
    },
  ],
  mvp: [
    {
      task_id: 16,
      title: 'E-Sim Tracking',
      funnelPhase: 'scope',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      horizon: 'MEDIA-ADV',
      status: 'pink',
    },
    {
      task_id: 17,
      title: 'ReferalDeals',
      funnelPhase: 'scope',
      horizon: 'API',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      status: 'white',
    },
  ],
  softlaunch: [
    {
      task_id: 18,
      title: 'E-Sim Tracking',
      funnelPhase: 'scope',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      horizon: 'MEDIA-ADV',
      status: 'pink',
    },
    {
      task_id: 19,
      title: 'ReferalDeals',
      funnelPhase: 'scope',
      horizon: 'API',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      status: 'white',
    },
  ],
  scalelaunch: [
    {
      task_id: 20,
      title: 'E-Sim Tracking',
      funnelPhase: 'scope',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      horizon: 'MEDIA-ADV',
      status: 'pink',
    },
    {
      task_id: 21,
      title: 'ReferalDeals',
      funnelPhase: 'scope',
      horizon: 'API',
      description:
        'Generatei opvolgeras;dk;askd;aks;dkaskdsakdkl;asdl;as;d;asl;dkaskl;dkl;as',
      status: 'white',
    },
  ],
};

const styles = {
  containerInit: {
    backgroundColor: '#BFD3F0',
    maxWidth: '30%',
    minHeight: '100%',
  },
  titles: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#19569E',
    textAlign: 'center',
  },
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: 'white',
    border: '2px solid #000',
  },
  zebra1: {
    minHeight: 500,
    backgroundColor: '#DCF3FF',
    border: '2px solid black',
  },
  zebra2: {
    minHeight: 500,
    backgroundColor: '#CCE8F6',
    border: '2px solid black',
  },

  ColTitles: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#72ACFF',
    textAlign: 'center',
  },
  containerEnd: {
    backgroundColor: '#BFD3F0',
    maxWidth: '30%',
    minWidth: '24%',
    minHeight: '100%',
  },

  colInit: {
    minHeight: 500,

    border: '2px solid black',
  },
  containerExperiment: {
    backgroundColor: '#BFD3F0',
    minWidth: '35%',
    maxWidth: '40%',
    minHeight: '100%',
  },
};

class Funnel extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      targetOn: true,
      setOpen: false,
      initiate: data.initiate,
      scope: data.scope,
      problem: data.problem,
      solution: data.solution,
      bussiness: data.bussiness,
      mvp: data.mvp,
      feasibility: data.feasibility,
      scalelaunch: data.scalelaunch,
      softlaunch: data.softlaunch,
    };
  }

  componentDidMount() {
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'X-DreamFactory-API-Key': apptoken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@gmail.com',
        password: 'a224935a',
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(resdata => {
        console.log(resdata);
        this.setState({ sestoken: resdata.session_token });
        fetch(url2, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'X-DreamFactory-API-Key': apptoken,
            'X-DreamFactory-Session-Token': resdata.session_token,
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json',
          },
        })
          .then(response => {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response;
          })
          .then(response => response.json())
          .then(taskData => {
            const datas = taskData.resource;
            console.log(datas);
            console.log(datas.filter(word => word.FunnelPhase === 'initiate'));

            this.setState({
              initiate: datas.filter(word => word.FunnelPhase === 'initiate'),
              scope: datas.filter(word => word.FunnelPhase === 'scope'),
              problem: datas.filter(word => word.FunnelPhase === 'problem'),
              solution: datas.filter(word => word.FunnelPhase === 'solution'),
              bussiness: datas.filter(word => word.FunnelPhase === 'bussiness'),
              mvp: datas.filter(word => word.FunnelPhase === 'mvp'),
              feasibility: datas.filter(
                word => word.FunnelPhase === 'feasibility',
              ),
              scalelaunch: datas.filter(
                word => word.FunnelPhase === 'scalelaunch',
              ),
              softlaunch: datas.filter(
                word => word.FunnelPhase === 'softlaunch',
              ),
            });

            console.log(this.state);
          })

          .catch(taskData => console.log(taskData));
      })

      .catch(response => console.log(response));
  }

  onDragOver = event => {
    event.preventDefault();
  };

  onDrag = (event, task) => {
    event.preventDefault();
    this.setState({
      draggedTask: task,
      draggedFrom: event.target.getAttribute('container'),
    });
  };

  handleOpen = () => {
    console.log('clic');
    this.setState({ setOpen: true });
  };

  filterTheme = theme => {}

  filterTheme2 = theme => {
    const url5 = `http://datafactory.openinnovationhub.nl./api/v2/Funelis/_table/funnel.tasks?filter=theme=${theme}`;

    fetch(url5, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-DreamFactory-API-Key': apptoken,
        'X-DreamFactory-Session-Token': this.state.sestoken,
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(taskData => {
        const datas = taskData.resource;
        console.log(datas);
        console.log(datas.filter(word => word.FunnelPhase === 'initiate'));

        this.setState({
          initiate: datas.filter(word => word.FunnelPhase === 'initiate'),
          scope: datas.filter(word => word.FunnelPhase === 'scope'),
          problem: datas.filter(word => word.FunnelPhase === 'problem'),
          solution: datas.filter(word => word.FunnelPhase === 'solution'),
          bussiness: datas.filter(word => word.FunnelPhase === 'bussiness'),
          mvp: datas.filter(word => word.FunnelPhase === 'mvp'),
          feasibility: datas.filter(word => word.FunnelPhase === 'feasibility'),
          scalelaunch: datas.filter(word => word.FunnelPhase === 'scalelaunch'),
          softlaunch: datas.filter(word => word.FunnelPhase === 'softlaunch'),
        });
        this.setState({ setOpen: false });
        console.log(this.state);
      })
      .catch(taskData => console.log(taskData));
  };

  handleOk = () => {
    fetch(url2, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-DreamFactory-API-Key': apptoken,
        'X-DreamFactory-Session-Token': this.state.sestoken,
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(taskData => {
        const datas = taskData.resource;
        console.log(datas);
        console.log(datas.filter(word => word.FunnelPhase === 'initiate'));

        this.setState({
          initiate: datas.filter(word => word.FunnelPhase === 'initiate'),
          scope: datas.filter(word => word.FunnelPhase === 'scope'),
          problem: datas.filter(word => word.FunnelPhase === 'problem'),
          solution: datas.filter(word => word.FunnelPhase === 'solution'),
          bussiness: datas.filter(word => word.FunnelPhase === 'bussiness'),
          mvp: datas.filter(word => word.FunnelPhase === 'mvp'),
          feasibility: datas.filter(word => word.FunnelPhase === 'feasibility'),
          scalelaunch: datas.filter(word => word.FunnelPhase === 'scalelaunch'),
          softlaunch: datas.filter(word => word.FunnelPhase === 'softlaunch'),
        });
        this.setState({ setOpen: false });
        console.log(this.state);
      })
      .catch(taskData => console.log(taskData));
  };

  handleClose = () => {
    this.setState({ setOpen: false });
  };

  onDrop = (event, task) => {
    const targetContainer = event.target.getAttribute('container');
    if (!targetContainer) {
      return;
    }
    if (
      targetContainer === 'scope' ||
      targetContainer === 'initiate' ||
      targetContainer === 'bussiness' ||
      targetContainer === 'solution' ||
      targetContainer === 'mvp' ||
      targetContainer === 'scalelaunch' ||
      targetContainer === 'softlaunch' ||
      targetContainer === 'feasibility' ||
      targetContainer === 'problem'
    ) {
      this.setState({ targetOn: true });
    } else {
      this.setState({ targetOn: false });
    }
    const targ = this.state.targetOn;
    const {
      initiate,
      draggedTask,
      scope,
      draggedFrom,
      problem,
      solution,
      bussiness,
      scalelaunch,
      softlaunch,
      mvp,
      feasibility,
    } = this.state;
    // FIX out of draggin space
    if (draggedFrom === targetContainer) {
      return;
    }

    if (draggedFrom === 'scope' && targ) {
      this.setState({
        scope: scope.filter(tasks => tasks.task_id !== draggedTask.task_id),
      });
    }
    if (draggedFrom === 'initiate' && targ) {
      this.setState({
        initiate: initiate.filter(
          tasks => tasks.task_id !== draggedTask.task_id,
        ),
      });
    }
    if (draggedFrom === 'problem' && targ) {
      this.setState({
        problem: problem.filter(tasks => tasks.task_id !== draggedTask.task_id),
      });
    }
    if (draggedFrom === 'solution' && targ) {
      this.setState({
        solution: solution.filter(
          tasks => tasks.task_id !== draggedTask.task_id,
        ),
      });
    }
    if (draggedFrom === 'bussiness' && targ) {
      this.setState({
        bussiness: bussiness.filter(
          tasks => tasks.task_id !== draggedTask.task_id,
        ),
      });
    }
    if (draggedFrom === 'mvp' && targ) {
      this.setState({
        mvp: mvp.filter(tasks => tasks.task_id !== draggedTask.task_id),
      });
    }
    if (draggedFrom === 'feasibility' && targ) {
      this.setState({
        feasibility: feasibility.filter(
          tasks => tasks.task_id !== draggedTask.task_id,
        ),
      });
    }
    if (draggedFrom === 'softlaunch' && targ) {
      this.setState({
        softlaunch: softlaunch.filter(
          tasks => tasks.task_id !== draggedTask.task_id,
        ),
      });
    }
    if (draggedFrom === 'scalelaunch' && targ) {
      this.setState({
        scalelaunch: scalelaunch.filter(
          tasks => tasks.task_id !== draggedTask.task_id,
        ),
      });
    }

    // /ADD STATE
    if (targetContainer === 'initiate') {
      this.setState({
        initiate: [...initiate, draggedTask],
        draggedTask: {},
      });
    }
    if (targetContainer === 'scope') {
      this.setState({
        scope: [...scope, draggedTask],
        draggedTask: {},
      });
    }
    if (targetContainer === 'problem') {
      this.setState({
        problem: [...problem, draggedTask],
        draggedTask: {},
      });
    }
    if (targetContainer === 'bussiness') {
      this.setState({
        bussiness: [...bussiness, draggedTask],
        draggedTask: {},
      });
    }
    if (targetContainer === 'solution') {
      this.setState({
        solution: [...solution, draggedTask],
        draggedTask: {},
      });
    }
    if (targetContainer === 'feasibility') {
      this.setState({
        feasibility: [...feasibility, draggedTask],
        draggedTask: {},
      });
    }
    if (targetContainer === 'scalelaunch') {
      this.setState({
        scalelaunch: [...scalelaunch, draggedTask],
        draggedTask: {},
      });
    }
    if (targetContainer === 'softlaunch') {
      this.setState({
        softlaunch: [...softlaunch, draggedTask],
        draggedTask: {},
      });
    }
    if (targetContainer === 'mvp') {
      this.setState({
        mvp: [...mvp, draggedTask],
        draggedTask: {},
      });
    }
    this.onSave(draggedTask.task_id, targetContainer);
    console.log(draggedTask.task_id);
  };

  onSave = (task, scope) => {
    const url4 = `http://datafactory.openinnovationhub.nl./api/v2/Funelis/_table/funnel.tasks/${task}`;
    fetch(url4, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'X-DreamFactory-API-Key': apptoken,
        'X-DreamFactory-Session-Token': this.state.sestoken,
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        funnelPhase: scope,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(taskData => {
        console.log(taskData);
      })
      .catch(taskData => console.log(taskData));
  };

  onColumn = (datas, container) => (
    <Col xs>
      <div
        container={container}
        onDrop={event => this.onDrop(event)}
        onDragOver={event => this.onDragOver(event)}
        style={styles.zebra2}
      >
        <Paper style={styles.ColTitles}>{container.toUpperCase()}</Paper>
        {datas.map(taskproblem => (
          <div
            key={taskproblem.task_id}
            container={container}
            draggable
            onDrag={event => this.onDrag(event, taskproblem)}
            onDragOver={event => this.onDragOver(event)}
          >
            {
              <Paper
                style={{
                  backgroundColor: taskproblem.status,
                  color: 'black',
                  fontSize: 12,
                  margin: 5,
                }}
              >
                {taskproblem.title}
              </Paper>
            }
          </div>
        ))}
      </div>
    </Col>
  );

  onColumn2 = (datas, container) => (
    <Col xs>
      <div
        container={container}
        onDrop={event => this.onDrop(event)}
        onDragOver={event => this.onDragOver(event)}
        style={styles.zebra1}
      >
        <Paper style={styles.ColTitles}>{container.toUpperCase()}</Paper>
        {datas.map(taskproblem => (
          <div
            key={taskproblem.task_id}
            container={container}
            draggable
            onDrag={event => this.onDrag(event, taskproblem)}
            onDragOver={event => this.onDragOver(event)}
          >
            {
              <Paper
                style={{
                  backgroundColor: taskproblem.status,
                  color: 'black',
                  fontSize: 12,
                  margin: 5,
                  maxWidth: 150,
                }}
              >
                {taskproblem.title}
              </Paper>
            }
          </div>
        ))}
      </div>
    </Col>
  );

  render() {
    const {
      initiate,
      scope,
      problem,
      solution,
      bussiness,
      feasibility,
      softlaunch,
      scalelaunch,
      mvp,
      sestoken,
    } = this.state;

    return (
      <div>
        <FunnelForm
          sestoken={sestoken}
          visible={this.state.setOpen}
          onCancel={this.handleClose}
          onOK={this.handleOk}
          handleSubmit={this.handleSubmit}
        />
        <Row>
          <Button onClick={this.handleOpen} type="button">
            Create Task
          </Button>
          <Select onChange={this.filterTheme} style={{ width: 150 }}>
            <Option value="AGRI">AGRI</Option>
            <Option value="MOBILITY">MOBILITY</Option>
          </Select>
          <Select onChange={this.filterTheme} style={{ width: 150 }}>
          <Option value="SMART-CAR">SMART-CAR</Option>
          <Option value="API-STORE">API-STORE</Option>
        </Select>
        </Row>
        <Row>
          <Col style={styles.containerInit} xs>
            <Paper style={styles.titles}>EXPLORE</Paper>
            <Row>
              {this.onColumn(initiate, 'initiate')}
              {this.onColumn2(scope, 'scope')}
            </Row>
          </Col>
          <Col style={styles.containerExperiment} xs>
            <Paper style={styles.titles}>EXPERIMENT</Paper>
            <Row>
              {this.onColumn(problem, 'problem')}
              {this.onColumn2(solution, 'solution')}
              {this.onColumn(bussiness, 'bussiness')}
            </Row>
          </Col>
          <Col style={styles.containerInit} xs>
            <Paper style={styles.titles}>EXPLORE</Paper>
            <Row>
              {this.onColumn2(feasibility, 'feasibility')}
              {this.onColumn(mvp, 'mvp')}
            </Row>
          </Col>
          <Col style={styles.containerEnd} xs>
            <Paper style={styles.titles}>SCALE UP</Paper>
            <Row>
              {this.onColumn(softlaunch, 'softlaunch')}
              {this.onColumn2(scalelaunch, 'scalelaunch')}
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  funnel: makeSelectFunnel(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Funnel);
