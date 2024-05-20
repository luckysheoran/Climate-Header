import './Main.css';
import {Component} from 'react';
import LocNotDetected from '../LocNotDetected/LocNotDetected.js'
import CurrLoc from '../CurrentLocWeather/CurrentLocWeather'
import ReqWeather from '../RequestedWeather/RequestedWeather'

class Main extends Component{

 constructor(){
    super();
    this.state={lat:null,lon:null,isLocDetected:false,reqWeather:false,cityName:null}
 }

weatherRequested(){
    console.log("Inside weather Req");

    if(this.state.reqWeather){
        this.setState({reqWeather:false},()=>{
            this.setState({reqWeather:true});
        });
    }
    else{
        this.setState({reqWeather:true});
    }
}

textFieldChange(e){
    console.log("Inside textFieldChange")
    const city=e.target.value;
    this.setState({cityName:city});
}

 componentDidMount(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
             const latitude=position.coords.latitude
             const longitude=position.coords.longitude

             this.setState({lat:latitude,lon:longitude,isLocDetected:true});

        })
    }else {
        alert("Geolocation not available");
      } 
 }

render(){

return <div className="main">
    <div className="search-box">
        <input class="text-field" onChange={(e)=>{this.textFieldChange(e)}} value={this.state.cityName}  type="text"  placeholder='Search any city'></input>

         <button class="btn" onClick={()=>{this.weatherRequested()}} >Search</button>
    </div>
    <div className="weather-block">
        
        {  (!this.state.reqWeather)? (!this.state.isLocDetected)?<LocNotDetected message={"Please allow access to your location to see the current weather report."}/>:
            <CurrLoc lat={this.state.lat} lon={this.state.lon}/>:<ReqWeather cityName={this.state.cityName}/>
        }
        
        </div>
     
</div>
}

}

export default Main;