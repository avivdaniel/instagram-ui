import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../user-context';
import config from '../../config/index';
import Avatar from '../Avatar/Avatar';
import './Profile.scss';
import Post from '../Post/Post';

const initBackground = '#fafafa';
function Profile(props) {
    const { user, setBackground } = useContext(UserContext);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setBackground(initBackground);
        async function getPosts() {
            try {
                const res = await fetch(`${config.apiUrl}/users/${user._id}/posts`, {
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
    }, [user]);

    return (
        <div className="Profile container">
            <div className="jumbotron col-12">
                <h2 className='Profile-username text-center'>{user.username}</h2>
                <h3 className='Profile-bio'>a very intrested something</h3>
                <h3 className='Profile-bio'>{posts.length}</h3>
                <Avatar size="lg" image={user.avatar} />
                <hr className="my-4"></hr>
            </div>
            <div className="col-12">
                {posts.length ? posts.map(post => {
                    return <Post
                        key={post._id}
                        data={post}
                    />
                }) : <p className="Profile-no-posts">You have no posts yet</p>}
            </div>
        </div>
    );
}

export default Profile;