import React, { useState } from 'react';
import Avatar from '../../Avatar/Avatar';
import { Link } from 'react-router-dom';
import config from '../../../config/index';
import deafultAvatar from '../../Avatar/avatar.default.png';
import './SearchResults.scss';

function SearchResults(props) {
    const users = props.data;

    // const avatar = 
    return (
        <ul className="SearchResults list-unstyled d-md-flex  justify-content-center flex-wrap">
            {users.map((user, i) => {
                return (

                    <li className="SearchResults-user col-12 col-lg-3 media my-4 mx-lg-4 bg-white shadow-sm rounded p-3">
                        <Link to={`/profile/${user._id}`} className="d-flex">
                            <img src={user.avatar ? `${config.apiUrl}/avatars/${user.avatar}` : deafultAvatar} className="mr-3 align-self-center shadow-sm" alt="avatar" />

                            <div className="media-body">
                                <h5 className="mt-0 mb-1">{user.username}</h5>
                                <span className="bio text-secondary">{user.bio}</span>
                            </div>
                        </Link>
                    </li>

                )
            })
            }
        </ul>

    );
}

export default SearchResults;