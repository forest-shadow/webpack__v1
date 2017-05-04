import React, { Component } from 'react';
import getFxRates from 'fx_rates';
require('./style');

export default class FxRatesComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fixerResponse: []
    };
  }

  componentDidMount() {
    getFxRates( this.props.baseCurrency, fixerResponse => {
      this.setState({
        fixerResponse
      });
    });
  }

  render() {
    let dailyRates = [];
    const { fixerResponse: { rates } } = this.state;
    const { fixerResponse: { date } } = this.state;

    const { baseCurrency } = this.props;

    for(const currency in rates) {
      const rate = rates[currency];
      dailyRates.push( <li className="list-group-item" key={ currency }>{currency} - <i className={ `fa fa-${baseCurrency.toLowerCase()}` } aria-hidden="true"></i>  {rate}</li> );
    }

    return(
      <div id="fxContainer">
        <h3>Base - <i className={ `fa fa-${baseCurrency.toLowerCase()}` } aria-hidden="true"></i> { baseCurrency }</h3>
        <h4>Date - <i className="fa fa-calendar" aria-hidden="true"></i> { date }</h4>
        <ul className="list-group">
          { dailyRates }
        </ul>
      </div>
    );
  }
}
