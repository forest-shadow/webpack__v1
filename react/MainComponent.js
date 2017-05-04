import React, { Component } from 'react';
import UsersComponent from './UsersComponent';
import FxRatesComponent from './FxRatesComponent';

export default class MainComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="container">
        <div>
          <h1><i className="fa fa-user-circle-o" aria-hidden="true"></i> Users</h1>
          <UsersComponent/>
        </div>
        <div>
          <h1><i className="fa fa-exchange" aria-hidden="true"></i> Daily Fx Rates</h1>
          <FxRatesComponent baseCurrency ='USD' />
        </div>
      </div>
    );
  }
}