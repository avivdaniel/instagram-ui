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
                    <Link className="effect-4" to="/">
                        <FontAwesomeIcon icon={faHome} />

                        {/* <span className="sr-only">(current)</span> */}
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="shadow-drop-2-center" to="/search">
                        <FontAwesomeIcon icon={faSearch} />
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="shadow-drop-2-center" to="/post/create">
                        <FontAwesomeIcon icon={faPlusSquare} className="d-block" />
                    </Link>
                </li>
                <li className="nav-item d-lg-none">
                    <Link className="shadow-drop-2-center" to="">
                        <FontAwesomeIcon icon={faHeart} />
                    </Link>
                </li>
                <li className="nav-item d-lg-none">
                    <Link className="shadow-drop-2-center" to={`/profile/${user._id}`}>
                        <FontAwesomeIcon icon={faUser} />
                    </Link>
                </li>

                <li className="nav-item d-none d-lg-block ml-2">
                    <MenuAvatar />
                </li>
            </ul>
        </nav>
    );
}

export default Menu;