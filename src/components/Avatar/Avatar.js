import React, { useContext } from 'react';
import propTypes from 'prop-types';
import { UserContext } from '../../user-context';
import deafultAvatar from './avatar.default.png';
import './Avatar.scss';

function Avatar(props) {
    const { user } = useContext(UserContext);
    let image = props.image ? props.image : deafultAvatar;
    let size = props.size ? props.size : 'sm';


    return (
        <div className="Avatar Avatar-holder">
            <div className="avatar">
                <img
                    src={image}
                    alt='Avatar'
                    className={`Avatar-img ${props.size}`} />
            </div>
        </div>
    );
}

Avatar.propTypes = {
    size: propTypes.oneOf(['sm', 'md', 'lg'])
};


export default Avatar;