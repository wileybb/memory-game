import React from "react"

// function handleClick() {
//     console.log("heyo bdayo")
//     // console.log(this.props.item.id)
// }
function PictureCard(props) {
    // function handleClick(id) {
    //     console.log("you clicked picture", id)
    // }
    if(props.item.clicked === false){
        return(
            
            <div>
                <h1>{props.item.id}</h1>
                <img 
                    onClick={()=>props.handleClick(props.item.id)} 
                    src={props.item.image}
                />
            
            </div>
        )
    } else {
        return(
            <div>
                <h1>{props.item.id}</h1>
                <img 
                    onClick={()=>props.handleClick(props.item.id)} 
                    src={props.item.image}
                    style={{opacity: .5}}
                />
            </div>
        )
    }
}

export default PictureCard