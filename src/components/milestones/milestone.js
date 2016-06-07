import React, {PropTypes} from 'react';
import { push }           from 'react-router-redux';

import ProgressBar from 'react-bootstrap';

export default class Milestone extends ProgressBar {
  _handleChildClick() {
    this.props.dispatch(push(`/boards/${this.props.id}`));
  }

    renderChildBar(child, index) {
    return cloneElement(child, {
      isChild: true,
      key: child.key ? child.key : index
    });
  }



    render() {
        if (this.props.isChild) {
          return this.renderProgressBar();
        }

        let content;

        if (this.props.children) {
          content = ValidComponentChildren.map(this.props.children, this.renderChildBar);
        } else {
          content = this.renderProgressBar();
        }

        return (
          <div
            {...this.props}
            className={classNames(this.props.className, 'progress')}
            min={null}
            max={null}
            label={null}
            aria-valuetext={null}
          >
            {content}
          </div>
        );
      }

}



Milestone.propTypes = {
  min: PropTypes.number,
  now: PropTypes.number,
  max: PropTypes.number,
  label: PropTypes.node,
  srOnly: PropTypes.bool,
  striped: PropTypes.bool,
  active: PropTypes.bool,
  className: React.PropTypes.string,
  interpolateClass: PropTypes.node,
  /**
   * @private
   */
  isChild: PropTypes.bool
};