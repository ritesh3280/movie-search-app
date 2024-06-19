const global = {
  currentPage: window.location.pathname,
  search: {
    term: "",
    type: "",
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  api: {
    apiKey: "bd3f43f81b8610cac59244cddb991a94",
    apiURL: "https://api.themoviedb.org/3/",
  },
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
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
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
        src="images/no-image.jpg"
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
            src="images/no-image.jpg"
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
              src="images/no-image.jpg"
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

// Search Function
async function search() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  global.search.type = urlParams.get("type");
  global.search.term = urlParams.get("search-term");

  if (global.search.term !== "" && global.search.term !== null) {
    const { results, total_pages, page, total_results } = await searchAPIData();

    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;

    if (results.length === 0) {
      showAlert("No results found");
      return;
    }

    displaySearchResults(results);

    document.querySelector("#search-term").value = "";
  } else {
    showAlert("Please enter a search term");
  }
}

function displaySearchResults(results) {
  // Clear previous search results
  const searchContainer = document.querySelector("#search-results");
  searchContainer.innerHTML = "";

  document.querySelector("#search-results-heading").innerHTML = "";
  document.querySelector("#pagination").innerHTML = "";

  results.forEach((result) => {
    const div = document.createElement("div");
    div.classList.add("card");

    // Set image path
    let imagePath = "images/no-image.jpg";
    if (result.poster_path) {
      imagePath = `https://image.tmdb.org/t/p/w500/${result.poster_path}`;
    }

    // Set title or name based on search type
    const titleOrName =
      global.search.type === "movie" ? result.title : result.name;

    // Set release or air date based on search type
    const releaseOrAirDate =
      global.search.type === "tv" ? result.first_air_date : result.release_date;

    div.innerHTML = `        
        <a href="${global.search.type}-details.html?id=${result.id}">
          <img
            src="${imagePath}"
            class="card-img-top"
            alt="${titleOrName}"
          />
        </a>
        <div class="card-body">
          <h5 class="card-title">${titleOrName}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${releaseOrAirDate}</small>
          </p>
        </div>
      `;

    document.querySelector(
      "#search-results-heading"
    ).innerHTML = `<h2>${results.length} of ${global.search.totalResults} Results for ${global.search.term}</h2>`;

    searchContainer.appendChild(div);
  });

  displayPagination();
}

// Display Pagination
function displayPagination() {
  const div = document.createElement("div");
  div.classList.add("pagination");

  div.innerHTML = `
  <button class="btn btn-primary" id="prev">Prev</button>
  <button class="btn btn-primary" id="next">Next</button>
  <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
  `;

  document.querySelector("#pagination").appendChild(div);

  //   Disable prev button if on first page
  if (global.search.page === 1) {
    document.querySelector("#prev").disabled = true;
  }

  //   Disable next button if on last page
  if (global.search.page === global.search.totalPages) {
    document.querySelector("#next").disabled = true;
  }

  //   Next Page
  document.querySelector("#next").addEventListener("click", async () => {
    global.search.page++;
    const { results, total_pages } = await searchAPIData();
    displaySearchResults(results);
  });

  //   Previous Page
  document.querySelector("#prev").addEventListener("click", async () => {
    global.search.page--;
    const { results, total_pages } = await searchAPIData();
    displaySearchResults(results);
  });
}

// Display Sliding Function
async function displaySlider() {
  const { results } = await fetchAPIData("movie/now_playing");

  results.forEach((movie) => {
    const div = document.createElement("div");

    div.classList.add("swiper-slide");

    div.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
      movie.title
    }" />
    </a>
    <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i>  ${movie.vote_average.toFixed(
          1
        )}/ 10
    </h4>
    `;

    document.querySelector(".swiper-wrapper").appendChild(div);

    initSwiper();
  });
}

function initSwiper() {
  const swiper = new Swiper(".swiper", {
    slidePerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}

// Fetch data from API
async function fetchAPIData(endpoint) {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiURL;

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();
  hideSpinner();

  return data;
}

// Search API Data
async function searchAPIData() {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiURL;

  showSpinner();

  const response = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`
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

// Alert
function showAlert(message, className = "alert-error") {
  const alertEl = document.createElement("div");
  alertEl.classList.add("alert", className);
  alertEl.appendChild(document.createTextNode(message));

  document.querySelector("#alert").appendChild(alertEl);

  setTimeout(() => alertEl.remove(), 3000);
}

function currencyCommas(number) {
  return number.toLocaleString("en-US");
}

function init() {
  highlightActiveLink();
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displaySlider();
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
      search();
      break;
  }
}

document.addEventListener("DOMContentLoaded", init);
