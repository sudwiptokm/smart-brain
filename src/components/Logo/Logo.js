import React from "react";
import Tilt from 'react-tilt'
import "./Logo.css"
import logo from "./Logo.png"

const Logo = () => {
    return(
        <div className = "ma4 mt0">
            {/* <Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 250, width: 250 }} > */}
            <Tilt className="Tilt" options={{ max : 25 }} style={{ height: 250, width: 250 }} >
                <div className="Tilt-inner pa3"> <img className="pt-mine" src = {logo} alt = "logo" style={{ height: 200, width: 200 }}/></div>
            </Tilt>
        </div>
    );
}

export default Logo