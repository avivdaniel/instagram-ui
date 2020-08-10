import React, { useContext, useEffect, useState, createContext } from 'react';
import { UserContext } from '../../user-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Post from '../Post/Post';
import config from '../../config/index';
import PageLoader from '../PageLoader/PageLoader';
import './Feed.scss';

const initBackground = '#fafafa';



function Feed() {
    const [isLoading, setLoading] = useState(true);
    const { setBackground, setOverFlow } = useContext(UserContext);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setBackground(initBackground);
        setOverFlow('hidden');
        async function getPosts() {
            try {
                const res = await fetch(config.apiUrl + '/posts?sort=-1', {
                    credentials: 'include'
                });
                const fetchedPosts = await res.json();
                setPosts(fetchedPosts);
                setLoading(false);
                setOverFlow('unset');
            } catch (err) {
                console.log(posts);
            }
        }
        getPosts();
    }, []);

    return (

        <div className="Feed h-100 mt-lg-3 d-md-flex flex-wrap justify-content-center align-items-center">
            {isLoading && <PageLoader />}
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