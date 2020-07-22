import React, { useEffect, useState } from 'react';
import config from '../../../config/index';
import PostComment from './PostComment/PostComment';
import CommentCreate from './CommentCreate/CommentCreate';

function PostComments(props) {

    const [comments, setcomments] = useState([]);
    const postId = props.id;

    useEffect(() => {
        if (!postId) {
            return;
        }
        async function getComments() {
            try {
                const res = await fetch(`${config.apiUrl}/posts/${postId}/comment`, {
                    method: 'GET',
                    credentials: 'include'
                });
                const fetchedComments = await res.json();
                // setLoading(false);
                setcomments(fetchedComments);
            } catch (err) {
                console.log(comments);
            }
        }
        getComments();
    }, []);

    function addComment(newComment) {
        setcomments([...comments, newComment]);
    }

    return (
        <div>
            <div className="PostComments d-flex flex-column flex-lg-row flex-wrap justify-content-center">
                {comments.map(comment => {
                    return <PostComment
                        key={comment._id}
                        data={comment}
                    />
                })}
                <CommentCreate id={postId} onAddComment={addComment} />
            </div>
        </div>
    );
}

export default PostComments;