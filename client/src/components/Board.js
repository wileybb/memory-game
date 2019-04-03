import React from "react"
import data from "../data.json"

class Board extends React.Component {
    constructor() {
        super()
        this.state = {
            pictures: data
        }
    }

    render() {
        return(
            <h1>h1 </h1>
        )
    }
}

export default Board

