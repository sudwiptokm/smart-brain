import React from "react";

const Navigaton = ({onRouteChange, isSignedIn}) => {
    if (isSignedIn) {
		return (
			<nav className = "justify-end flex">
                <p onClick = {() => onRouteChange("signout")} className = "link f3 white b grow underline pointer pa3 code ttu">Sign Out</p>
            </nav>
		);
	} else {
		return (
			<nav className = "justify-end flex">
				<p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer white b'>sign in</p>
				<p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer white b'>create account</p>
			</nav>
		);
	}
}

export default Navigaton