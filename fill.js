const request = require('request-promise-native');
const fs = require('fs').promises;

var data;

var c = 0;
var genres = [], selected_genres = [];

document.getElementById("b_movies").addEventListener("click", displayMovies);
async function displayMovies() {
  try{
    const response = await fetch("movies.json");
    data = await response.json();
    displayData();
  }
  catch (error) {
    console.error(error);
  }
}

document.getElementById("b_series").addEventListener("click", displaySeries);
async function displaySeries() {
  try{
    response = await fetch("series.json");
    data = await response.json();
    displayData();
  }
  catch (error) {
    console.error(error);
  }
}

async function displayData() {
  genres = [];
  selected_genres = [];
  try {
    data.forEach(function(movie) {
      // Update unique Genres array
      for (const genre of movie.Genre.split(", ")) {
        // genres.push(genre.toLowerCase().replace("-","_"));
        genres.push(genre);
      }
      genres = [...new Set(genres)];
      genres = genres.sort();
      console.log(genres);
      selected_genres = [].concat(genres);
    });

    fillContainer();

    displayGenres();
  }
  catch (error) {
    console.error(error);
  }
}

async function fillContainer() {
  c = 0;
  var container = document.getElementsByClassName("container")[0];
  // Clear container
  container.innerHTML = "";
  var flag;
  data.forEach(function(movie) {
    flag = 0;
    // Checking genre for filtering
    for (const genre of movie.Genre.split(", ")) {
      if(selected_genres.includes(genre)) {
        flag = 1;
        break;
      }
    }

    if(flag === 1) {
      // Create a new item div element
      var item_div = document.createElement("div");
      item_div.setAttribute('class', "item");

        var details1_poster_div = document.createElement("div");
        details1_poster_div.setAttribute('class', "details1 poster");

          var img = document.createElement("img");
          img.setAttribute('src', movie.Poster);
          img.setAttribute('class', "poster-image");
          details1_poster_div.appendChild(img);
        
        item_div.appendChild(details1_poster_div);

        var details1_inner_div = document.createElement("div");
        details1_inner_div.setAttribute('class', "details1 inner");

          var rated_div = document.createElement("div");
          rated_div.setAttribute('class', "rated");
          rated_div.innerHTML = "Rated: "+movie.Rated;
          details1_inner_div.appendChild(rated_div);
          
          var year_div = document.createElement("div");
          year_div.setAttribute('class', "year");
          year_div.innerHTML = "Year: "+movie.Year;
          details1_inner_div.appendChild(year_div);

          var runtime_div = document.createElement("div");
          runtime_div.setAttribute('class', "runtime");
          runtime_div.innerHTML = "Runtime: "+movie.Runtime;
          details1_inner_div.appendChild(runtime_div);

          var metacritic_rating_div = document.createElement("div");
          metacritic_rating_div.setAttribute('class', "metacritic-rating");
          try{metacritic_rating_div.innerHTML = "Metacritic: "+movie.Ratings[2].Value;}catch(e){metacritic_rating_div.innerHTML = "Metacritic: N/A";}
          details1_inner_div.appendChild(metacritic_rating_div);

          var rotten_tomatoes_rating_div = document.createElement("div");
          rotten_tomatoes_rating_div.setAttribute('class', "rotten-tomatoes-rating");
          try{rotten_tomatoes_rating_div.innerHTML = "Rotten Tomatoes: "+movie.Ratings[1].Value;}catch(e){rotten_tomatoes_rating_div.innerHTML = "Rotten Tomatoes: N/A";}
          details1_inner_div.appendChild(rotten_tomatoes_rating_div);

          var imdb_div = document.createElement("div");
          imdb_div.setAttribute('class', "imdb");
            var imdb_rating_div = document.createElement("div");
            imdb_rating_div.setAttribute('class', "imdb-rating");
            imdb_rating_div.innerHTML = "IMDb Rating: "+movie.Ratings[0].Value;
            imdb_div.appendChild(imdb_rating_div);

            var imdb_votes_div = document.createElement("div");
            imdb_votes_div.setAttribute('class', "imdb-votes");
            imdb_votes_div.innerHTML = "IMDb Votes: "+movie.imdbVotes;
            imdb_div.appendChild(imdb_votes_div);
          
            var link_to_imdb_div = document.createElement("div");
            link_to_imdb_div.setAttribute('class', "link-to-imdb");

              var a = document.createElement("a");
              a.setAttribute('href', "https://www.imdb.com/title/"+movie.imdbID);
              a.innerHTML = "View on IMDb";
              link_to_imdb_div.appendChild(a);

            imdb_div.appendChild(link_to_imdb_div);

          details1_inner_div.appendChild(imdb_div);

        item_div.appendChild(details1_inner_div);

        var details2_div = document.createElement("div");
        details2_div.setAttribute('class', "details2");

          var title_div = document.createElement("div");
          title_div.setAttribute('class', "title");
          title_div.innerHTML = movie.Title;
          details2_div.appendChild(title_div);
          
          var genre_div = document.createElement("div");
          genre_div.setAttribute('class', "genre");
          genre_div.innerHTML = "Genre: "+movie.Genre;
          details2_div.appendChild(genre_div);

        item_div.appendChild(details2_div);
      
      // Append the new item division to the container
      container.appendChild(item_div);
      c+=1;
    }
  });
  console.log("Item Count: ",c);
}

