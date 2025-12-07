const searchButton = document.getElementById("searchButton");
const movieQuery = document.getElementById("movieQuery");
const resultsContainer = document.getElementById("resultsContainer");
const resultTitle = document.getElementById("resultTitle");
const resultText = document.getElementById("resultText");
const citations = document.getElementById("citations");
const initialMessage = document.getElementById("initialMessage");

let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
let currentMovie = null;

searchButton.addEventListener("click", async function () {
  const query = movieQuery.value.trim();

  if (query === "") {
    alert("Please enter a movie name!");
    return;
  }

  document.getElementById("loadingIndicator").style.display = "block";
  resultsContainer.style.display = "none";
  initialMessage.style.display = "none";

  try {
    const res = await fetch(
      `https://www.omdbapi.com/?t=${encodeURIComponent(query)}&apikey=d3311e5f`
    );

    const data = await res.json();
    if (data.Response === "False") {
      resultTitle.textContent = "Movie Not Found";
      resultText.textContent = `No results found for "${query}". Try another movie.`;
      citations.innerHTML = "";
      currentMovie = null;
    } else {
      currentMovie = data;

      resultTitle.textContent = `${data.Title} (${data.Year})`;

      resultText.innerHTML = `
        ⭐ <b>IMDB Rating:</b> ${data.imdbRating}<br><br>
        🎬 <b>Genre:</b> ${data.Genre}<br><br>
        📝 <b>Plot:</b> ${data.Plot}<br><br>
        🎭 <b>Actors:</b> ${data.Actors}<br><br>

        <button id="addToWatchlistBtn">Add to Watchlist</button>
      `;

      citations.innerHTML = `
        <p>Source: <a href="https://omdbapi.com" target="_blank">OMDb API</a></p>
      `;
    }

    resultsContainer.style.display = "block";
  } catch (error) {
    resultTitle.textContent = "Error";
    resultText.textContent = "Something went wrong. Please try again.";
  }

  document.getElementById("loadingIndicator").style.display = "none";
});

document.addEventListener("click", function (e) {
  if (e.target.id === "addToWatchlistBtn") {
    addToWatchlist(currentMovie);
  }
});

function addToWatchlist(movieData) {
  if (!movieData) return;

  const savedMovie = {
    id: movieData.imdbID,
    title: movieData.Title,
    year: movieData.Year,
    rating: movieData.imdbRating,
    genre: movieData.Genre,
    plot: movieData.Plot,
    actors: movieData.Actors,
    poster: movieData.Poster,
  };

  console.log("Saving: ", savedMovie); // <-- DEBUG

  if (watchlist.some((m) => m.id === savedMovie.id)) {
    alert("Already added to watchlist!");
    return;
  }

  watchlist.push(savedMovie);
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
  alert("Added to Watchlist!");
}
