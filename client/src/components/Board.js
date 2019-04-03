import React from "react"
import data from "../data.json"
import PictureCard from "./PictureCard"

class Board extends React.Component {
    constructor() {
        super()
        this.state = {
            pictures: data
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(id) {
        console.log("clicked",id)
    }

    render() {

        let pictureArray = data.map(item => {
            return(
                <PictureCard item={item} handleClick={this.handleClick}/>
            )
        })

        return(
            <div>
                {pictureArray}
            </div>
        )
    }
}

export default Board

