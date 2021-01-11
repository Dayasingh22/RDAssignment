import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import WeekContainer from './WeekContainer';
import Exchange from "./exchange";

import CurrentLocation from './Map';

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <div className="row">
      <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
        className="col-8"
      >
        <Marker onClick={this.onMarkerClick} name={'Current Location'} />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </CurrentLocation>
      <div className="col-6">
        <WeekContainer />
        <div>
        <Exchange />
      </div>
      </div> 
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAwM64DXX6g5Zbpeimp50m6k5VCLjYy87U'
})(MapContainer);