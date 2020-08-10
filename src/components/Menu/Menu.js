import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../user-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faPlusSquare, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import MenuAvatar from './MenuAvatar/MenuAvatar';
import './Menu.scss';


function Menu(props) {
    const { user } = useContext(UserContext);
    return (
        <nav className="Menu navbar-dark d-flex">
            <a className="Menu-brand navbar-brand" href="/">Instagram</a>
            <ul className="nav justify-content-around justify-content-lg-end w-100 align-items-center mr-auto">
                <li className="nav-item">
                    <Link className="navlink-title" to="/">
                        <FontAwesomeIcon icon={faHome} className="Menu-icon-animation" />

                        {/* <span className="sr-only">(current)</span> */}
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
                    <Link className="navlink-title" to={`/profile/${user._id}`}>
                        <FontAwesomeIcon icon={faUser} className="Menu-icon-animation" />
                    </Link>
                </li>
                {/* 
                <li className="nav-item d-none d-lg-block ml-2">
                    <MenuAvatar />
                </li> */}
            </ul>
        </nav>
    );
}

export default Menu;