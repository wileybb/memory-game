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
        this.setState(prevState=>{
            const updatedPictures = prevState.pictures.map(item => {
                
                if(item.id === id) {
                    item.clicked = !item.clicked
                }
                return item
                
            })

            return { pictures: updatedPictures }

        })
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

