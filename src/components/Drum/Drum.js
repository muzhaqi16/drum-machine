import React, { useEffect, useCallback } from 'react'
import Key from '../Key/';
import './style.css';

// const keys = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'];
import sounds from '../../sounds';

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
                    display.textContent = pad.getAttribute("id");
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
            {/* {display} */}
            <div className="row">
                <span id="display">Start pressing a key to get started</span>
            </div>
            <div className="row">
                <Key color="blue" sound={sounds.boom} letter="Q" />
                <Key color="yellow" sound={sounds.clap} letter="W" />
                <Key color="green" sound={sounds.hihat} letter="E" />

            </div>
            <div className="row">
                <Key color="pink" sound={sounds.kick} letter="A" />
                <Key color="blue" sound={sounds.openhat} letter="S" />
                <Key color="yellow" sound={sounds.ride} letter="D" />
            </div>
            <div className="row">
                <Key color="green" sound={sounds.snare} letter="Z" />
                <Key color="pink" sound={sounds.tink} letter="X" />
                <Key color="pink" sound={sounds.tom} letter="C" />
            </div>
        </div>
    )
}

export default Drum
