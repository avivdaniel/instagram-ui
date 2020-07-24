import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './PageLoader.scss';

function PageLoader(props) {
    return (
        <div className='PageLoader'>

            <FontAwesomeIcon className='faSpinner' icon={faSpinner} size="2x" style={{ color: '#00b7d6' }} spin />

        </div>
    );
}

export default PageLoader;