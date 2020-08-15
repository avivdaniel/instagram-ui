import React, { useState, useEffect, Fragment, useContext } from 'react';
import config from '../../config/index';
import FormatDate from '../FormatDate/FormatDate';
import { useParams } from 'react-router-dom';
import PostLike from '../Post/PostLike/PostLike';
import Avatar from '../Avatar/Avatar';
import { Link } from 'react-router-dom';
import PageLoader from '../PageLoader/PageLoader';
import PostComments from './PostComments/PostComments';
import { UserContext } from '../../user-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './PostPage.scss';
import { faGripHorizontal } from '@fortawesome/free-solid-svg-icons';

const initialBackground = '#fafafa';

function PostPage(props) {
    const { setBackground } = useContext(UserContext);
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => setBackground(initialBackground), [])

    useEffect(() => {
        if (!id) {
            return;
        }
        getPost(id);
    }, [id]);

    async function getPost(id) {
        try {
            const fetchedPost = await (await fetch(`${config.apiUrl}/posts/${id}`, {
                credentials: 'include'
            })).json();
            setPost(fetchedPost);
            setLoading(false);
        } catch (err) {
            console.log(post);
        }
    }

    return (
        <div className="PostPage">
            {isLoading ? <PageLoader />
                : (
                    <article className="PostPage-article d-flex flex-column flex-lg-row">

                        <div className="col-12 col-lg-8" >
                            <header className="p-3">
                                <Link to={`/profile/${post.user._id}`} className="text-decoration-none">
                                    <Avatar size='md' image={post.user.avatar} />
                                    <span className="text-bold ml-2">{post.user.username}</span>
                                </Link>
                                <span className="text-secondary"><FormatDate data={post.createdAt} /></span>
                            </header>


                            <div className="PostPage-img-container d-flex justify-content-center align-itens center">
                                <img className="PostPage-img" src={`${config.apiUrl}/posts/${post.image}`} />
                            </div>

                            <div className="p-3">
                                <div>
                                    {post.title &&
                                        <>
                                            <span>{post.title}</span>
                                        </>
                                    }

                                    <PostLike
                                        postId={post._id}
                                        likes={post.likes}
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="col-12 col-lg-4">
                            <PostComments id={post._id} />
                        </div>


                    </article>
                )
            }
        </div>

    );
}

export default PostPage;