import React, { useEffect, useCallback } from 'react'
import Key from '../Key/';
import './style.css';

const keys = [
    { 'letter': 'Q', 'name': "boom", 'color': 'blue' },
    { 'letter': 'W', 'name': "clap", 'color': 'green' },
    { 'letter': 'E', 'name': "hihat", 'color': 'yellow' },
    { 'letter': 'A', 'name': "kick", 'color': 'pink' },
    { 'letter': 'S', 'name': "openhat", 'color': 'green' },
    { 'letter': 'D', 'name': "ride", 'color': 'blue' },
    { 'letter': 'Z', 'name': "snare", 'color': 'yellow' },
    { 'letter': 'X', 'name': "tink", 'color': 'pink' },
    { 'letter': 'C', 'name': "tom", 'color': 'green' }
];

function Drum() {
    const handleUserKeyPress = useCallback(event => {
        const { key, keyCode } = event;
        if (keyCode === 32 || (keyCode >= 65 && keyCode <= 90)) {
            const keys = Array.from(document.querySelectorAll('.clip'));
            keys.forEach(pad => {
                if (pad.getAttribute('id').toLowerCase() === key.toLowerCase()) {
                    pad.parentElement.classList.remove("clicked");
                    setTimeout(() => {
                        pad.parentElement.classList.add("clicked");
                    }, 100);
                    const display = document.getElementById("display");
                    display.textContent = pad.getAttribute("data-name");
                    pad.currentTime = 0;
                    pad.play()
                }
            });
        }
    }, []);
    useEffect(() => {
        window.addEventListener('keydown', handleUserKeyPress);

        return () => {
            window.removeEventListener('keydown', handleUserKeyPress);
        };
    }, [handleUserKeyPress]);
    return (
        <div id="container">
            <div className="row">
                <span id="display">Start pressing a key to get started</span>
            </div>
            <div className="row">
                {keys.map((key, i) => {
                    return [<Key color={key.color} name={key.name} key={i} letter={key.letter} />];
                })}
            </div>
        </div>
    )
}

export default Drum
