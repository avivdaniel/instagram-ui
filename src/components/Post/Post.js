import React, { useContext, Fragment } from 'react';
import config from '../../config/index';
import FormatDate from '../FormatDate/FormatDate';
import { UserContext } from '../../user-context';
import './Post.scss';
import Avatr from '../Avatar/Avatar';
import PostLike from './PostLike/PostLike';
import ToggleText from '../ToggleText/ToggleText';
import { Link } from 'react-router-dom';


// const initBackground = '#fafafa';


function Post(props) {
    const { image, title, user, createdAt, likes } = props.data;


    return (
        <article className="Post d-flex flex-column col-12 col-lg-4 p-0">

            <header className="d-flex justify-content-between align-items-center p-3">
                <div className="d-flex align-items-center">
                    <Link to={`/profile/${props.data.user._id}`}>
                        <Avatr size='sm' image={props.data.user.avatar} />
                    </Link>
                    <span className="text-bold ml-2">{props.data.user.username}</span>
                </div>
                <span className="text-secondary"><FormatDate data={createdAt} /></span>
            </header>


            <div className="Post-img-container d-flex justify-content-center align-itens center">
                <img className="Post-img" src={`${config.apiUrl}/posts/${image}`} />
            </div>

            <div className="Post-content-container p-3">
                <PostLike
                    postId={props.data._id}
                    likes={props.data.likes}
                />
                {title &&
                    <Fragment>
                        <span className="text-bold mr-1">{props.data.user.username}</span>
                        < ToggleText text={title} maxLength={20} />
                    </Fragment>
                }


            </div>


            {/* <div className="row">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porttitor feugiat ipsum quis ullamcorper. Nullam vitae velit vitae tortor semper tempor ac vitae magna. Maecenas a ullamcorper neque. Aliquam vitae tortor luctus nisi rutrum eleifend non non leo.</p>

                <div id="collapse" style="display:none">
                    <p>Sed eleifend lectus id semper accumsan. Sed lobortis id ligula eget blandit. Integer interdum iaculis nunc, sed porttitor magna tincidunt in. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam lobortis accumsan tempor. Aliquam sollicitudin pulvinar est, quis convallis tellus.</p>
                </div>
                <a href="#collapse" className="nav-toggle">Read More</a>
            </div> */}
        </article>
    );
}

export default Post;