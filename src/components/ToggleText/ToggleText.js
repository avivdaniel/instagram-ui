
import React, { useState } from 'react';

function ToggleText({ text, maxLength }) {

    const [isHidden, setisHidden] = useState(true);
    const [isShorter] = useState(text.length < maxLength)

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
        <p className="ToggleText d-inline-block m-0">
            {!isHidden ? text : cuttingWords()}
            {!isShorter && <a className='text-secondary ml-1' onClick={() => setisHidden(!isHidden)}>
                {isHidden ? 'more' : 'less'}
            </a>}
        </p>
    );

}

export default ToggleText;
