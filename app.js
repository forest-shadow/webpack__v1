const api         = require( './api.js' ),
      $           = require( 'jquery' ),
      fxRates     = require( './fx_rates.js' ),
      welcomeUser = require('./welcomeUser.coffee'),
      ReactApp    = require( './react/ReactApp.js');

let users = api.getUsers();

fxRates( 'USD', data => console.log( data ) );

// $.each(users, (index, user) => $(document.body).append( `<p>${index} - name ${user.name} age ${user.age}</p>`)
// );

welcomeUser('Jones');