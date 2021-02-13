import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import SignIn from './components/SignIn/SignIn.js';
import Register from './components/Register/Register.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import Rank from './components/Rank/Rank.js'


const particlesOptions = {
  particles: {  
    number: {
        value: 120,
        density: {
            enable: true,
            value_area: 800
        }   
    }
  }
}

const initialState = {
        searchfield : '',
        imageUrl : '',
        box: {},
        route: 'signin',
        isSignedIn: false,
        user:{
          id: '',
          name:'',
          email: '',
          entries: 0,
          joined: ''
        }
}

class App extends Component {
  constructor(){
    super()
    this.state = initialState;
  }

  loadUser = (data) =>{
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
   //console.log(this.state.user);
  }

  calculateFaceLocation = (data) => {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return{
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow : height - (clarifaiFace.bottom_row * height)
       // leftCol: clarifaiFace.left_col * 100 + '%',
       // topRow: clarifaiFace.top_row * 100 + '%',
        //rightCol: clarifaiFace.right_col * 100 + '%',
        //bottomRow :clarifaiFace.bottom_row * 100 +'%'
      }
  }

  displayFaceBox =(box) => {
    this.setState({box: box});
  }

  onSearchChange = (event) => {
    this.setState({searchfield: event.target.value})
  }

  onButtonClick = (event) =>{
    this.setState({imageUrl: this.state.searchfield});
      fetch('http://localhost:3000/imageurl',{
            method: 'post',
            headers :{'Content-Type': 'application/json'},
            body: JSON.stringify({
              input : this.state.searchfield
            })
          })
      .then(response => response.json())  
      .then(response => {
        if(response){
          fetch('http://localhost:3000/image',{
            method: 'put',
            headers :{'Content-Type': 'application/json'},
            body: JSON.stringify({
               id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            // in order not to change the state of the entire user
           this.setState(Object.assign(this.state.user, {entries: count}))
            /*this.setState({user:{
              entries: count
            }})*/
          })
          .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));

  }

  onRouteChange = (route) =>{

      if(route === 'home')
        this.setState({isSignedIn: true})
       else 
        this.setState(initialState)

      this.setState({route: route});
  }
  
  render() {
    //const {isSignedIn, imageUrl, route, box} = this.state; - destructuring 
    return(
      <div className="App">

        <Particles className='particles' params={particlesOptions}/>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        { this.state.route === 'home' ?
            <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm onSearchChange={this.onSearchChange} onButtonClick={this.onButtonClick}/>
              <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
            </div>
            :( this.state.route === 'signin' ?
                <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
                : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
            )
                
            
        }
      </div>
    
   );
  }
}

export default App;
