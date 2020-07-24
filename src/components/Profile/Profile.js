import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../user-context';
import config from '../../config/index';
import Avatar from '../Avatar/Avatar';
import Post from '../Post/Post';
import ProfileUser from './ProfileUser/ProfileUser';
import { useParams, Link } from 'react-router-dom';
import './Profile.scss';
import ProfileEdit from './ProfileEdit/ProfileEdit';
import PageLoader from '../PageLoader/PageLoader';

const initBackground = '#fafafa';

function Profile(props) {
    const { user, setUser, setBackground } = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isVerified, setisVerified] = useState(false);
    const { id } = useParams();


    useEffect(() => {
        setBackground(initBackground);
        isVerifiedUser(user, id);
        getPosts();
    }, [id, user]);

    async function getPosts() {
        try {
            const res = await fetch(`${config.apiUrl}/users/${id}/posts?sort=-1`, {
                credentials: 'include'
            });
            const fetchedPosts = await res.json();
            setPosts(fetchedPosts);
            setLoading(false);
        } catch (err) {
            console.log(posts);
        }
    }

    function isVerifiedUser(user, providedId) {
        if (user._id !== providedId) {
            return;
        }
        return setisVerified(true);
    }


    return (
        <div className="Profile">
            {isLoading && <PageLoader />}

            <div className="Profile-bg">
                {isVerified && <ProfileEdit id={id} />}
            </div>


            <ProfileUser userId={id} postNum={posts.length} />

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