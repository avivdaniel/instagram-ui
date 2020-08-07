import React from 'react';
import { Link } from 'react-router-dom';
import './MenuMobileTop.scss';

function MenuMobileTop(props) {
    return (
        <nav className="MenuMobileTop navbar-dark d-flex d-lg-none">
            <ul className="nav justify-content-center w-100 align-items-center">
                <li className="nav-item">
                    <Link className="MenuMobileTop-brand text-decoration-none text-white" to="/">
                        Instagram
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default MenuMobileTop;