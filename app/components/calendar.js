import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import React from 'react';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { backend } from '../utils/config';
import ModalEditTask from '../components/editFunnel';
const url = backend.beUrl + backend.sessionUrl;
const tasksUrl = backend.beUrl + backend.tasks;


const { apptoken } = backend;

const dateFormat = 'DD/MM/YYYY HH:mm:ss';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);


class STGCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
event1s:[],
    };
}

  componentDidMount() {
    this.setState({ spinning: true });;
   // console.log(this.props.user);
    //console.log(this.props.user);
    if (this.props.user && this.props.user.session_token.length > 0) {
        this.setState({ sestoken: this.props.user.session_token });
        this.getData();
        this.setState({ spinning: true });
        this.setState({permissions:this.props.user.role})
    }
    this.setState({ spinning: false });
}

// static getDerivedStateFromProps(nextProps, prevProps) {
//   //console.log("NEXT",nextProps);
//   if(nextProps.user && nextProps.user.session_token){
//     this.setState({ sestoken: this.nextProps.user.session_token });
//     this.getData();
//     this.setState({ spinning: false });
//   }
// }

getData = () => {
  fetch(tasksUrl, {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          'X-DreamFactory-API-Key': apptoken,
          'X-DreamFactory-Session-Token': this.props.user.session_token,
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json',
      },
  })
      .then((response) => {
          if (!response.ok) {
              throw Error(response.statusText);
          }
          return response;
      })
      .then(response => response.json())
      .then((taskData) => {
          const datas = taskData.resource;
          let mak = [];
          const officersIds2 = datas.map(function(officer2) {
            console.log(officer2);
          
          const events = 
              {
                start: moment(officer2.nexStageGate, dateFormat).toDate(),
                end: moment(officer2.nexStageGate, dateFormat)
                .add(20, "minutes")
                .toDate(),
          
              title: officer2.projectname,
              };
              mak.push(events);

          });

          this.setState({event1s: mak});

     
      })
      .catch(taskData => console.log(taskData));
};




  render() {
    console.log(this.state);
    return (
      <div>

      <DnDCalendar
      defaultDate={moment().toDate()}
      defaultView="month"
      events={this.state.event1s}
      localizer={localizer}
      onDoubleClickEvent={() => console.log("CLICKCK")}
      style={{ height: "100vh" }}
      
    />
      </div>

    );
  }
}


export default STGCalendar;
