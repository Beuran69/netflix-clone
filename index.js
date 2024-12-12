const apiKey = "e950e51d5d49e85f7c2f17f01eb23ba3";
const imgPath = "https://image.tmdb.org/t/p/w500";

const apiUrls = {
    trending: `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`,
    popular: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`,
};

async function fetchMovies(url) {
    try {
        console.log(`Fetching data from: ${url}`);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

function renderMovies(movies, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID "${containerId}" not found.`);
        return;
    }
    const movieHTML = movies
        .map((movie) => {
            if (!movie.poster_path) return "";
            return `<img src="${imgPath}${movie.poster_path}" alt="${movie.title}" />`;
        })
        .join("");
    container.innerHTML = movieHTML;
}

async function init() {
    console.log("Initializing app...");
    const trendingMovies = await fetchMovies(apiUrls.trending);
    if (trendingMovies) renderMovies(trendingMovies, "trending");
    const popularMovies = await fetchMovies(apiUrls.popular);
    if (popularMovies) renderMovies(popularMovies, "popular-movies");
}

window.addEventListener("scroll", () => {
    const header = document.getElementById("header");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

window.onload = init;
