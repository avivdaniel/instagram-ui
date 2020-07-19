import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../user-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Post from '../Post/Post';
import config from '../../config/index';
import './Feed.scss';

const initBackground = '#fafafa';

function Feed() {
    // const [isLoading, setLoading] = useState(true);
    const { setBackground } = useContext(UserContext);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setBackground(initBackground);
        async function getPosts() {
            try {
                const res = await fetch(config.apiUrl + '/posts?sort=-1', {
                    credentials: 'include'
                });
                const fetchedPosts = await res.json();
                // setLoading(false);
                setPosts(fetchedPosts);
            } catch (err) {
                console.log(posts);
            }
        }
        getPosts();
    }, []);

    return (
        <div className="Feed d-flex flex-column flex-lg-row flex-wrap justify-content-center">
            {posts.map(post => {
                return <Post
                    key={post._id}
                    data={post}
                />
            })}
        </div>
    );
}

export default Feed;