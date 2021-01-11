import React, { Component } from 'react';

class Exchange extends Component {

  state = {
    us: null,
    europe: null
  }

  componentDidMount = () => {
    const URL = "https://cors-anywhere.herokuapp.com/https://v2.api.forex/rates/latest.json?from=INR&key=demo";
    fetch(URL, {mode: 'cors'}).then(res => res.json()).then(data => {
      console.log(data)
      console.log(data.rates.ATS)
      this.setState({
        us: data.rates.ATS,
        europe: data.rates.SIT
      })
    })
  }

  render(){
    return(
    <div className="mt-5">
      <h1>Exchange rates</h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Currency</th>
            <th scope="col">Price</th>
            <th scope="col">%change</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>EURUSD</td>
            <td>{this.state.us}</td>
            <td>no data</td>
          </tr>
          <tr>
            <td>USDCHF</td>
            <td>{this.state.europe}</td>
            <td>no data</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
  }
}

export default Exchange;