import React, { useContext, Fragment } from 'react';
import config from '../../config/index';
import FormatDate from '../FormatDate/FormatDate';
import { UserContext } from '../../user-context';
import './Post.scss';
import Avatar from '../Avatar/Avatar';
import PostLike from './PostLike/PostLike';
import ToggleText from '../ToggleText/ToggleText';
import { Link } from 'react-router-dom';


// const initBackground = '#fafafa';


function Post(props) {
    const { image, title, user, createdAt, likes } = props.data;


    return (
        <article className="Post d-flex flex-column col-12 col-lg-3 p-0 m-lg-4 shadow-sm">

            <header className="d-flex justify-content-between align-items-center p-3">
                <div className="d-flex align-items-center">
                    <Link to={`/profile/${props.data.user._id}`} className="text-decoration-none">
                        <Avatar size='sm' image={props.data.user.avatar} />
                        <span className="text-bold ml-2">{props.data.user.username}</span>
                    </Link>
                </div>
                <span className="text-secondary"><FormatDate data={createdAt} /></span>
            </header>

            <Link to={`/posts/${props.data._id}`}>
                <div className="Post-img-container border border-light d-flex justify-content-center align-itens-center">
                    <img className="Post-img" src={`${config.apiUrl}/posts/${image}`} />
                </div>
            </Link>

            <div className="Post-content-container p-3">
                <PostLike
                    postId={props.data._id}
                    likes={props.data.likes}
                />
                {title &&
                    <Fragment>
                        <span className="text-bold mr-1">{props.data.user.username}</span>
                        < ToggleText text={title} maxLength={30} />
                    </Fragment>
                }
            </div>

        </article>
    );
}

export default Post;