import React, {Component} from 'react';
import './App.css';
import Navigaton from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from "./components/FaceRecognition/FaceRecognition"
import Clarifai from "clarifai"

const app =new Clarifai.App({
  apiKey: "0f0c3e5c71af4fa2b8c22bc5a2806217"
})

const particleOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    }
  },
  interactivity: {
      events: {
          onhover: {
              enable: true,
              mode: "repulse"
          }
      }
  }
}

class App extends Component {
  constructor(){
    super()
    this.state = {
      input: "",
      imageUrl: "", 
      box: {},
      faces: []
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions.map(r => r.region_info.bounding_box)
    const image = document.getElementById("inputimage")
    const height = Number(image.height)
    const width = Number(image.width)
    let resArr = []
    clarifaiFace.forEach(element => {
      resArr.push({
        leftCol: element.left_col * width,
        topRow: element.top_row * height,
        rightCol:  width - (element.right_col * width),
        bottomRow : height - (element.bottom_row * height)
      })
    });
    return resArr
  }

  displayFaceBox = (resArr) => {
    this.setState({faces:resArr})
    console.log(this.state.faces)
  }


  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then( response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch (err => console.log(err))
  }

  render(){

    return(
      <div className="App">
        <Particles params = {particleOptions} className = "particle" />
        <Navigaton />
        <Logo />
        <Rank/>
        <ImageLinkForm onInputChange = {this.onInputChange} onSubmit = {this.onSubmit}/>
        <FaceRecognition faces = {this.state.faces} imageUrl = {this.state.imageUrl}/>
      </div>
    );
  }
}


export default App;
