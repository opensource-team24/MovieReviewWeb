import { addChangeDataEventListener, writeReview } from './firebase.js'

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
    
    const reviewListEl = document.querySelector('#review-list')
    
    let selectedMovieData
    
    movieSearchBtnEl.addEventListener('click', () => {
        searchMovie(movieNameInputEl.value, (data) => {
            const resultJson = JSON.parse(data)
    
            while (movieSearchResultListEl.hasChildNodes()) {
                movieSearchResultListEl.removeChild(movieSearchResultListEl.firstChild)
            }
    
            for (let key in resultJson.items) {
                const movieData = resultJson.items[key]
                const itemEl = document.createElement('li')
                const imgEl = document.createElement('img')
                const titleEl = document.createElement('h4')
                const scoreEl = document.createElement('h5')
                
                itemEl.classList.add('search-result-item')
                
                imgEl.src = movieData.image
                titleEl.innerText = movieData.title + '(' + movieData.pubDate + ')'
                scoreEl.innerText = 'Rating: ' + movieData.userRating
                
                movieSearchResultListEl.appendChild(itemEl)
                itemEl.appendChild(imgEl)
                itemEl.appendChild(titleEl)
                itemEl.appendChild(scoreEl)
                
                itemEl.addEventListener('click', () => {
                    selectedMovieData = movieData
                    
                    movieTitleEl.innerText = movieData.title
                    movieSupervisorEl.innerText = 'Director: ' + movieData.director
                    movieActorEl.innerText = 'Actor: ' + movieData.actor
                    moviePubDateEl.innerText = 'Release Year: ' + movieData.pubDate
                    movieRatingEl.innerText = 'Rating: ' + movieData.userRating
                    movieImageEl.src = movieData.image
    
                    searchContainerEl.classList.add('invisible')
                    resultContainerEl.classList.remove('invisible')
                    
                    addChangeDataEventListener(movieData.title, movieData.pubDate, (data) => {
                        for (let key in data) {
                            const reviewData = data[key]
                            const itemEl = document.createElement('li')
                            const usernameEl = document.createElement('h5')
                            const contentEl = document.createElement('p')
    
                            itemEl.classList.add('review-item')
    
                            usernameEl.innerText = reviewData.username
                            contentEl.innerText = reviewData.content
    
                            reviewListEl.appendChild(itemEl)
                            itemEl.appendChild(usernameEl)
                            itemEl.appendChild(contentEl)
                        }
                    })
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