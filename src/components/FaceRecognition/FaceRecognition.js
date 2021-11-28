import React from "react";
import "./FaceRecognition.css"

const FaceRecognition = ({faces, imageUrl}) => {
    // console.log(faces===undefined)
    var single = faces.map((face,i) =>  <div className = "bounding-box" key={i} style = {{top:face.topRow, right: face.rightCol, left: face.leftCol, bottom:face.bottomRow}}></div>)
    
    return(
        <div className = "center ma">
            <div className = "absolute mt2" >
                <img id="inputimage" alt = "" src = {imageUrl} width = "500px" height = "auto"/>
                <div>{single}</div>
            </div>
        </div>
        
    );
}

export default FaceRecognition