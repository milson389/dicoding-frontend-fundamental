class NavBar extends HTMLElement {
	constructor() {
		super();
		this.shadowDOM = this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.render();
	}

	set clickEvent(event) {
		this._clickEvent = event;
		this.render();
	}

	get value() {
		return this.shadowDOM.querySelector("#searchInput").value;
	}

	render() {
		this.shadowDOM.innerHTML = `
        <nav class="navbar navbar-dark bg-dark">
            <div class="container">
                <a class="navbar-brand" href="/">Movie Library</a>
                <form class="d-flex">
                    <input
                        class="form-control me-2"
                        id="searchInput"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <button
                        class="btn btn-outline-success"
                        id="searchButton"
                        type="submit"
                    >
                        <i class="fas fa-magnifying-glass"></i>
                    </button>
                </form>
            </div>
        </nav>
        `;

		this.shadowDOM
			.querySelector("#searchButton")
			.addEventListener("click", this._clickEvent);
	}
}

customElements.define("nav-bar", NavBar);
