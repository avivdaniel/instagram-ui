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


    useEffect(() => {
        setBackground(initBackground);
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
            return res;
        }
        submit();
    }, [query])

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