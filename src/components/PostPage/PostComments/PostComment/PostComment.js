import React from 'react';
import FormatDate from '../../../FormatDate/FormatDate';
import './PostComment.scss';
import Avatar from '../../../Avatar/Avatar';

function PostComment(props) {
    const { content, createdAt } = props.data;
    const userAvatar = props.data.user.avatar;
    const username = props.data.user.username;
    return (
        <div className="PostComment d-flex">
            <div className="">
                <Avatar size="sm" image={userAvatar} />
                <span className="PostComment-content ml-1">{username}</span>
            </div>
            <div className="">
                <span className="PostComment-content">{content}</span>
                <span className="PostComment-createdAt d-block text-secondary"><FormatDate data={createdAt} /></span>
            </div>
        </div>
    );
}

export default PostComment;