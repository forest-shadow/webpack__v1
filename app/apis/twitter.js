const mockTweets = require('./mocks/MOCK_DATA');

console.log(mockTweets);
module.exports = {
  getTweets() {
    return mockTweets;
  },
  getTweetsCount() {
    return mockTweets.length;
  }
};