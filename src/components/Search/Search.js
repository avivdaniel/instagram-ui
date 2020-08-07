import React, { useEffect, useState, useContext } from 'react';
import config from '../../config/index';
import SearchResults from './SearchResults/SearchResults';
import { UserContext } from '../../user-context';
import PageLoader from '../PageLoader/PageLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Search.scss';

const initBackground = '#fafafa';
function Search(props) {
    const { setBackground } = useContext(UserContext)
    const [isLoading, setisLoading] = useState(false);
    const [query, setquery] = useState('');
    const [users, setusers] = useState(null);
    const [timer, setTimer] = useState(undefined);

    useEffect(() => {
        setBackground(initBackground);
    }, []);

    useEffect(() => {
        if (query === '') {
            return;
        }
        if (timer) {
            clearTimeout(timer);
            setTimer(undefined);
        }
        setTimer(setTimeout(submit, 1000));

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
        return !query;
    }

    return (
        <div className="Search container mt-2">
            {isLoading && <PageLoader />}
            <div className="form-group">
                <input
                    value={query}
                    className="form-control"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={e => {
                        setquery(e.target.value)
                    }} />
                <FontAwesomeIcon className="Search-form-icon" icon={faSearch} />
            </div>

            <div>
                {users !== null &&
                    <>
                        {users.length > 0
                            ? <SearchResults data={users} />
                            : <div>no results</div>
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default Search;