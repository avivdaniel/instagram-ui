import React, { Fragment, useEffect, useState, useContext } from 'react';
import config from '../../../config/index';
import Avatar from '../../Avatar/Avatar';
import { UserContext } from '../../../user-context';

const initBackground = '#fafafa';

function ProfileUser(props) {
    const { userId, postNum } = props;
    const [profile, setProfile] = useState({});

    useEffect(() => {
        getUser(userId);
    }, [userId]);

    const getUser = async (id) => {
        try {
            const fetchedUser = await (await fetch(`${config.apiUrl}/users/${id}`, {
                credentials: 'include'
            })).json();
            // setLoading(false);
            setProfile(fetchedUser);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Fragment>
            <div className="Profile-bg"></div>
            <div className="container">
                <div className="Profile-header col-12">
                    <div className="avatar-container">
                        <Avatar size="lg" image={profile.avatar} />
                    </div>
                    <h2>Demi Name</h2>
                    <h3 className='Profile-username'>@{profile.username}</h3>
                    {profile.bio && <h4 className='Profile-bio'>{profile.bio}</h4>}
                    <hr className="my-3"></hr>
                    <span className='Profile-post-count py-1'>{postNum === 1 ? `${postNum} post` : `${postNum} posts`}</span>
                </div>
            </div>
        </Fragment>
    );
}

export default ProfileUser;