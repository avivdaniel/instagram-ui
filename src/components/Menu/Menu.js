import React, { useContext, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../user-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import config from '../../config/index';
import { faHome, faSearch, faPlusSquare, faHeart, faUser, faUserAltSlash } from '@fortawesome/free-solid-svg-icons';
import MenuAvatar from './MenuAvatar/MenuAvatar';
import Dropdown from 'react-bootstrap/Dropdown';
import './Menu.scss';


function Menu(props) {
    const { user, setUser } = useContext(UserContext);
    const history = useHistory();
    const firstName = user.fullName.split(' ').slice(0, -1).join(' ');


    async function onLogout() {
        try {
            const res = await fetch(config.apiUrl + '/users/logout', {
                method: 'GET',
                credentials: "include"
            });
            if (res.status === 200) {
                history.go(0);
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <nav className="Menu navbar-dark d-flex">
            <a className="Menu-brand navbar-brand" href="/">Instagram</a>
            <ul className="nav justify-content-around justify-content-lg-end w-100 align-items-center mr-auto">
                <li className="nav-item">
                    <Link className="navlink-title" to="/">
                        <FontAwesomeIcon icon={faHome} className="Menu-icon-animation" />

                        <span className="sr-only">(current)</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="navlink-title" to="/search">
                        <FontAwesomeIcon icon={faSearch} className="Menu-icon-animation" />
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="navlink-title" to="/post/create">
                        <FontAwesomeIcon icon={faPlusSquare} className="Menu-icon-animation" />
                    </Link>
                </li>
                <li className="nav-item">
                    <Dropdown className="navlink-title">
                        <Dropdown.Toggle className='btn-dropdown' id="dropdown-basic" >
                            <FontAwesomeIcon icon={faUser} className="Menu-icon-animation" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Header>{`Hey ${firstName}!`}</Dropdown.Header>
                            <Dropdown.Item href={`/profile/${user._id}`} className="dropdown-hover">
                                <MenuAvatar />
                                <span className="pl-2">Profile</span>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item as="button" onClick={onLogout}>
                                <FontAwesomeIcon icon={faUserAltSlash} />
                                <span className="pl-2">Logout</span>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
            </ul>
        </nav>
    );
}

export default Menu;