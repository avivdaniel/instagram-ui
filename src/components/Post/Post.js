import React, { useContext } from 'react';
import config from '../../config/index';
import FormatDate from '../FormatDate/FormatDate';
import { UserContext } from '../../user-context';
import './Post.scss';
import Avatr from '../Avatar/Avatar';
import PostLike from './PostLike/PostLike';


const initBackground = 'fafafa';


function Post(props) {
    const { setBackground } = useContext(UserContext);
    const { image, title, user, createdAt, likes } = props.data;
    setBackground(initBackground);

    return (
        <article className="Post d-flex flex-column col-12 mt-4 mb-4 p-0">

            <header className="d-flex justify-content-between p-3">
                <Avatr size='sm' image={props.data.user.avatar} />
                <span><FormatDate data={createdAt} /></span>
            </header>


            <div className="Post-img-container d-flex justify-content-center align-itens center">
                <img className="Post-img" src={`${config.apiUrl}/posts/${image}`} />
            </div>

            <div className="Post-content-container p-4">
                <p>{title}</p>
                <PostLike
                    postId={props.data._id}
                    likes={props.data.likes}
                />
            </div>

        </article>
    );
}

export default Post;