// watchlist.js (for watchlist.html)
const watchlistGrid = document.getElementById("watchlistGrid");
const emptyMessage = document.getElementById("emptyMessage");

let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

function displayWatchlist() {
  watchlistGrid.innerHTML = ""; // clear grid

  if (watchlist.length === 0) {
    emptyMessage.style.display = "block";
    return;
  } else {
    emptyMessage.style.display = "none";
  }

  watchlist.forEach(movie => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    card.innerHTML = `
      <img src="${movie.poster !== "N/A" ? movie.poster : "https://via.placeholder.com/300x450"}" alt="${movie.title}">
      <div class="movie-info">
        <h3>${movie.title} (${movie.year})</h3>
        <p>⭐ ${movie.rating} | 🎬 ${movie.genre}</p>
        <p>${movie.plot.substring(0, 100)}...</p>
      </div>
    `;

    watchlistGrid.appendChild(card);
  });
}

displayWatchlist();
