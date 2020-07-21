// import React, { useState, useEffect } from 'react';
// import config from '../../config/index';
// import FormatDate from '../FormatDate/FormatDate';
// import { useParams } from 'react-router-dom';

// function PostPage(props) {
//     const { id } = useParams();
//     const [post, setPost] = useState({});
//     useEffect(() => {
//         if (!id) {
//             return;
//         }
//         getPost(id);
//     }, [id]);

//     async function getPost(id) {
//         try {
//             const fetchedPost = await (await fetch(`${config.apiUrl}/posts/${id}`, {
//                 credentials: 'include'
//             })).json();
//             // setLoading(false);
//             setPost(fetchedPost);
//         } catch (err) {
//             console.log(post);
//         }
//     }

//     return (
//         <article className="Post d-flex flex-column col-12 col-lg-4 p-0">

//             <header className="d-flex justify-content-between align-items-center p-3">
//                 <div className="d-flex align-items-center">
//                     <Link to={`/profile/${post.user._id}`}>
//                         <Avatr size='sm' image={post.user.avatar} />
//                     </Link>
//                     <span className="text-bold ml-2">{post.user.username}</span>
//                 </div>
//                 <span className="text-secondary"><FormatDate data={post.createdAt} /></span>
//             </header>


//             <div className="Post-img-container d-flex justify-content-center align-itens center">
//                 <img className="Post-img" src={`${config.apiUrl}/posts/${image}`} />
//             </div>

//             <div className="Post-content-container p-3">
//                 <PostLike
//                     postId={props.data._id}
//                     likes={props.data.likes}
//                 />
//                 {title &&
//                     <Fragment>
//                         <span className="text-bold mr-1">{props.data.user.username}</span>
//                         < ToggleText text={title} maxLength={20} />
//                     </Fragment>
//                 }


//             </div>


//         </article>
//     );
// }

// export default PostPage;