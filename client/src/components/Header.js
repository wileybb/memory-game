import React from "react"

function Header (props) {
    return(
        <div>
            <h1>Memory Game</h1>
            <h2>{props.text}</h2>
            <h3>Matches Found: {props.score}</h3>
        </div>
    )
}

export default Header;