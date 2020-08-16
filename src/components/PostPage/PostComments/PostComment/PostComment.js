import React from 'react';
import FormatDate from '../../../FormatDate/FormatDate';
import { Link } from 'react-router-dom';
import Avatar from '../../../Avatar/Avatar';
import './PostComment.scss';

function PostComment(props) {
    const { content, createdAt } = props.data;
    const userAvatar = props.data.user.avatar;
    const username = props.data.user.username;
    const userId = props.data.user._id;

    return (
        <div className="PostComment d-flex">
            <div className="avatar-container d-flex align-items-center">
                <Link to={`/profile/${userId}`} className="text-decoration-none">
                    <Avatar size="sm" image={userAvatar} />
                    <span className="PostComment-content username ml-2">{username}</span>
                </Link>
            </div>
            <div className="PostComment-content-container">
                <span className="PostComment-content">{content}</span>
                <span className="PostComment-createdAt d-block text-secondary"><FormatDate data={createdAt} /></span>
            </div>
        </div>
    );
}

export default PostComment;