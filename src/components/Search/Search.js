import React, { useEffect, useState, useContext } from 'react';
import config from '../../config/index';
import SearchResults from './SearchResults/SearchResults';
import { UserContext } from '../../user-context';
import PageLoader from '../PageLoader/PageLoader';

const initBackground = '#fafafa';
function Search(props) {
    const { setBackground } = useContext(UserContext)
    const [isLoading, setisLoading] = useState(false);
    const [query, setquery] = useState('');
    const [users, setusers] = useState([]);

    let timer;

    useEffect(() => {
        setBackground(initBackground);
        if (query === '') {
            return;
        }
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(submit, 3000);

    }, [query])

    async function submit() {
        setisLoading(true);
        const res = await fetch(`${config.apiUrl}/users?username=${query}`, {
            credentials: "include"
        });
        if (res.status === 200) {
            const fetchedUsers = await res.json();
            setusers(fetchedUsers);
            setisLoading(false);
        }
        return res;
    }

    function hasNoResults() {
        return query && users.length === 0;
    }

    return (
        <div className="Search container mt-2">
            {isLoading && <PageLoader />}
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