import React, { Fragment, useEffect, useState, useContext } from 'react';
import Avatar from '../../Avatar/Avatar';
import { ProfileContext } from '../Profile';


function ProfileUser(props) {
    const { profile, postNum } = props;

    return (
        <>
            <div className="ProfileUser container mb-2">
                <div className="Profile-header col-12">
                    <div className="avatar-container">
                        <Avatar size="lg" image={profile.avatar} />
                    </div>
                    <h2>{profile.fullName}</h2>
                    <h3 className='Profile-username'>@{profile.username}</h3>
                    {profile.bio && <h4 className='Profile-bio'>{profile.bio}</h4>}
                    <hr className="my-3"></hr>
                    <span className='Profile-post-count py-1 ml-3'>{postNum === 1 ? `${postNum} post` : `${postNum} posts`}</span>
                </div>
            </div>
        </>
    );
}

export default ProfileUser;