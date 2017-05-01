let $ = require( 'jquery' );

module.exports = function( baseCurrency, callback ) {
  $.getJSON( 'http://api.fixer.io/latest?base=' + baseCurrency, (fxRates) => {
    callback( fxRates );
  } );
};