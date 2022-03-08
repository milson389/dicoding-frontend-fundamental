import "../components/movie-list.js";
import "../components/nav-bar.js";
import DataSource from "../data/data-source.js";

const main = () => {
	const searchElement = document.querySelector("nav-bar");
	const movieListElement = document.querySelector("movie-list");
	const resultContainer = document.getElementById("movie-list");

	const onButtonSearchClicked = async (e) => {
		e.preventDefault();
		try {
			const result = await DataSource.searchMovies(searchElement.value);
			renderResult(result);
		} catch (error) {
			fallbackResult(error);
		}
	};

	const renderResult = (results) => {
		movieListElement.movies = results;
	};

	const fallbackResult = (message) => {
		movieListElement.renderError(message);
	};

	const fetchMovieDetails = async (movieId) => {
		const response = await fetch(`${baseUrl}&i=${movieId}`);
		const detailInfo = await response.json();

		renderMovieDetails(detailInfo);
	};

	const renderMovieDetails = (result) => {
		const modalTitle = document.querySelector(".modal-title");
		const modalBody = document.querySelector(".modal-body");

		modalTitle.innerText = `${result.Title}`;

		modalBody.innerHTML = `
		<div class="container-fluid">
			<div class="row justify-content-center">
				<div class="col-md-4">
					<img src="${result.Poster}" class="img-fluid" />
				</div>
				<div class="col-md-8">
					<div class="card">
						<ul class="list-group list-group-flush">
							<li class="list-group-item"><strong>Genre:</strong> ${result.Genre}</li>	
							<li class="list-group-item"><strong>Released Date:</strong> ${result.Released}</li>
							<li class="list-group-item"><strong>Actors:</strong> ${result.Actors}</li>
							<li class="list-group-item"><strong>Overview:</strong> ${result.Plot}</li>
							<li class="list-group-item"><strong>Rating:</strong> ${result.imdbRating}</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		`;
	};

	document.addEventListener("DOMContentLoaded", () => {
		$("#movie-list").on("click", ".see-detail", (e) => {
			const movieId = $(e.currentTarget).data("id");
			fetchMovieDetails(movieId);
		});
	});

	searchElement.clickEvent = onButtonSearchClicked;
};

export default main;
