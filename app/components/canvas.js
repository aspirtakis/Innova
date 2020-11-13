/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
Tabs 
} from 'antd';

import './canvas.css';
import { FaCheck } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa';



class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: null,

    };
  }

  canvasStatuses= (status) => {
    if(status === "Accepted"){
      return "#1eb53a";
    }
    if(status === "Rejected"){
      return "#ffa3a3";
    }
    if(status === "Processing"){
      return "#a2e8eb";
    }
    
    return null;
    
    } 
    canvasSymbols= (status) => {
      if(status === "Accepted"){
        return <FaCheck style={{fontSize:15, marginRight:6, paddingTop:2 ,color: this.canvasStatuses(status)}} /> 
      //  return <i class="fa fa-camera-retro fa-lg"></i> 
      }
      if(status === "Rejected"){
       // return "#ffa3a3";
        return <FaTimes style={{fontSize:15, marginRight:6,color: this.canvasStatuses(status)}} /> 
      }
      if(status === "Processing"){
       // return "#a2e8eb";
        return <FaClock style={{fontSize:15, marginRight:6 ,color: this.canvasStatuses(status)}} /> 
      }
      
      return null;
      
      } 


  render() {
    const {
      data,assumptions,TeamRemarks
    } = this.props;


    const keyactivities = assumptions && assumptions.filter((ert) => ert.category === "KeyActivities" ) ;
    const keyresources = assumptions && assumptions.filter((ert) => ert.category === "KeyResources" ) ;
    const keypartners = assumptions && assumptions.filter((ert) => ert.category === "KeyPartners" ) ;
    const valuepropositions = assumptions && assumptions.filter((ert) => ert.category === "ValuePropositions" ) ;
    const customerrelationships = assumptions && assumptions.filter((ert) => ert.category === "CustomerRelationships" ) ;
    const channels = assumptions && assumptions.filter((ert) => ert.category === "Channels" ) ;
    const segments = assumptions && assumptions.filter((ert) => ert.category === "CustomerSegments" ) ;
    const coststructure = assumptions && assumptions.filter((ert) => ert.category === "CostStructure" ) ;
    const revenuestreams = assumptions && assumptions.filter((ert) => ert.category === "RevenueStreams" ) ;


    return (
      <div  style={{paddingLeft:15,paddingRight:15 }}>

      <div className="row nowrap" style={{backgroundColor:'#D9F6D2',maxHeight:70}}>
      <div className="col listGroup">
      <div className="company-name">Ticket</div>
      <div className="company-name-copy">{data.coach}</div>
      </div>
      <div className="col listGroup">
      <div className="company-name">Funnel Phase</div>
      <div className="company-name-copy">{data.FunnelPhase}</div>
      </div>

      <div className="col listGroup">
      <div className="company-name">Product Owner</div>
      <div className="company-name-copy">{data.cardPO}</div>
      </div>
      <div className="col listGroup">
      <div className="company-name">Coach</div>
      <div className="company-name-copy">{data.coach}</div>
      </div>
      <div className="col listGroup">
      <div className="company-name">Growth hacker</div>
      <div className="company-name-copy">{data.coach}</div>
      </div>
      
      <div className="col listGroup">
      <div className="company-name">Sponsor</div>
      <div className="company-name-copy">{data.spnsr}</div>
      </div>
      <div className="col listGroup">
      <div className="company-name">Department</div>
      <div className="company-name-copy">{data.sponsor}</div>
      </div>
      
      
      
      </div>
      

      <div >


      <div style={{marginTop:10}} className='row nowrap' >    

      <div className="col nowrap ">
        <div className="row ">
        <div className='col keySingle' style={{minWidth:150 ,}}>
        <div  className='row canvTitles box2'>Key Partners</div>
        <div style={{ minHeight:100, maxHeight:400, overflow:'auto' }} className='col'>
        {keypartners && keypartners.map((assumption) => 
          <div 
          key={assumption.id}
          style={{ marginRight:3,flexFlow: "row nowrap"}} 
          className='row listItem '> 
          <div>{this.canvasSymbols(assumption.status)}</div>
          <div>{assumption.title}</div>
          </div>
        )}
      
        </div>
      </div>
      
        <div style={{minWidth:120 , minHeight:500}} className='col keyDouble'>
        <div className='row'>  
        <div style={{ minHeight:250}} className='col'>
        <div className='row canvTitles box2'>Key Activities</div>
        <div style={{ minHeight:100, maxHeight:200, overflow:'auto' }} className='col'>
        {keyactivities && keyactivities.map(assumption => 
          <div 
          key={assumption.id}
          style={{ marginRight:3,flexFlow: "row nowrap"}} 
          className='row listItem '> 
          <div>{this.canvasSymbols(assumption.status)}</div>
          <div>{assumption.title}</div>
          </div>
          )}
        </div>
        </div>
        </div>
      
        <div className='row canvasR4'>
        <div className='col'>
        <div className='row canvTitles box2'>Key Resources</div>
        <div style={{ minHeight:100, maxHeight:200, overflow:'auto' }} className='col'>
        {keyresources && keyresources.map(assumption =>           
          <div 
          key={assumption.id}
          style={{ marginRight:3,flexFlow: "row nowrap"}} 
          className='row listItem '> 
          <div>{this.canvasSymbols(assumption.status)}</div>
          <div>{assumption.title}</div>
          </div>)}
        </div>
        </div>
      
        </div>
        </div>
      
        <div style={{minWidth:120 , minHeight:500 }} className='col keySingle'>
       
        <div className='row canvTitles box2'>Value propositions</div>
        <div style={{ minHeight:100, maxHeight:400, overflow:'auto' }} className='col'>
        {valuepropositions && valuepropositions.map(assumption =>           
          <div 
          key={assumption.id}
          style={{marginRight:3, flexFlow: "row nowrap"}} 
          className='row listItem '> 
          <div>{this.canvasSymbols(assumption.status)}</div>
          <div>{assumption.title}</div>
          </div>)}
        
        </div>
      
      
        </div>
        <div style={{minWidth:120 ,minHeight:500 }} className='col keyDouble'>
        <div className='row ' >
        <div style={{ minHeight:250}} className='col'>
        <div className='row canvTitles box2'>Customer Relationships </div>
        <div style={{ minHeight:100, maxHeight:200, overflow:'auto' }} className='col'>
        {customerrelationships && customerrelationships.map(assumption =>
          <div 
          key={assumption.id}
          style={{marginRight:3, flexFlow: "row nowrap"}} 
          className='row listItem '> 
          <div>{this.canvasSymbols(assumption.status)}</div>
          <div>{assumption.title}</div>
          </div>)}
        </div>
       
        </div>
        </div>
        <div className='row ' >
        <div className='col '>
        <div className='row canvTitles box2'>Channels </div>
        <div style={{ minHeight:100, maxHeight:200, overflow:'auto' }} className='col'>
        {channels && channels.map(assumption =>           <div 
          key={assumption.id}
          style={{  marginRight:3,flexFlow: "row nowrap"}} 
          className='row listItem '> 
          <div>{this.canvasSymbols(assumption.status)}</div>
          <div>{assumption.title}</div>
          </div>)}
        </div>
        </div>
        </div>
        </div>
      
      
        <div style={{minWidth:120 , minHeight:500 }}  className='col keySingle'> 
        <div className='row canvTitles box2'>Customer segments </div>
        <div style={{ minHeight:100, overflow:'auto' }} className='col'>
        {segments && segments.map(assumption =>           
          <div 
          key={assumption.id}
          style={{ marginRight:3,flexFlow: "row nowrap"}} 
          className='row listItem '> 
          <div>{this.canvasSymbols(assumption.status)}</div>
          <div>{assumption.title}</div>
          </div>)}
        </div>
        </div>
        </div>
        <div className="row ">
        <div className="col bordered col--6" > 
        <div className='row canvTitles box2'>Cost Structure</div>
        <div style={{ minHeight:100, maxHeight:100, overflow:'auto' }}  className='col'>
        {coststructure && coststructure.map(assumption =>           
          <div 
          key={assumption.id}
          style={{ marginRight:3,flexFlow: "row nowrap"}} 
          className='row listItem '> 
          <div>{this.canvasSymbols(assumption.status)}</div>
          <div>{assumption.title}</div>
          </div>)}
        </div>
        </div>
        <div className="col bordered col--6 ">
        <div className='row canvTitles box2'>Revenue streams</div>
        <div style={{ minHeight:100, maxHeight:100, overflow:'auto' }} className='col'>
        {revenuestreams && revenuestreams.map(assumption =>           
          <div 
          key={assumption.id}
          style={{ marginRight:3,flexFlow: "row nowrap"}} 
          className='row listItem '> 
          <div>{this.canvasSymbols(assumption.status)}</div>
          <div>{assumption.title}</div>
          </div>)}
        </div>
        </div>
        </div>
          </div>
        
      <div style={{minWidth:150 ,maxWidth:150}} className="col col--2 prjRemarks">
          <div className='col'>
          <div className='row titlePRJDetails'>Remarks</div>
          {TeamRemarks && TeamRemarks.map(remark => 
            <div key={remark.id} className='row  listItem '>
            {<div
            dangerouslySetInnerHTML={{
              __html: remark.description,
            }}
          />}</div>)}
          </div>
            </div>  
            </div>
            </div>
            </div>
    );
  }
}

export default Canvas;
