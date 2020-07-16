import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fa } from '@fortawesome/free-solid-svg-icons';
import { fab, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './AppLoader.scss';

function AppLoader(props) {
    return (

        <div className="Loader">
            <div className="Loader-container">
                <div className="Loader-spinner">
                    <FontAwesomeIcon icon={faInstagram} className="faInstagram" />
                </div>
            </div>
        </div>


    );
}

export default AppLoader;