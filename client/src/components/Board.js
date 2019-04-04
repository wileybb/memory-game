import React from "react"
import data from "../data.json"
import PictureCard from "./PictureCard"

class Board extends React.Component {
    constructor() {
        super()
        this.state = {
            score: 0,
            lastClicked: 0,
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
            const newScore = prevState.score 
            if(id = prevState.lastClicked){
                newScore++
            } 
            return { 
                score: newScore,
                lastClicked: id,
                pictures: updatedPictures 
            }

        })
    }

    render() {

        let pictureArray = data.map(item => {
            return(
                <div>
                    <PictureCard item={item} handleClick={this.handleClick}/>
                </div>
            )
        })

        return(
            <div>
                <h1>Score: {this.state.score}</h1>
                {pictureArray}
            </div>
        )
    }
}

export default Board

