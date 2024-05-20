import './RequestedWeather.css'
import {Component} from 'react'
import ReactAnimatedWeather from "react-animated-weather";
import LocNotDetected from '../LocNotDetected/LocNotDetected';

const defaults = {
  color: "white",
  size: 112,
  animate: true,
};

class RequestedWeather extends Component{

constructor(props){
    super();
     
    this.state={
        tempC:null,
        tempF:null,
        weather:null,
        desc:null,
        humidity:null,
        windSpeed:null,
        city:null,
        country:null,
        icon:null,
        errorMsg:null
    }
}

componentDidMount(){
    console.log("Inside Mount")
         const url=`https://api.openweathermap.org/data/2.5/weather?q=${this.props.cityName}&appid=dbeefb4a696845a0a00074bdc1259f76`
         fetch(url).then(data=>data.json()).then((data)=>{
            this.setState({
                tempC:Math.round(data.main.temp -273),
                tempF:Math.round(data.main.temp * 1.8 + 32),
                weather:data.weather[0].main,
                desc:data.weather.description,
                humidity:data.main.humidity,
                windSpeed:data.wind.speed,
                city:data.name,
                country:data.sys.country,
            },()=>{
              switch (this.state.weather) {
                case "Haze":
                  this.setState({ icon: "CLEAR_DAY" });
                  console.log("inside switch")
                  break;
                case "Clouds":
                  this.setState({ icon: "CLOUDY" });
                  console.log("inside switch")
                  break;
                case "Rain":
                  this.setState({ icon: "RAIN" });
                  console.log("inside switch")
                  break;
                case "Snow":
                  this.setState({ icon: "SNOW" });
                  console.log("inside switch")
                  break;
                case "Dust":
                  this.setState({ icon: "WIND" });
                  console.log("inside switch")
                  break;
                case "Drizzle":
                  this.setState({ icon: "SLEET" });
                  console.log("inside switch")
                  break;
                case "Fog":
                  this.setState({ icon: "FOG" });
                  console.log("inside switch")
                  break;
                case "Smoke":
                  this.setState({ icon: "FOG" });
                  console.log("inside switch")
                  break;
                case "Tornado":
                  this.setState({ icon: "WIND" });
                  console.log("inside switch")
                  break;
                default:
                  this.setState({ icon: "CLEAR_DAY" }, () => 
                         console.log(this.state.yourName));;
                  console.log("inside switch clearday")
              }
            })
         }).catch((err)=>{
           this.setState({errorMsg:"City not found.Please check the spelling of the city name and then try again."});
           
         })
          
         
          
        console.log("called req")
         console.log(this.state.icon)
}

render(){
    {console.log("Inside render")}
    return <div className="curr-weather-box">
     {
     (!this.state.errorMsg)?<div>
     <div className="weather-icon-both">

<div className="icon">
<ReactAnimatedWeather
       icon={this.state.icon}
       color={defaults.color}
       size={defaults.size}
       animate={defaults.animate}
     />
</div>
<div className="weather-city-both">
<div className="weather">
   <p>{this.state.weather}</p>
</div>
<div className="city-country">
   <p>{this.state.city},{this.state.country}</p>
</div>
</div>
</div>

<div className="temp">
<div className="temp-key">
 <p>Temperature</p>
   <p>Humidity</p>
   <p>WindSpeed</p>
</div>
<div className="temp-value">
   <p>{this.state.tempC}°<span>C</span></p>
   <p>{this.state.humidity}%</p>
   <p>{this.state.windSpeed}km/h</p>
</div>
</div>

     </div>
   :
   <LocNotDetected message={this.state.errorMsg}/>
    
    
    }
      
   </div>
}

}

export default RequestedWeather;