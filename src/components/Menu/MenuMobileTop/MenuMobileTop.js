import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../user-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faCamera } from '@fortawesome/free-solid-svg-icons'
import MenuAvatar from '../MenuAvatar/MenuAvatar';
import './MenuMobileTop.scss';

function MenuMobileTop(props) {
    const { user } = useContext(UserContext);
    return (
        <nav className="MenuMobileTop navbar-dark d-flex d-lg-none">
            <ul className="nav justify-content-between justify-content-lg-start w-100 align-items-center mr-auto">
                <li className="nav-item">
                    <Link className="text-white" to="">
                        <FontAwesomeIcon icon={faCamera} />
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="MenuMobileTop-brand text-white" to="/">
                        Instagram
                    </Link>
                </li>
                <li className="nav-item d-lg-none">
                    <Link className="text-white" to="">
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default MenuMobileTop;