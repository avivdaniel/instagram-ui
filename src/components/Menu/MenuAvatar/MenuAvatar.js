import React, { useContext, Fragment, useEffect } from 'react';
import { UserContext } from '../../../user-context';
import Avatar from '../../Avatar/Avatar';
import { Link } from 'react-router-dom';



function MenuAvatar(props) {
    const { user } = useContext(UserContext);

    useEffect(() => {

    }, [user]);
    return (
        <>
            {/* <Link to={`/profile/${user._id}`}> */}
            <Avatar size='xs' image={user.avatar} />
            {/* </Link> */}

        </>
    );
}


export default MenuAvatar;