import React from 'react';
import NavMessage from '../NavMessage/NavMessage';
import './style.css';

function Nav(props) {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    Score:{props.score} | Top Score:{props.topScore}
                </li>
                <li>
                    <NavMessage score={props.score} topScore={props.topScore} />
                </li>
            </ul>
        </nav>
    );
}

export default Nav;