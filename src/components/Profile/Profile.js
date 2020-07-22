import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../user-context';
import config from '../../config/index';
import Avatar from '../Avatar/Avatar';
import Post from '../Post/Post';
import ProfileUser from './ProfileUser/ProfileUser';
import { useParams, Link } from 'react-router-dom';
import './Profile.scss';
import ProfileEdit from './ProfileEdit/ProfileEdit';

const initBackground = '#fafafa';

function Profile(props) {
    const { user } = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const [isLoged, setisLoged] = useState(false);
    const { id } = useParams();


    useEffect(() => {
        isLogedUser(user, id);
        getPosts();
    }, [id]);

    async function getPosts() {
        try {
            const res = await fetch(`${config.apiUrl}/users/${id}/posts?sort=-1`, {
                credentials: 'include'
            });
            const fetchedPosts = await res.json();
            // setLoading(false);
            setPosts(fetchedPosts);
        } catch (err) {
            console.log(posts);
        }
    }

    function isLogedUser(user, providedId) {
        if (user._id !== providedId) {
            return;
        }
        return setisLoged(true);
    }


    return (
        <div className="Profile">
            <ProfileUser userId={id} postNum={posts.length} />

            {isLoged && <ProfileEdit id={id} />}


            <div className="container">
                <div className="Profile-gallery col-12 d-flex flex-wrap mt-3">
                    {posts.length ? posts.map(post => {
                        return <Post
                            key={post._id}
                            data={post}
                        />
                    }) : <p className="Profile-no-posts">You have no posts yet</p>}
                </div>
            </div>
        </div>
    );
}

export default Profile;