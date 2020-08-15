import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../user-context';
import config from '../../config/index';
import ProfileUser from './ProfileUser/ProfileUser';
import { useParams, Link } from 'react-router-dom';
import ProfileEdit from './ProfileEdit/ProfileEdit';
import PageLoader from '../PageLoader/PageLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import './Profile.scss';

const initBackground = '#fafafa';

function Profile(props) {
    const { user, setBackground, setOverFlow, lastEdited } = useContext(UserContext);
    const [profile, setProfile] = useState({});
    const [isLoadingPerson, setLoadingPerson] = useState(true);
    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isVerified, setisVerified] = useState(false);
    const { id } = useParams();


    useEffect(() => setBackground(initBackground), [])

    useEffect(() => {
        isVerifiedUser(user, id);
        getPosts();
        getUser(id);
    }, [id, user, lastEdited]);


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

    function selectImage(index) {
        setSelectedImage(index);
    }

    function getSelectedClass(index) {
        return selectedImage === index
            ? 'likes-modal'
            : 'd-none'
    }

    const getUser = async (id) => {
        try {
            const fetchedUser = await (await fetch(`${config.apiUrl}/users/${id}`, {
                credentials: 'include'
            })).json();
            console.log('false')
            setProfile(fetchedUser);
            setLoadingPerson(false);
        } catch (err) {
            console.log(err);
        }
    }

    return (

        <>
            {!isLoadingPerson && !isLoading
                ? (<div className="Profile">

                    <div className="Profile-bg">
                        {isVerified && <ProfileEdit id={id} />}
                    </div>


                    <ProfileUser profile={profile} postNum={posts.length} />

                    <div className="Posts-container container d-flex flex-wrap justify-content-center">

                        {posts.length ? posts.map((post, i) => {
                            return (
                                <figure key={post._id} className="img-container col-6 col-lg-4">
                                    <Link
                                        to={`/posts/${post._id}`}
                                        className="img-link"
                                        onMouseEnter={() => selectImage(i)}
                                        onMouseLeave={() => selectImage(null)}
                                    >
                                        <img className="Post-img img-fluid" src={`${config.apiUrl}/posts/${post.image}`} />

                                        <div className={getSelectedClass(i)}>
                                            <span className="text-white mr-2">
                                                <span>{post.likes.length}</span>
                                                <FontAwesomeIcon icon={faHeart} className="ml-1" />
                                            </span>
                                            <span className="text-white">
                                                <span>{post.comments.length}</span>
                                                <FontAwesomeIcon icon={faCommentAlt} className="ml-1" />
                                            </span>
                                        </div>

                                    </Link>
                                </figure>
                            )
                        }) : <p className="Profile-no-posts">You have no posts yet</p>}

                    </div>
                </div>
                )
                : <PageLoader />
            }
        </>
    );
}

export {
    Profile
};





