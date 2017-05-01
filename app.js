const api = require( './api.js' ),
      $   = require( 'jquery' );

let users = api.getUsers();

const fxRates = require( './fx_rates.js' );
let welcomeUser = require('./welcomeUser.coffee');

fxRates( 'USD', (data) => {
  console.log( data );
});

$.each(users, (index, user)=> {
  $(document.body).append( index + "<p> name " + user.name + ' age ' + user.age + "</p>");
});

welcomeUser('Jones');