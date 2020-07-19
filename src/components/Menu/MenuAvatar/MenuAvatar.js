import React, { useContext, Fragment } from 'react';
import { UserContext } from '../../../user-context';
import Avatar from '../../Avatar/Avatar';



function MenuAvatar(props) {
    const { user } = useContext(UserContext);
    return (
        <Fragment>
            <Avatar size='md' image={user.avatar} />
        </Fragment>
    );
}


export default MenuAvatar;