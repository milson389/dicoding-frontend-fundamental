class DataSource {
	static searchMovies(query) {
		const defaultSearchValues = "Naruto";
		const baseUrl = "http://www.omdbapi.com/?apikey=373cc75a";
		if (query == "") {
			query = defaultSearchValues;
		}
		return fetch(`${baseUrl}&s=${query}`)
			.then((res) => {
				return res.json();
			})
			.then((responseJson) => {
				if (responseJson.Search) {
					return Promise.resolve(responseJson.Search);
				} else {
					return Promise.reject(`${query} is not found`);
				}
			});
	}
	static movieDetails(movieId) {
		return fetch(`${baseUrl}&i=${movieId}`).then((response) => {
			return response.json();
		});
	}
}

export default DataSource;
