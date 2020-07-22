import React from 'react';

function PostComment(props) {
    const { content, createdAt } = props.data;
    return (
        <p className="PostComment">
            {content}
            {createdAt}
        </p>
    );
}

export default PostComment;