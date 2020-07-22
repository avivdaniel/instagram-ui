import React, { useState, useEffect, Fragment } from 'react';
import config from '../../config/index';
import FormatDate from '../FormatDate/FormatDate';
import { useParams } from 'react-router-dom';
import AppLoader from '../AppLoader/AppLoader';
import PostLike from '../Post/PostLike/PostLike';
import Avatar from '../Avatar/Avatar';
import { Link } from 'react-router-dom';
import './PostPage.scss';
import PostComments from './PostComments/PostComments';

function PostPage(props) {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [isLoading, setisLoading] = useState(true);

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
            setisLoading(false);
        } catch (err) {
            console.log(post);
        }
    }

    return (
        <article className="PostPage">
            {isLoading ? <AppLoader />
                : (
                    <Fragment>
                        <header className="d-flex justify-content-between align-items-center p-3">
                            <div className="d-flex align-items-center">
                                <Link to={`/profile/${post.user._id}`}>
                                    <Avatar size='sm' image={post.user.avatar} />
                                    <span className="text-bold ml-2">{post.user.username}</span>
                                </Link>

                            </div>
                            <span className="text-secondary"><FormatDate data={post.createdAt} /></span>
                        </header>


                        <div className="PostPage-img-container d-flex justify-content-center align-itens center">
                            <img className="PostPage-img" src={`${config.apiUrl}/posts/${post.image}`} />
                        </div>

                        <div className="PostPage-content-container p-3">
                            <PostLike
                                postId={post._id}
                                likes={post.likes}
                            />
                            {post.title && <span>{post.title}</span>}

                            <PostComments id={post._id} />
                        </div>
                    </Fragment>

                )

            }



        </article>
    );
}

export default PostPage;