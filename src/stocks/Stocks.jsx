
const React = require('react');
const W3CWebSocket = require('websocket').w3cwebsocket;
require('./stocks.css');

let client;

class Stocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }
  componentWillMount() {
    client = new W3CWebSocket('ws://stocks.mnet.website', 'echo-protocol');
  }
  componentDidMount() {
    const self = this;
    client.onmessage = function onMessage(e) {
      if (typeof e.data === 'string') {
        const data = JSON.parse(e.data);
        self.updateState(data);
      }
    };
  }
  updateData(newData) {
    const dataObj = {};
    const currentState = Object.assign({}, this.state.data);
    Object.keys(currentState).forEach((key) => {
      currentState[key].bgColor = '';
    });
    newData.forEach((stock) => {
      const key = stock[0];
      const value = stock[1];
      const lastUpdated = new Date().getTime();
      let bgClass = '';
      if (!currentState[key]) bgClass = '';
      else if (currentState[key].value < value) bgClass = 'bgGreen';
      else if (currentState[key].value > value) bgClass = 'bgRed';
      dataObj[key] = { value, lastUpdated, bgClass };
    });
    return Object.assign(currentState, dataObj);
  }
  updateState(newData) {
    const data = this.updateData(newData);
    this.setState({ data });
  }
  render() {
    const tableValues = Object.keys(this.state.data).map((key) => (
      <tr key={key} className={this.state.data[key].bgClass}>
        <th scope="row">{key}</th>
        <td>{this.state.data[key].value.toFixed(3)}</td>
        <td>{`${((
          new Date().getTime() - this.state.data[key].lastUpdated) / 1000
          ).toFixed(2)} seconds ago`}</td>
      </tr>));
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Price</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {tableValues}
        </tbody>
      </table>
    );
  }
}
module.exports = Stocks;
