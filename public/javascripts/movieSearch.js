import { writeReview } from './firebase.js'

function searchMovie(movieName, callback) {
    fetch(`/search?movieName=${movieName}`).then(data => data.text()).then(callback)
}

window.onload = () => {
    const searchContainerEl = document.querySelector('.search-container')
    const resultContainerEl = document.querySelector('.result-container')
    
    const movieNameInputEl = document.querySelector('#movie-name-input')
    const movieSearchResultListEl = document.querySelector('#search-result')
    const movieSearchBtnEl = document.querySelector('#search-btn')
    
    const usernameInputEl = document.querySelector('#username-input')
    const reviewInputEl = document.querySelector('#review-input')
    const reviewSaveBtnEl = document.querySelector('#review-save-btn')
    
    const movieTitleEl = document.querySelector('#movie-title')
    const movieSupervisorEl = document.querySelector('#movie-supervisor')
    const movieActorEl = document.querySelector('#movie-actor')
    const moviePubDateEl = document.querySelector('#movie-pub-date')
    const movieRatingEl = document.querySelector('#movie-rating')
    const movieImageEl = document.querySelector('#movie-image')
    
    let selectedMovieData
    
    movieSearchBtnEl.addEventListener('click', () => {
        searchMovie(movieNameInputEl.value, (data) => {
            const resultJson = JSON.parse(data)
    
            while (movieSearchResultListEl.hasChildNodes()) {
                movieSearchResultListEl.removeChild(movieSearchResultListEl.firstChild)
            }
    
            for (let key in resultJson.items) {
                const movieData = resultJson.items[key]
                const listEl = document.createElement('li')
                const itemEl = document.createElement('div')
                const imgEl = document.createElement('img')
                const titleEl = document.createElement('h4')
                const scoreEl = document.createElement('h5')
                
                itemEl.classList.add('search-result-item')
                
                imgEl.src = movieData.image
                titleEl.innerText = movieData.title + '(' + movieData.pubDate + ')'
                scoreEl.innerText = 'Rating: ' + movieData.userRating
                
                movieSearchResultListEl.appendChild(listEl)
                listEl.appendChild(itemEl)
                itemEl.appendChild(imgEl)
                itemEl.appendChild(titleEl)
                itemEl.appendChild(scoreEl)
                
                itemEl.addEventListener('click', () => {
                    selectedMovieData = movieData
                    
                    movieTitleEl.innerText = movieData.title
                    movieSupervisorEl.innerText = 'Director: ' + movieData.director
                    movieActorEl.innerText = 'Actor: ' + movieData.actor
                    moviePubDateEl.innerText = 'Release Date: ' + movieData.pubDate
                    movieRatingEl.innerText = 'Rating: ' + movieData.userRating
                    movieImageEl.src = movieData.image
    
                    searchContainerEl.classList.add('invisible')
                    resultContainerEl.classList.remove('invisible')
                })
            }
        })
    })
    
    reviewSaveBtnEl.addEventListener('click', () => {
        const username = usernameInputEl.value
        const content = reviewInputEl.value
    
        usernameInputEl.value = ""
        reviewInputEl.value = ""
        
        writeReview(selectedMovieData.title, selectedMovieData.pubDate, username, content)
    })
}