import React, { PropTypes } from 'react';
import Actions              from '../../actions/milestoneActions';
import {FormGroup,
        ControlLabel,
        HelpBlock,
        FormControl,
        OverlayTrigger,
        Tooltip,Button,
        InputGroup,
        Modal,
        Row,
        Col} from 'react-bootstrap';


export default React.createClass({


  _handleSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    const { name } = this.refs;

    const data = {
      name: name.value,
    };

    dispatch(Actions.create(data));
  },

  getInitialState() {
    return {
      value: ''
    };
  },

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  },

  handleChange(e) {
    this.setState({ value: e.target.value });
  },

  getInitialState() {
    return { showModal: false };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },



  render() {
    const { errors } = this.props;

    return (
            <div>

             <Button
          bsStyle="primary"
          onClick={this.open}
        >
          Add Update
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add Task Update</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
        <FormGroup
          controlId="formBasicText"
          //validationState={this.getValidationState()}
        >

              <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Project Status</ControlLabel>
                  <FormControl componentClass="select" placeholder="select">
                    <option value="on schedule">on schedule</option>
                    <option value="stuck">stuck</option>
                    <option value="behind">behind</option>
                  </FormControl>
             </FormGroup>

            <FormGroup>
        <ControlLabel>Percentage accomplished</ControlLabel>
      <InputGroup>
        <FormControl type="text" />
        <InputGroup.Addon>%</InputGroup.Addon>
      </InputGroup>
    </FormGroup>

      <FormGroup controlId="formControlsTextarea">
      <ControlLabel>What Did You Accomplish</ControlLabel>
      <FormControl componentClass="textarea" value="accomplished"  placeholder="what was accomplished" />
    </FormGroup>


     <FormGroup controlId="formControlsTextarea">
      <ControlLabel>Next Steps</ControlLabel>
      <FormControl componentClass="textarea" value="accomplished"  placeholder="Next Steps" />
    </FormGroup>


     <FormGroup controlId="formControlsTextarea">
      <ControlLabel>Other Remarks</ControlLabel>
      <FormControl componentClass="textarea" value="accomplished"  placeholder="Other Remarks" />
    </FormGroup>

          <FormControl.Feedback />
          <HelpBlock>Validation is based on string length.</HelpBlock>
        </FormGroup>
       <Button type="submit">
        Submit
       </Button>
      </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>

    );
  }
});
