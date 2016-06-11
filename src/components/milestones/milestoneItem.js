import React, {PropTypes} from 'react';

import {ProgressBar,
        OverlayTrigger,
        Tooltip,Button,
        Row,
        Col} from 'react-bootstrap';

import Radium from "radium";
import {
    FormattedDate,
    FormattedRelative
} from 'react-intl';




var ToolTip = Radium(React.createClass({

    render: function() {
          const  created = new Date(this.props.milestone.created);
          const due_date = new Date(this.props.milestone.due_date);
         const tooltip = (
  <Tooltip> <strong style={{borderBottom: "1px solid #f41152",margin:"0px !important",padding:"0px !important"}}>{this.props.milestone.title||"ddddd"}</strong><div >



{this.props.milestone.description||""}

     <FormattedDate
                    value={due_date}
                    month='long'
                    day='numeric'
                    year='numeric'
                    hour12={true}
                    hour='numeric'
                    minute='2-digit'
                />


<FormattedRelative value={due_date} units={'minute'} /> </div></Tooltip>
);
      return (
               <OverlayTrigger    placement="top" overlay={tooltip}>
        <button type="button" style={[styles]}/>
         </OverlayTrigger>
      )
    }
}));



var styles = {
  background: '#c0392b',
  border: 0,
  color: 'white',
  cursor: 'pointer',
  display: 'block',
  fontSize: 18,
  fontWeight: 'bold',
  outline: 0,
  padding: 7,
  WebkitTransition: '200ms all linear',
  MozTransition: '200ms all linear',
  transition: '200ms all linear',
  textTransform: 'uppercase',
    borderRadius: '15px',
    width:'10px',
    height: '10px',
  ":hover": {
    background: '#e74c3c',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
    WebkitTransform: 'scale(1.1)',
    MozTransform: 'scale(1.1)',
    transform: 'scale(1.1)'
  }
}



const buttonStyle={
    width: "30px",
  height: "30px",
  textAlign: "center",
  padding: "6px 0",
  fontSize: "12px",
  lineHeight: "1.428571429",
  borderRadius: "15px"
};


var MilestoneItem = React.createClass({



  render: function() {
       const {milestone,index}=this.props;


            if (this.props.index === 0)
            {
                return (

                      <Col xs={1} md={1} style={{paddingLeft:"6px !important"}}>
       <Row>
       <Col xs={6} md={2} xsOffset={6} mdOffset={8} style={{paddingLeft:"2px !important",    marginTop: "-2px",paddingRight:"2px !important"}}>
        <ToolTip milestone={milestone}/>
      </Col>
    </Row>
    <Row>
    <Col xs={6} md={8} xsOffset={6} mdOffset={4} style={{paddingLeft:"2px !important",    marginTop: "-2px",paddingRight:"2px !important"}}>
    <FormattedRelative value={new Date(milestone.due_date)} />
    </Col>
     </Row>

    </Col>

                );

            }
           else{

       return (

                <Col xs={3} md={2} style={{paddingLeft:"6px !important"}}>
                   <Row>
                   <Col xs={10} md={10} style={{paddingLeft:"2px !important",paddingRight:"2px !important"}}>

                   <ProgressBar now={100} style={{ width: 100 + '%',height:"10px !important" }}  srOnly />
                  </Col>
                   <Col xs={6} md={2} style={{paddingLeft:"2px !important",    marginTop: "-2px",paddingRight:"2px !important"}}>
                    <ToolTip milestone={milestone}/>
                  </Col>
                 </Row>

          </Col>);

            }

  }



});


export default MilestoneItem;