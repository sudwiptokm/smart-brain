import React, {Component} from 'react';
import './App.css';
import Navigaton from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';

const particleOptions = {
  "particles": {
      "number": {
          "value": 50,
          "density":{
            "enable" : true,
            "value_area": 800
          }
      },
      "size": {
          "value": 3
      }
  },
  "interactivity": {
      "events": {
          "onhover": {
              "enable": true,
              "mode": "repulse"
          }
      }
  }
}


class App extends Component {
  render(){
    return(
      <div className="App">
        <Particles params = {particleOptions} className = "particle" />
        <Navigaton />
        <Logo />
        <Rank/>
        <ImageLinkForm />
        {/* <FaceRecognition /> */}
      </div>
    );
  }
}


export default App;
