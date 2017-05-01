let api = require( './api.js' ),
    $ = require( 'jquery' );

let users = api.getUsers();

$.each(users, (index, user)=> {
  $(document.body).append( index + "<p> name " + user.name + ' age ' + user.age + "</p>");
});