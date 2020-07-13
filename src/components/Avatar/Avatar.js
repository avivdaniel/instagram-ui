import React, { useContext } from 'react';
import { UserContext } from '../../user-context';
import './Avatar.scss';

function Avatar(props) {
    const { user } = useContext(UserContext);
    return (
        <div className="Avatar">
            <div className="Avatar-holder">
                <div className="avatar">
                    <a href="#">
                        <img
                            src={user && user.avatar ? user.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSnhijtLPGQXbnGn6D6J2igond7G09ZpXPnnw&usqp=CAU'}
                            alt={user && user.username}
                            className={`user ${props.size}`} />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Avatar;