import React, { useState } from 'react';
import Avatar from '../../Avatar/Avatar';
import { Link } from 'react-router-dom';

function SearchResults(props) {
    const users = props.data;

    return (
        <div className="SearchResults">
            {users.map((user, i) => {
                return <div className='d-flex'>
                    <Link to={`/profile/${user._id}`}>
                        <Avatar size='sm' image={user.avatar} />
                    </Link>
                    <div>
                        <span>{user.username}</span>
                        <p>{user.bio}</p>
                    </div>
                </div>
            })
            }
        </div>
    );
}

export default SearchResults;