async function displayGenres() {
  try {
    var genres_container = document.getElementsByClassName("genres")[0];
    
    // Clear container
    genres_container.innerHTML = "";

    for (const genre of genres) {
      var b = document.createElement("button");
      b.setAttribute('type', "button");
      b.setAttribute('class', "b_genres");
      b.setAttribute('id', genre.toLowerCase().replace("-","_"));
      b.addEventListener("click", filterByGenre);
      
        var h3 = document.createElement("h3");
        h3.innerHTML = genre;
        b.appendChild(h3);
      
      genres_container.appendChild(b);
    }
    var b = document.createElement("button");
      b.setAttribute('type', "button");
      b.setAttribute('class', "b_genres");
      b.setAttribute('id', "clear_all");
      b.addEventListener("click", filterByGenre);
      b.style.color = "red";
      
        var h3 = document.createElement("h3");
        h3.innerHTML = "Clear All";
        b.appendChild(h3);
      
      genres_container.appendChild(b);
    var b = document.createElement("button");
      b.setAttribute('type', "button");
      b.setAttribute('class', "b_genres");
      b.setAttribute('id', "clear_filters");
      b.addEventListener("click", filterByGenre);
      b.style.color = "darkgray";
      
        var h3 = document.createElement("h3");
        h3.innerHTML = "Clear Filters";
        b.appendChild(h3);
      
      genres_container.appendChild(b);
  }
  catch (error) {
    console.error(error);
  }
}

async function filterByGenre() {
  const selected_genre = this.children[0].innerHTML;
  console.log("Clicked:", selected_genre);

  if(selected_genre === "Clear All") {
    selected_genres = [];
    for (const b_genre of document.getElementsByClassName("b_genres")) {
      if(b_genre.id === "clear_filters")
        b_genre.style.color = "black";
      else
        b_genre.style.color = "darkgray";
    }
    console.log(selected_genres);
  }
  else if(selected_genre === "Clear Filters") {
    selected_genres = [].concat(genres);
    for (const b_genre of document.getElementsByClassName("b_genres")) {
      if(b_genre.id === "clear_all")
        b_genre.style.color = "red";
      else if(b_genre.id === "clear_filters")
        b_genre.style.color = "darkgray";
      else
        b_genre.style.color = "rgb(105, 205, 5)";
    }
    console.log(selected_genres);
  }
  else if(selected_genres.includes(selected_genre)) {
    console.log("genre selected previously");
    for( var i = 0; i < selected_genres.length; i++){                        
      if ( selected_genres[i] === selected_genre) { 
        selected_genres.splice(i, 1);
        this.style.color = "darkgray";
        document.getElementById("clear_filters").style.color = "black";
        break;
      }
    }
    if(selected_genres.length == 0)
      document.getElementById("clear_all").style.color = "darkgray";
    console.log(selected_genres);
  }
  else {
    console.log("genre not selected previously");
    selected_genres.push(selected_genre);
    this.style.color = "rgb(105, 205, 5)";
    document.getElementById("clear_all").style.color = "red";
    selected_genres = selected_genres.sort();
    if(selected_genres.length == genres.length)
      document.getElementById("clear_filters").style.color = "darkgray";
    console.log(selected_genres);
  }
  fillContainer();
}

displayMovies();