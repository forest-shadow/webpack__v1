//style
require('./styles/main');

// scripts
const api         = require( 'Api/users' ),
      $           = require( 'jquery' ),
      fxRates     = require( 'fx_rates' ),
      welcomeUser = require('welcomeUser' );
require( 'reactApp' );
require( 'typescript/appConfig' );

let users = api.getUsers();

fxRates( 'USD', data => console.log( data ) );

// $.each(users, (index, user) => $(document.body).append( `<p>${index} - name ${user.name} age ${user.age}</p>`)
// );
welcomeUser('Jones');
