import React from "react"


function PictureCard(props) {


    if(props.item.clicked === true || props.item.matched === true){
        return(
            
            <div className="pictureCard">
                <h1>{props.item.tokenId}</h1>
                <img 
                    onClick={()=>props.handleClick(props.item)} 
                    src={props.item.image}
                />
            
            </div>
        )
    } else {
        return(
            <div className="pictureCard">
                <h1>{props.item.tokenId}</h1>
                <img
                    className ={props.item.clicked?'fadeIn':'fadeOut'}
                    onClick={()=>props.handleClick(props.item)} 
                    src={props.item.image}
                    // style={{opacity: .25}}
                />
            </div>
        )
    }
}

export default PictureCard