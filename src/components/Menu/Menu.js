import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../user-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faPlusSquare, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import './Menu.scss';
import MenuAvatar from './MenuAvatar/MenuAvatar';

function Menu(props) {
    const { user } = useContext(UserContext);
    return (
        <nav className="Menu navbar-dark d-flex">
            <a className="Menu-brand navbar-brand" href="#">Instagram</a>
            <ul className="nav justify-content-around justify-content-lg-start w-100 align-items-center mr-auto">
                <li className="nav-item">
                    <Link className="effect-4" to="/">
                        <FontAwesomeIcon icon={faHome} className="d-lg-none" />
                        <span className="navlink-title">Home</span>
                        {/* <span className="sr-only">(current)</span> */}
                    </Link>
                </li>
                <li className="nav-item d-lg-none">
                    <Link className="effect-4" to="">
                        <FontAwesomeIcon icon={faSearch} />
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="effect-4" to="/post/create">
                        <span className="navlink-title d-none d-lg-block">Create Post</span>
                        <FontAwesomeIcon icon={faPlusSquare} className="d-block d-lg-none" />
                    </Link>
                </li>
                <li className="nav-item d-lg-none">
                    <Link className="effect-4" to="">
                        <FontAwesomeIcon icon={faHeart} />
                    </Link>
                </li>
                <li className="nav-item d-lg-none">
                    <Link className="effect-4" to="/profile">
                        <FontAwesomeIcon icon={faUser} />
                    </Link>
                </li>
                <li className="nav-item d-none d-lg-block ml-auto">
                    <Link className="" to="">
                        <MenuAvatar size='md' />
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Menu;