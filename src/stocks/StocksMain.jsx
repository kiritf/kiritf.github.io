const React = require('react');
const ReactDOM = require('react-dom');
const Stocks = require('./Stocks.jsx');

module.exports = () => {
  ReactDOM.render(
    <Stocks />,
    document.getElementById('main')
  );
};
