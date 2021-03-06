import React, { useContext } from 'react';
import propTypes from 'prop-types';
import { UserContext } from '../../user-context';
import deafultAvatar from './avatar.default.png';
import config from '../../config/index';
import './Avatar.scss';

function Avatar(props) {
    let image = props.image;
    let isDeafultAvatar = image ? `${config.apiUrl}/avatars/${image}` : deafultAvatar;
    let size = props.size ? props.size : 'sm';

    return (
        <span className="Avatar Avatar-holder">
            <span className="avatar">
                <img
                    src={isDeafultAvatar}
                    alt='Avatar'
                    className={`Avatar-img ${size}`} />
            </span>
        </span>
    );
}

Avatar.propTypes = {
    size: propTypes.oneOf(['xs', 'sm', 'md', 'lg'])
};


export default Avatar;