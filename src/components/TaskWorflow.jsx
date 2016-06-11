import React from 'react'
import { Link } from 'react-router'
import { Modal } from 'react-bootstrap'
import moment from 'moment'
import Rating from 'react-rating'
import TagList from './TagList'
import Progress from './status/Progress'
import CommentSection from '../containers/CommentSection'
import TaskHead from './TaskHead'
import Avatar from './Avatar'
import ApplicationList from './ApplicationList'
import TaskForm from './TaskForm'
import LargeModal from './ModalLarge'
import MilestoneSection from './milestones/milestoneSection'

export default class TaskWorflow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {showModal: false, modalContent: null, modalTitle: ''};
    }

    componentDidMount() {
        const { Auth, Task, TaskActions } = this.props;
        const { task } = Task.detail;
        if(this.props.params.section == 'applications' && (Auth.id == task.user || Auth.user.is_staff)) {
            this.handleViewApplications();
        }
    }

    handleEdit() {
        const { TaskActions, Task } = this.props;
        const { task } = Task.detail;
        this.setState({modalContent: 'edit', modalTitle: 'Edit'});
        this.open();
    }

    handleCloseApplications() {
        const { TaskActions, Task } = this.props;
        if(confirm('Confirm close applications')) {
            TaskActions.updateTask(Task.detail.task.id, {apply: false, apply_closed_at: moment.utc().format()});
        }
    }

    handleCloseTask() {
        const { TaskActions, Task } = this.props;
        if(confirm('Confirm close task')) {
            TaskActions.updateTask(Task.detail.task.id, {closed: true, closed_at: moment.utc().format()});
        }
    }

    handleOpenTask() {
        const { TaskActions, Task } = this.props;
        TaskActions.updateTask(Task.detail.task.id, {closed: false, closed_at: null});
    }

    handleRating(rating) {
        const { TaskActions, Task } = this.props;
        console.log(rating);
        TaskActions.updateTask(Task.detail.task.id, {satisfaction: rating});
    }

    handleMarkPaid() {
        const { TaskActions, Task } = this.props;
        if(confirm('Confirm mark as paid')) {
            TaskActions.updateTask(Task.detail.task.id, {paid: true, paid_at: moment.utc().format()});
        }
    }

    handleDeleteTask() {
        const { TaskActions, Task } = this.props;
        if(confirm('Confirm delete Task')) {
            TaskActions.deleteTask(Task.detail.task.id);
        }
    }

    handleAcceptTask() {
        const { TaskActions, Task, Auth } = this.props;
        TaskActions.updateTask(Task.detail.task.id, {participants: [Auth.user.id], confirmed_participants: [Auth.user.id]});
    }

    handleRejectTask() {
        const { TaskActions, Task, Auth } = this.props;
        if(confirm('Confirm reject task')) {
            TaskActions.updateTask(Task.detail.task.id, {participants: [Auth.user.id], rejected_participants: [Auth.user.id]});
        }
    }

    handleMakePayment() {
        const { TaskActions, Task } = this.props;
        mobbr.setLightboxUrl('/lightbox/#');
        mobbr.makePayment(document.location.href);
    }

    handleViewApplications() {
        const { TaskActions, Task } = this.props;
        const { task } = Task.detail;
        this.setState({modalContent: 'applications', modalTitle: 'Applications'});
        this.open();
    }

    close() {
        this.setState({showModal: false});
    }

    open() {
        this.setState({showModal: true});
    }


    renderModalContent() {
        const { TaskActions, Task, Auth } = this.props;
        const { task } = Task.detail;
        const title = <div>{this.state.modalTitle}: <Link to={`/task/${task.id}/`}>{task.title}</Link></div>;
        return (
            <div>
                <LargeModal title={title} show={this.state.showModal} onHide={this.close.bind(this)}>
                    {this.state.modalContent == 'applications'?(
                    <ApplicationList Task={Task} TaskActions={TaskActions} task={task} />
                        ):null}
                    {this.state.modalContent == 'edit'?(
                    <TaskForm Auth={Auth} Task={Task} TaskActions={TaskActions} task={task} />
                        ):null}
                </LargeModal>
            </div>
        );
    }

    render() {
        const { Auth, Task, TaskActions } = this.props;

        const { task } = Task.detail;
        console.log(task);

        return (
            <div>
                {Task.detail.isRetrieving?
                    (<Progress/>)
                    :(
                <div>
                    <h2>Task Workflow</h2>
                    {this.renderModalContent()}

                     <MilestoneSection task={task} auth={Auth} taskActions={TaskActions}/>
                    {task.apply && !task.closed && (Auth.user.id == task.user || Auth.user.is_staff)?(
                    <div className="workflow-actions">
                        <div className="alert alert-info" style={{display: 'block'}}>This task is still open to applications
                            <button type="button" className="btn btn-primary pull-right" onClick={this.handleCloseApplications.bind(this)}>Close Applications</button>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                        ):null}
                    {Auth.user.id == task.user || Auth.user.is_staff?(
                    <div className="workflow-actions pull-right">
                        {task.closed?(
                        <div>
                            <button type="button" className="btn btn-primary" onClick={this.handleOpenTask.bind(this)}>Open task</button>
                            {task.paid?null:(
                            <button type="button" className="btn btn-primary" onClick={this.handleMakePayment.bind(this)}>Make Payment</button>
                                )}
                            {!task.paid && Auth.user.is_staff?(
                            <button type="button" className="btn btn-primary" onClick={this.handleMarkPaid.bind(this)}>Mark as Paid</button>
                                ):null}
                            <div className="btn-group">
                                <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Rate Developers <span className="caret"></span>
                                </button>
                                <div className="dropdown-menu">
                                    <div></div>
                                    <Rating start={0} stop={10} step={2} fractions={2} initialRate={task.satisfaction}
                                            empty={'fa fa-star-o fa-2x rating'} full={'fa fa-star fa-2x rating'}
                                            onChange={this.handleRating.bind(this)}/>
                                </div>
                            </div>
                        </div>
                            ):(
                        <div>
                            <button type="button" className="btn btn-primary" onClick={this.handleEdit.bind(this)}>Edit</button>
                            <button type="button" className="btn btn-primary" onClick={this.handleDeleteTask.bind(this)}>Delete</button>
                            {task.open_applications > 0?(
                            <button type="button" className="btn btn-primary" onClick={this.handleViewApplications.bind(this)}>View Applications <span className="badge">{task.open_applications}</span></button>
                                ):null}
                            <button type="button" className="btn btn-primary" onClick={this.handleCloseTask.bind(this)}>Close task</button>
                        </div>
                            )}
                    </div>
                        ):null}
                    {task.is_participant?(
                    <div className="workflow-actions pull-right">
                        {task.closed?
                            null:
                            (task.my_participation && !task.my_participation.responded?(
                            <div>
                                <button type="button" className="btn btn-primary" onClick={this.handleAcceptTask.bind(this)}>Accept task</button>
                                <button type="button" className="btn btn-primary" onClick={this.handleRejectTask.bind(this)}>Reject task</button>
                            </div>
                                ):null)}
                    </div>
                        ):null}
                    <TaskHead task={task}/>
                    <div className="row">
                        <div className="col-md-8">
                            {task.details?(
                            <div style={{marginTop: 15 + 'px'}}>
                                {task.description?(
                                <div className="well card media">
                                    <div className="media-left">
                                        <Avatar src={task.details.user.avatar_url}/>
                                    </div>
                                    <div className="media-body">
                                        <p><Link to={`/member/${task.user}/`}>{task.details.user.display_name}</Link></p>
                                        <h4>Task Description</h4>
                                        <div dangerouslySetInnerHTML={{__html: task.description}}/>
                                    </div>
                                </div>
                                    ):''}
                                <CommentSection filter={{task: task.id}} object_details={{content_type: task.content_type, object_id: task.id}}/>
                            </div>
                                ):''}
                        </div>
                        <div className="col-md-4">
                            <div style={{padding: '10px', marginTop: '15px', border: '1px solid #ddd'}}>
                                {task.url?(
                                <div>
                                    <strong>Code Location</strong>
                                    <p><a href={task.url}>{task.url}</a></p>
                                </div>
                                    ):null}

                                <div>
                                    <strong>Pledge</strong>
                                    <h4 className="title">{task.display_fee}</h4>
                                </div>

                                {task.deadline?(
                                <div>
                                    <strong>Deadline</strong>
                                    <p>{moment.utc(task.deadline).local().format('Do, MMMM YYYY, h:mm a')}</p>
                                </div>
                                    ):''}

                                {task.assignee && task.details?(
                                <div>
                                    <strong>Assignee</strong>
                                    <div className="collaborator">
                                        <Avatar src={task.details.assignee.user.avatar_url}/>
                                        <Link to={`/member/${task.assignee.user}/`}>{task.details.assignee.user.display_name}</Link>
                                        <span className="status">{task.assignee.accepted?<i className="fa fa-check-circle accepted"/>:'[Invited]'}</span>
                                    </div>
                                </div>
                                    ):''}

                                {task.details && task.details.participation && task.details.participation.length?(
                                <div>
                                    <strong>Developers</strong>
                                    {task.details.participation.map((participation) => {
                                        const participant = participation.user;
                                        return (
                                        participant.id != task.assignee.user && (participation.accepted || !participation.responded)?(
                                        <div className="collaborator">
                                            <Avatar src={participant.avatar_url}/>
                                            <Link to={`/member/${participant.id}/`}>{participant.display_name}</Link>
                                            <span className="status">{participation.accepted?<i className="fa fa-check-circle accepted"/>:'[Invited]'}</span>
                                        </div>
                                            ):null
                                            )
                                        })}
                                </div>
                                    ):''}
                            </div>
                        </div>
                    </div>
                </div>
                    )}
            </div>

        );
    }
}
