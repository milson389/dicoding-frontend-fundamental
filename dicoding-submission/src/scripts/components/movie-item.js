class MovieItem extends HTMLElement {
	constructor() {
		super();
		this.shadowDOM = this.attachShadow({ mode: "open" });
	}

	set movie(movie) {
		this._movie = movie;
		this.render();
	}

	render() {
		this.shadowDOM.innerHTML = `
        <div class="col-md-3 my-2">
            <div class="card h-100">
                <img src="${this._movie.Poster}" id="customImageSize" class="card-img-top" alt="${this._movie.Title}">
                <div class="card-body">
                    <h5 class="card-title">${this._movie.Title}</h5>
                    <a class="card-link see-detail" data-id="${this._movie.imdbID}" data-bs-toggle="modal" data-bs-target="#movieDetailInfo" href="#">See Details</a>
                </div>
            </div>
        </div>
        `;
	}
}

customElements.define("movie-item", MovieItem);
