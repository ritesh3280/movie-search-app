const global = {
  currentPage: window.location.pathname,
};

async function getPopularMovies() {
  const { results } = await fetchAPIData("movie/popular");

  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `        
          <a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />`
                : `<img
              src="../img/no-image.jpg"
              class="card-img-top"
              alt="Movie Title"
            />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        `;

    document.querySelector("#popular-movies").appendChild(div);
  });
}

async function getPopularTVShows() {
  const { results } = await fetchAPIData("tv/popular");

  results.forEach((tv) => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `        
    <a href="tv-details.html?id=${tv.id}">
      ${
        tv.poster_path
          ? `<img
        src="https://image.tmdb.org/t/p/w500${tv.poster_path}"
        class="card-img-top"
        alt="${tv.name}"
      />`
          : `<img
        src="../img/no-image.jpg"
        class="card-img-top"
        alt="Movie Title"
      />`
      }
    </a>
    <div class="card-body">
      <h5 class="card-title">${tv.name}</h5>
      <p class="card-text">
        <small class="text-muted">Aired: ${tv.first_air_date}</small>
      </p>
    </div>
  `;

    document.querySelector("#popular-shows").appendChild(div);
  });
}

async function displayMovieDetails() {
  const urlID = window.location.search.split("=")[1];

  const movie = await fetchAPIData(`movie\/${urlID}`);

  displayBG("movie", movie.backdrop_path);

  const div = document.createElement("div");

  div.innerHTML = `
          <div class="details-top">
          <div>
          ${
            movie.poster_path
              ? `<img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
          />`
              : `<img
            src="../img/no-image.jpg"
            class="card-img-top"
            alt="Movie Title"
          />`
          }
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
            </ul>
            <a href="${
              movie.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${currencyCommas(
              movie.budget
            )}</li>
            <li><span class="text-secondary">Revenue:</span> $${currencyCommas(
              movie.revenue
            )}</li>
            <li><span class="text-secondary">Runtime:</span> ${
              movie.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies
            .map((company) => `<span>${company.name}</span>`)
            .join(", ")}</div>
        </div>
  `;

  document.querySelector("#movie-details").appendChild(div);
}

// Movie Deatils
async function displayMovieDetails() {
  const urlID = window.location.search.split("=")[1];

  const movie = await fetchAPIData(`movie\/${urlID}`);

  displayBG("movie", movie.backdrop_path);

  const div = document.createElement("div");

  div.innerHTML = `
          <div class="details-top">
          <div>
          ${
            movie.poster_path
              ? `<img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
          />`
              : `<img
            src="../img/no-image.jpg"
            class="card-img-top"
            alt="${movie.title}"
          />`
          }
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
            </ul>
            <a href="${
              movie.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${currencyCommas(
              movie.budget
            )}</li>
            <li><span class="text-secondary">Revenue:</span> $${currencyCommas(
              movie.revenue
            )}</li>
            <li><span class="text-secondary">Runtime:</span> ${
              movie.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies
            .map((company) => `<span>${company.name}</span>`)
            .join(", ")}</div>
        </div>
  `;

  document.querySelector("#movie-details").appendChild(div);
}

// TV Show Details
async function displayTVShowDetails() {
  const urlID = window.location.search.split("=")[1];

  const TV = await fetchAPIData(`tv/${urlID}`);

  displayBG("TV", TV.backdrop_path);

  const div = document.createElement("div");

  div.innerHTML = `
            <div class="details-top">
            <div>
            ${
              TV.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${TV.poster_path}"
              class="card-img-top"
              alt="${TV.name}"
            />`
                : `<img
              src="../img/no-image.jpg"
              class="card-img-top"
              alt="${TV.name}"
            />`
            }
            </div>
            <div>
              <h2>${TV.name}</h2>
              <p>
                <i class="fas fa-star text-primary"></i>
                ${TV.vote_average.toFixed(1)} / 10
              </p>
              <p class="text-muted">Last Air Date: ${TV.last_air_date}</p>
              <p>
                ${TV.overview}
              </p>
              <h5>Genres</h5>
              <ul class="list-group">
                ${TV.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
              </ul>
              <a href="${
                TV.homepage
              }" target="_blank" class="btn">Visit Movie Homepage</a>
            </div>
          </div>
          <div class="details-bottom">
            <h2>Movie Info</h2>
            <ul>
              <li><span class="text-secondary">Number of Episodes:</span> ${
                TV.number_of_episodes
              }</li>
              <li><span class="text-secondary">Last Episode To Air:</span> ${
                TV.last_episode_to_air.name
              }</li>
              <li><span class="text-secondary">Status:</span> ${TV.status}</li>
            </ul>
            <h4>Production Companies</h4>
            <div class="list-group">${TV.production_companies
              .map((company) => `<span>${company.name}</span>`)
              .join(", ")}</div>
          </div>
    `;

  document.querySelector("#show-details").appendChild(div);
}

// Display BG on Deatils
function displayBG(type, pathBG) {
  const overlayDiv = document.createElement("div");
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${pathBG})`;
  overlayDiv.style.backgroundSize = "cover";
  overlayDiv.style.backgroundPosition = "center";
  overlayDiv.style.backgroundRepeat = "no-repeat";
  overlayDiv.style.height = "100vh";
  overlayDiv.style.width = "100vw";
  overlayDiv.style.position = "absolute";
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.zIndex = "-1";
  overlayDiv.style.opacity = "0.2";

  if (type === "movie") {
    document.querySelector("#movie-details").appendChild(overlayDiv);
  } else {
    document.querySelector("#show-details").appendChild(overlayDiv);
  }
}

// Fetch data from API
async function fetchAPIData(endpoint) {
  const API_KEY = "bd3f43f81b8610cac59244cddb991a94";
  const API_URL = "https://api.themoviedb.org/3/";

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();
  hideSpinner();

  return data;
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

// Highlight current link
function highlightActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}

function currencyCommas(number) {
  return number.toLocaleString("en-US");
}

function init() {
  highlightActiveLink();
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      getPopularMovies();
      break;
    case "/shows.html":
      getPopularTVShows();
      break;
    case "/movie-details.html":
      displayMovieDetails();
      break;
    case "/tv-details.html":
      displayTVShowDetails();
      break;
    case "/search.html":
      console.log("TV Details Page");
      break;
  }
}

document.addEventListener("DOMContentLoaded", init);
