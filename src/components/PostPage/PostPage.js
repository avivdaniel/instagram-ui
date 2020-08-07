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
import './PostPage.scss';

const initialBackground = '#fafafa';

function PostPage(props) {
    const { setBackground } = useContext(UserContext);
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) {
            return;
        }
        setBackground(initialBackground);
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
        <article className="PostPage h-100 d-lg-flex justify-content-center align-items-center">
            {isLoading ? <PageLoader />
                : (
                    <>
                        <div className="col-12 col-lg-4 p-0 p-lg-3">
                            <header className="d-flex justify-content-between align-items-center p-3">
                                <div className="d-flex align-items-center">
                                    <Link to={`/profile/${post.user._id}`} className="text-decoration-none">
                                        <Avatar size='md' image={post.user.avatar} />
                                        <span className="text-bold ml-2">{post.user.username}</span>
                                    </Link>

                                </div>
                                <span className="text-secondary"><FormatDate data={post.createdAt} /></span>
                            </header>

                            <div>
                                <div className="PostPage-img-container d-flex justify-content-center align-itens center">
                                    <img className="PostPage-img" src={`${config.apiUrl}/posts/${post.image}`} />
                                </div>

                                <div className="col-12 mt-2">
                                    <PostLike
                                        postId={post._id}
                                        likes={post.likes}
                                    />
                                    {post.title && <>
                                        <span className="text-bold mr-2">{post.user.username}</span>
                                        <span>{post.title}</span>
                                    </>}
                                </div>
                            </div>


                        </div>


                        <div className="col-12 col-lg-4 p-0">
                            <div className="PostPage-content-container p-3">

                                <PostComments id={post._id} />


                            </div>
                        </div>
                    </>
                )

            }



        </article>
    );
}

export default PostPage;