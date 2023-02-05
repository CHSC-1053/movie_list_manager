const request = require('request-promise-native');
const fs = require('fs').promises;

var apikey = ""; // ENTER YOUR OMDb API KEY INSIDE THE QUOTES Ex: "xxxxxxxx"

var items = [];

async function readFile() {
  try {
    const data = await fs.readFile('list.txt', 'utf-8');
    items = data.split('\r\n');
    // console.log(items);
  }
  catch(error) {
    console.error(error);
  }

  const allMoviesDetails = [], allSeriesDetails = [];

  async function getMovieDetails(item) {
    const title = item.slice(0,-7), year = item.slice(-5,-1);
    const options = {
      method: 'GET',
      url: `http://www.omdbapi.com/?apikey=${apikey}&t=${title}&y=${year}`,
      json: true
    };
    const response = await request(options);
    if (response["Response"]=="False")
      console.log("Item Not Found: ",item);
    else if(response["Type"]=="movie")
      allMoviesDetails.push(response);
    else if(response["Type"]=="series")
      allSeriesDetails.push(response);
  }

  async function main() {
    for (const item of items) {
      await getMovieDetails(item);
    }
    fs.writeFile('movies.json', JSON.stringify(allMoviesDetails, null, 2));
    console.log("Movies found: ", allMoviesDetails.length);
    fs.writeFile('series.json', JSON.stringify(allSeriesDetails, null, 2));
    console.log("Series found: ", allSeriesDetails.length);
  }
  main();
}
readFile();