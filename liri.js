var dotenv = require("dotenv").config();
var keys = require("./keys");
var Spotify = require('node-spotify-api');

//If no song is provided then the program will default to "The Sign" by Ace of Base.
function spotifyFunction(song) {
  if (!song) {
    song = "The Sign";
  }
//search key to find the tracks
  var spotify = new Spotify(keys.spotify);
  spotify.search({ type: 'track', query: song }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    
    output = "-- LIRI FOUND THIS FOR YOU: --"+ "\r\n" + 
    "Song Name: " + "'" + song.toUpperCase() + "'"  + "\r\n" + 
    "Album Name: " + data.tracks.items[0].album.name  + "\r\n" + 
    "Artist Name: " + data.tracks.items[0].album.artists[0].name  + "\r\n" + 
    "URL: " + data.tracks.items[0].album.external_urls.spotify;
    
    console.log(output);
  });
}

let pick = function(caseData, functionData) {
  switch (caseData) {
    case 'spotify-this-song':
      spotifyFunction(functionData);
      break;
    case 'movie-this':
      getMeMovie(functionData);
      break;
    case 'do-what-it-says':
      doWhatItSays();
      break;
    default:
      console.log('LIRI doesn\'t know that');
  }
}

//run this on load of js file
let runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);
