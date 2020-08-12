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
            <dt className=" d-flex  col-2 col-lg-4 p-0">
                <Avatar size="sm" image={userAvatar} />
                <span className="PostComment-content ml-1">{username}</span>
            </dt>
            <dd className="d-inline col-10 col-lg-8 px-1 m-0">
                <span className="PostComment-content">{content}</span>
                <span className="PostComment-createdAt d-block text-secondary"><FormatDate data={createdAt} /></span>
            </dd>
        </div>
    );
}

export default PostComment;