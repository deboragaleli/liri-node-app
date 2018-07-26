var dotenv = require("dotenv").config();
var keys = require("./keys");
var Spotify = require('node-spotify-api');
var request = require('request');

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
    
    output = "-- LIRI FOUND THIS FOR YOU: --" + "\r\n" + 
    "Song Name: " + "'" + song.toUpperCase() + "'"  + "\r\n" + 
    "Album Name: " + data.tracks.items[0].album.name  + "\r\n" + 
    "Artist Name: " + data.tracks.items[0].album.artists[0].name  + "\r\n" + 
    "URL: " + data.tracks.items[0].album.external_urls.spotify;
    
    console.log(output);
  });
}

function movieFunction(movieName) {
  if (!movieName) {
      movieName = "Mr Nobody";
  }
  //Get your OMDb API key creds here http://www.omdbapi.com/apikey.aspx
  // t = movietitle, y = year, plot is short, then the API key
  var omdbUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + keys.omdb.id;

  request(omdbUrl, function(err, res, body) {
    if (err) {
      console.log('Error occurred: ' + err);
      return;
    } else {
      var jsonData = JSON.parse(body);
      // console.log(jsonData);
      output = "-- LIRI FOUND THIS FOR YOU: --" + "\r\n" + 
          'Title: ' + jsonData.Title + "\r\n" + 
          'Year: ' + jsonData.Year + "\r\n" + 
          'Rated: ' + jsonData.Rated + "\r\n" + 
          'IMDB Rating: ' + jsonData.imdbRating + "\r\n" + 
          'Country: ' + jsonData.Country + "\r\n" + 
          'Language: ' + jsonData.Language + "\r\n" + 
          'Plot: ' + jsonData.Plot + "\r\n" + 
          'Actors: ' + jsonData.Actors + "\r\n" + 
          'Tomato Rating: ' + jsonData.Ratings[1].Value + "\r\n" + 
          'IMDb Rating: ' + jsonData.imdbRating + "\n";

      console.log(output);
      }
  });
}

let pick = function(caseData, functionData) {
  switch (caseData) {
    case 'spotify-this-song':
      spotifyFunction(functionData);
      break;
    case 'movie-this':
      movieFunction(functionData);
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
