function searchMovie(movieName, callback) {
    fetch(`/search?movieName=${movieName}`).then(data => data.text()).then(callback)
}