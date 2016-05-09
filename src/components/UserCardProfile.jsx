import React from 'react'
import { Link } from 'react-router'
import TagList from './TagList'
import Avatar from './Avatar'

export default class UserCardProfile extends React.Component {

    render() {
        const { user } = this.props;

        return (
            <div className="media">
                <div className="media-left">
                    <Avatar src={user.avatar_url} size="medium"/>
                </div>
                <div className="media-body">
                    <Link to={`/member/${user.id}/`}>{user.display_name}</Link>
                    {user.is_project_owner?(
                    <p>{user.company}</p>
                        ):''}
                    {user.profile?(
                    <div>{user.profile.city}, {user.profile.country_name}</div>
                        ):null}
                    {!user.is_developer && user.tasks_created?(
                    <div>{user.tasks_created} tasks created</div>
                        ):null}
                    {user.is_developer?(
                    <div>{user.tasks_completed} tasks completed</div>
                        ):null}
                </div>
                {user.profile?(
                <div>
                    <TagList tags={user.profile.skills} max={3} link={`/member/${user.id}/`}/>
                </div>
                    ):null}
            </div>
        );
    }
}