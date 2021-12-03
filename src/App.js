import React, {Component} from 'react';
import './App.css';
import Navigaton from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from "./components/FaceRecognition/FaceRecognition"
import SignIn from "./components/SignIn/SignIn"
import Register from './components/Register/Register';


const particlesOption = {
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

const initalState = {
  input: "",
  imageUrl: "", 
  box: {},
  faces: [],
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
}
class App extends Component {
  constructor(){
    super()
    this.state = initalState
  }


  loadUser = (data) => {
    this.setState({user : {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
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
  }


  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input})
    fetch('https://floating-shelf-50682.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(res => res.json())
    .then(response => {
      if (response) {
        fetch('https://floating-shelf-50682.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count}))
        })
        .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => this.setState({faces: []}));
  }

  onRouteChange = (r) => {
    if (r === 'signout') {
      this.setState(initalState)
    } else if (r === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: r})
  }

  render(){
    return(
      <div className="App">
        <Particles params = {particlesOption} className = "particles" />
        <Navigaton isSignedIn={this.state.isSignedIn} onRouteChange = {this.onRouteChange}/>
        {
          this.state.route === "home"
          ? 
            <div>
              <Logo />
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm onInputChange = {this.onInputChange} onSubmit = {this.onSubmit}/>
              <FaceRecognition faces = {this.state.faces} imageUrl = {this.state.imageUrl}/>
            </div>
          : this.state.route === "signin"
            ?
            <SignIn loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
            :
            <Register loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
          
        }
      </div>
    );
  }
}


export default App;
