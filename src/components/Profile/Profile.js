import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../user-context';
import config from '../../config/index';
import Avatar from '../Avatar/Avatar';
import Post from '../Post/Post';
import ProfileUser from './ProfileUser/ProfileUser';
import { useParams, Link } from 'react-router-dom';
import ProfileEdit from './ProfileEdit/ProfileEdit';
import PageLoader from '../PageLoader/PageLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './Profile.scss';

const initBackground = '#fafafa';

function Profile(props) {
    const { user, setBackground } = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const [userImage, setUserImage] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [isVerified, setisVerified] = useState(false);
    const [isHovering, setisHovering] = useState(false);
    // const [postThatHover, setPostHover] = use
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
                {isVerified && <ProfileEdit id={id} setUserImage={setUserImage} />}
            </div>


            <ProfileUser userId={id} postNum={posts.length} />

            <div className="Posts-container container d-flex flex-wrap justify-content-center">

                {posts.length ? posts.map(post => {
                    return (
                        <figure key={post._id} className="img-container col-6 col-lg-4">
                            <Link
                                to={`/posts/${post._id}`}
                                className=""
                                onMouseEnter={() => setisHovering(true)}
                                onMouseLeave={() => setisHovering(false)}
                            >
                                <img className="Post-img img-fluid" src={`${config.apiUrl}/posts/${post.image}`} />
                                {isHovering &&
                                    <div className="likes-modal d-flex align-items-center justify-content-center">
                                        <span className="text-white">
                                            <span className="mr-2 likes-length">{post.likes.length}</span>
                                            <FontAwesomeIcon icon={faHeart} />
                                        </span>
                                    </div>
                                }

                            </Link>
                        </figure>
                    )
                }) : <p className="Profile-no-posts">You have no posts yet</p>}

            </div>
        </div>
    );
}

export default Profile;