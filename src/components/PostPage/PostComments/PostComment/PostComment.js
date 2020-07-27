import React from 'react';
import FormatDate from '../../../FormatDate/FormatDate';
import './PostComment.scss';
import Avatar from '../../../Avatar/Avatar';

function PostComment(props) {
    const { content, createdAt } = props.data;
    const userAvatar = props.data.user.avatar;
    return (
        <div className="col-12 d-flex flex-wrap p-0 my-1">
            <div className="col-1 p-0">
                <Avatar size="sm" image={userAvatar} />
            </div>
            <p className="PostComment d-inline col-11 m-0">
                <span className="PostComment-content">{content}</span>
                <span className="PostComment-createdAt d-block text-secondary"><FormatDate data={createdAt} /></span>
            </p>
        </div>
    );
}

export default PostComment;