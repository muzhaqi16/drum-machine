import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';

import './style.css';
function Key(props) {
    const [click, setClick] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setClick(false);
        }, 100);
        return () => clearTimeout(timer);
    }, [click]);

    const handleClick = (e) => {
        const audio = e.target.children[0];
        if (audio) {
            audio.currentTime = 0;
            audio.play();
            const display = document.getElementById("display");
            display.textContent = audio.getAttribute("data-name");
        }
        setClick(true);
    }
    return (
        <div className="column">
            <div id={props.letter} className={'drum-pad box ' + props.color + (click ? "" : " clicked")} onClick={handleClick}>
                <audio className="clip" id={props.letter} data-name={props.name}
                    src={require('../../sounds/' + props.name + ".wav")}>
                    Your browser does not support the
                    <code>audio</code> element.
                </audio>
                {props.letter}
            </div>
        </div>
    )
}
Key.propTypes = {
    color: PropTypes.string
}
Key.defaultProps = {
    color: 'green'
}
export default Key
