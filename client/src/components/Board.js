import React from "react"
import data from "../data.json"
import PictureCard from "./PictureCard"

class Board extends React.Component {
    constructor() {
        super()
        this.state = {
            headerText: "",
            lastClickedType: null,
            lastClickedToken: null,
            pictures: data,
            score: 0

        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(clickedItem) {
        console.log(clickedItem.typeId)
        console.log(clickedItem.tokenId)
        this.setState(prevState=>{
            const updatedPictures = prevState.pictures.map(item => {
                if(item.tokenId === clickedItem.tokenId) {
                    item.clicked = !item.clicked
                }
                return item
            })
            if(prevState.lastClickedToken === null){
                // it is the players first guess... 
                return {
                    headerText: "Try to find a match...",
                    lastClickedType: clickedItem.typeId,
                    lastClickedToken: clickedItem.tokenId,
                    pictures: updatedPictures,
                    score: prevState.score
                }
            }else {
                //it is the players second guess...

                let hiddenPictures = []
                if(prevState.lastClickedType === clickedItem.typeId && prevState.lastClickedToken != clickedItem.tokenId){
                    //in the case the second guess was correct...
                    hiddenPictures = prevState.pictures.map(item => {
                        item.clicked = false
                        if(item.typeId === clickedItem.typeId){
                            item.matched = true
                        }
                        return item
                    })

                    return { 
                        headerText: "You found a match!",
                        lastClickedToken: null,
                        lastClickedType: null,
                        pictures: hiddenPictures,
                        score: prevState.score + 1
                        }   
                } else {
                    //in the case the second guess was incorrect...
                    hiddenPictures = prevState.pictures.map(item => {
                        item.clicked = false
                        return item
                    })
                    return {
                        headerText: "Incorrect, try again",
                        lastClickedToken: null,
                        lastClickedType: null,
                        pictures: hiddenPictures,
                        score: prevState.score
                    }
                }

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
                <h1>{this.state.headerText}</h1>
                {pictureArray}
            </div>
        )
    }
}

export default Board

