import React from "react"
import data from "../data.json"
import PictureCard from "./PictureCard"
import Header from "./Header"

class Board extends React.Component {
    constructor() {
        super()
        this.state = {
            headerText: "Click a card to reveal an image",
            lastClickedType: null,
            lastClickedToken: null,
            pictures: data,
            score: 0,
            timeOut: false,

        }
        this.handleClick = this.handleClick.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.resetGame = this.resetGame.bind(this)
    }
    resetGame() {
        // const shuffledPictures = this.shuffleData(data)
    
        const shuffledHiddenPictures = this.shuffleData(data).map(item => {
            item.clicked = false
            item.matched = false
            return item
        })
        
        this.setState({ 
            pictures: shuffledHiddenPictures,
            lastClickedType: null,
            lastClickedToken: null,
            score: 0,
            headerText: "Click a card to reveal an image"

        });
    }
    componentDidMount() {
        this.resetGame()
    }

    shuffleData = data => {
        let i = data.length - 1;
        while (i > 0) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = data[i];
          data[i] = data[j];
          data[j] = temp;
          i--;
        }
        return data;
    };
    hideWrongGuessAfterTimeout(){
        setTimeout(() => this.setState(prevState=>{
            const hidePictures = prevState.pictures.map(item => {
                item.clicked = false
                return item
            })
            return{
                pictures: hidePictures,
                timeOut: false
            }
        }), 2000);
    }

    handleClick(clickedItem) {
        console.log(clickedItem.typeId)
        console.log(clickedItem.tokenId)
        // if(this.state.lastClickedToken === null){
        //     console.log("first guess")
        // } else {
        //     console.log("second guess")
        // }
        if(!this.state.timeOut){
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
                    if(prevState.lastClickedType === clickedItem.typeId && prevState.lastClickedToken !== clickedItem.tokenId){
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
                                    if(item.tokenId === clickedItem.tokenId){
                                        item.clicked = true
                                    }
                                    return item
                                })

                                this.hideWrongGuessAfterTimeout()
                    
                                return {
                                    headerText: "Try again",
                                    lastClickedToken: null,
                                    lastClickedType: null,
                                    pictures: hiddenPictures,
                                    score: prevState.score,
                                    timeOut: true
                                }
                                
                        
                        
                    }

                }

                
                    
                

            })
        }
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
                <nav>
                    <Header text={this.state.headerText} score={this.state.score} />
                    <button onClick={this.componentDidMount}>Reset Game</button>
                </nav>
                <container>
                    {pictureArray}
                </container>
            </div>
        )
    }
}

export default Board

