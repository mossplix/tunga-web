//@author Moses
import React      from 'react';
import MilestoneItem from './milestoneItem';
import { connect } from 'react-redux'
import {Row,Col} from 'react-bootstrap';



function renderMilestone(ms,index){
    return (
        <MilestoneItem
          milestone={ms}
          index={index}
          key={index}
        />
    )

}

var MilestoneSection = React.createClass({


  render: function() {
      const {task,taskActions,auth} = this.props;

      const  milestoneItems  = task.milestones.map(function(ms,index){ return renderMilestone(ms,index) }) ;

    return (

<div>

<h4>Milestones</h4>

            <Row>

          {milestoneItems}
            </Row>

      </div>

    );
  }



});

export default MilestoneSection;

