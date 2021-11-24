import React from "react";
import "./ImageLinkForm.css"

const ImageLinkForm = () => {
    return(
        <div>
            <p className = "white b f2 ">{"Please Upload your file to detect faces"}</p>
            <div className="center pa4 br3 shadow-5 form">
                <input type = "text" placeholder = "Your Image Link" className = "w-70 f4 pa2 center br3 bn mr2"></input>
                <button className="grow w-30 f4 link ph3 pv2 dib black bg-light-blue br3 bn ml2">Detect</button>
            </div>            
        </div>
        
    );
}

export default ImageLinkForm