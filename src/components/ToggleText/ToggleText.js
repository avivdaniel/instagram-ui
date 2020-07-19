
import React, { useState, Fragment } from 'react';
import ReactDOM from 'react-dom';

function ToggleText({ text, maxLength }) {

    const [isHidden, setisHidden] = useState(true);
    const [isShorter] = useState(text.length < maxLength)

    console.log(isShorter);
    const cuttingWords = () => {
        let chortenText = text.substr(0, maxLength);
        if (text.length <= maxLength) {
            return text;
        }
        if (chortenText.charAt(maxLength) === ' ') {
            return chortenText;
        }
        return chortenText.substr(0, chortenText.lastIndexOf(' ')) + ' ...';
    }

    return (
        <p>
            {!isHidden ? text : cuttingWords()}
            {!isShorter && <a className='text-secondery ml-1' onClick={() => setisHidden(!isHidden)}>
                {isHidden ? 'more' : 'less'}
            </a>}
            {/* {!isHidden ? (
                <a className='text-secondery ml-1' onClick={() => setisHidden(true)}>less</a>
            ) : (
                    <a className='text-secondery ml-1' onClick={() => setisHidden(false)}>more</a>
                )} */}
        </p>
    );
}

export default ToggleText;
