import React, { useEffect, useState } from 'react';
import config from '../../config/index';
import SearchResults from './SearchResults/SearchResults';
import AppLoader from '../AppLoader/AppLoader';

function Search(props) {
    const [isLoading, setisLoading] = useState(false);
    const [query, setquery] = useState('');
    const [users, setusers] = useState([]);


    useEffect(() => {
        if (query === '') {
            return;
        }
        const submit = async () => {
            setisLoading(true);
            const res = await fetch(`${config.apiUrl}/users?username=${query}`, {
                credentials: "include"
            });
            if (res.status === 200) {
                const fetchedUsers = await res.json();
                setusers(fetchedUsers);
                setisLoading(false);
            }
            if (res.status === 400) {
                console.log('no')
            }
            else {
                console.log('unknown error')
            }
            return res;
        }
        submit();
    }, [query])

    function hasNoResults() {
        return query && users.length === 0;
    }

    return (
        <div className="Search container">
            {isLoading && <AppLoader />}
            <input
                value={query}
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={e => {
                    setquery(e.target.value)
                }} />
            <div>
                {hasNoResults() ?
                    <span>no results</span>
                    :
                    <SearchResults data={users} />
                }
            </div>
        </div>
    )
}

export default Search;