import React from 'react';
import apiConfig from './apiKeys';
import DayCard from "./Card";

class WeekContainer extends React.Component {
  state = {
    fullData: [],
    dailyData: [],
    lat: undefined,
    lon: undefined
  }

  getPosition = (options) => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };


  componentDidMount = () => {
    if (navigator.geolocation) {
      this.getPosition()
        //If user allow location service then will fetch data & send it to get-weather function.
        .then((position) => {
          this.setState({lat: position.coords.latitude, lon: position.coords.longitude})
        })
        .catch((err) => {
          //If user denied location service then standard location weather will le shown on basis of latitude & latitude.
          this.setState({lat:28.77, lon:77.22})
          alert(
            "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
          );
        });
    } else {
      alert("Geolocation not available");
    }

    const weatherURL =
    `http://api.openweathermap.org/data/2.5/forecast?lat=30.24&lon=77.04&units=imperial&APPID=${apiConfig.key}`

    fetch(weatherURL)
    .then(res => res.json())
    .then(data => {
      const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
      this.setState({
        fullData: data.list,
        dailyData: dailyData
      }, () => console.log(this.state))
    })
  }

  formatDayCards = () => {
    return this.state.dailyData.slice(0, 3).map((reading, index) => <DayCard reading={reading} key={index} />)
  }

  getIcon = () => {
    let icon;
     this.state.dailyData.slice(0,1).map((reading) => {
      icon = `https://openweathermap.org/img/w/${reading.weather[0].icon}.png`;
    })
    return icon;
  }

  render() {
    return (
      <div className="container text-center">
      <div className="jumbotron text-center">
       <h5>Mullana, Ambala</h5> 
      <div className="row d-flex justify-content-center">
        <img src={this.getIcon()} alt="icon"/>
        <h5 className="mt-2 text-center">{this.state.dailyData.slice(0,1).map((reading) => {
          return (
            Math.round(reading.main.temp)
          )
        })} °F</h5>
      </div>
      </div>
      <button className="btn btn-outline-success mb-3">
        Next 3 Days Forecast
      </button>
        <div className="row justify-content-center">

          {this.formatDayCards()}

        </div>
      </div>
    )
  }
}

export default WeekContainer;
