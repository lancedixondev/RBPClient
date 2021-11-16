import React, {Component} from 'react';
//import Weather from './weather'

let key = '1681d6edceaa1f250ce0b4287d023abd'

type Coords = {
    latitude: any,
    longitude: any,
    temp: any,
    humidity: any,
    weather: any
}

export default class Location extends Component <{},Coords>{
    constructor(props: Coords){
        super(props)
        this.state = {
            latitude: '',
            longitude: '',
            temp: '',
            humidity: '',
            weather: ''
        }
    }

    getLocation = async () => {
        navigator.geolocation.getCurrentPosition(response => { this.setState({latitude: response.coords.latitude, longitude: response.coords.longitude})})

    }

    weather =  () => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&appid=${key}&units=imperial`)
        .then(response =>  response.json())
        .then(res => {
            this.setState({
              temp: res.main.temp,
              humidity: res.main.humidity,
              weather: res.weather[0].description
              
            })
          })
        .catch((err) => console.log(err))

        
        
        
    }

    
    componentDidMount(){
        this.getLocation()

    }

    componentDidUpdate(prevProps: any, prevState: { latitude: any; longitude: any; }){
        if(prevState.latitude !== this.state.latitude && prevState.longitude !== this.state.longitude){
            this.weather()
        }
    }


    render(){
        return(
            <div>
                {this.state.latitude} <br/>
                {this.state.longitude} <br/>
                <p>Temp: {this.state.temp}</p><br/>
                <p>Humidity: {this.state.humidity}</p><br/>
                <p>Weather: {this.state.weather}</p>
            
            
            </div>
        )
    }
}



// navigator.geolocation.getCurrentPosition(response => {return response.coords.latitude})

