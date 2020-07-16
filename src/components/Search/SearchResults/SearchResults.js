import React, { useState } from 'react';
import Avatar from '../../Avatar/Avatar';

function SearchResults(props) {
    const users = props.data;

    return (
        <div className="SearchResults">
            {users.map((user, i) => {
                return <div className='d-flex'>
                    <Avatar size='sm' image={user.avatar} />
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