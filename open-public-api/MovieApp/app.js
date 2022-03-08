const searchButton = document.getElementById("searchButton");
const searchQuery = document.getElementById("searchInput");
const baseUrl = "http://www.omdbapi.com/?apikey=373cc75a";
const resultContainer = document.getElementById("movie-list");

const fetchData = async () => {
	resultContainer.innerHTML = "";
	if (searchQuery.value == "") {
		searchQuery.value = "Naruto";
	}
	try {
		const response = await fetch(`${baseUrl}&s=${searchQuery.value}`);
		const result = await response.json();

		if (result.Response == "True") {
			let movies = result.Search;
			movies.forEach((movie) => {
				resultContainer.innerHTML += `
                <div class="col-md-3 my-2">
                    <div class="card h-100">
                        <img src="${movie.Poster}" id="customImageSize" class="card-img-top" alt="${movie.Title}">
                        <div class="card-body">
                            <h5 class="card-title">${movie.Title}</h5>
							<a class="card-link see-detail" data-id="${movie.imdbID}" data-bs-toggle="modal" data-bs-target="#movieDetailInfo" href="#">See Details</a>
                        </div>
                    </div>
                </div>
                `;
			});
		} else {
			throw result;
		}
	} catch (error) {
		resultContainer.innerHTML = `
        <div class="col">
            <h1 class="text=center">${error.Error}</h1>  
        </div>
    `;
	}
	searchQuery.value = "";
};

const fetchDetailInfo = async (dataId) => {
	try {
		const response = await fetch(`${baseUrl}&i=${dataId}`);
		const result = await response.json();
		const modalTitle = document.querySelector(".modal-title");
		const modalBody = document.querySelector(".modal-body");

		if (result) {
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
		} else {
			console.log("Else");
			throw result;
		}
	} catch (error) {
		alert(error.Error);
	}
};

window.addEventListener("load", () => {
	searchQuery.value = "Naruto";
	fetchData();
});

searchButton.addEventListener("click", (e) => {
	e.preventDefault();
	fetchData();
});

searchQuery.addEventListener("click", (e) => {
	e.preventDefault();
	if (e.keyCode === 13) {
		fetchData();
	}
});

$("#movie-list").on("click", ".see-detail", (e) => {
	const movieId = $(e.currentTarget).data("id");
	fetchDetailInfo(movieId);
});
