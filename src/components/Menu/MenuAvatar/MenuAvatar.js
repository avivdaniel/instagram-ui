import React, { useContext } from 'react';
import { UserContext } from '../../../user-context';
import './MenuAvatar.scss';
import Avatar from '../../Avatar/Avatar';


// function MenuAvatar(props) {
//     const { user } = useContext(UserContext);
//     return (
//         <Avatar size={}/>
//     );
// }


function MenuAvatar(props) {
    const { user } = useContext(UserContext);
    return (
        <div className="MenuAvatar">
            <Avatar size='md' />
        </div>

    );
}


// function MenuAvatar(props) {
//     const { user } = useContext(UserContext);
//     return (
//         <div className="MenuAvatar">
//             <div className="MenuAvatar-holder">
//                 <div className="avatar">
//                     <a href="#">
//                         <img
//                             src={user && user.avatar ? user.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSnhijtLPGQXbnGn6D6J2igond7G09ZpXPnnw&usqp=CAU'}
//                             alt={user && user.username}
//                             className="user"
//                             width={props.width}
//                             height={props.height} />
//                     </a>
//                 </div>
//             </div>
//         </div>

//     );
// }

export default MenuAvatar;