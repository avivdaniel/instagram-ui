import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../../user-context';
import config from '../../../config/index';
import './PostLike.scss';

function PostLike(props) {
    const { user } = useContext(UserContext);
    const [likes, setLikes] = useState(props.likes);
    const [hasLiked, setHasLiked] = useState(hasUserLiked());

    function hasUserLiked() {
        return props.likes.includes(user._id);
    }

    const like = async () => {
        const url = `${config.apiUrl}/posts/${props.postId}/likes`;
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include'
        });
        return await response.json();
    }

    const unlike = async () => {
        const url = `${config.apiUrl}/posts/${props.postId}/likes/${user._id}`;
        const response = await fetch(url, {
            method: 'DELETE',
            credentials: 'include'
        });
        return await response.json();
    }

    const setLikeStatus = async (status) => {
        setHasLiked(status);
        try {
            const post = status ? await like() : await unlike();
            setLikes(post.likes);
        } catch (err) {
            console.log(err);
        }
    }

    const likedClass = hasLiked ? 'heartbeat' : '';

    return (
        <div className="PostLike">
            <span onClick={() => setLikeStatus(!hasLiked)}>
                <span className="text-bold">{likes.length}</span> <FontAwesomeIcon icon={faHeart} className={`${likedClass}`} />
            </span>
        </div>
    );
}





export default PostLike; 
