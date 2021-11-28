function searchMovie(movieName, callback) {
    fetch(`/search?movieName=${movieName}`).then(data => data.text()).then(callback)
}

window.onload = () => {
    const movieNameInputEl = document.querySelector('#movie-name-input')
    const movieSearchResultListEl = document.querySelector('#search-result')
    const movieSearchBtnEl = document.querySelector('#search-btn')
    
    movieSearchBtnEl.addEventListener('click', () => {
        console.log(searchMovie(movieNameInputEl.value, (data) => {
            const resultJson = JSON.parse(data)
    
            console.log(data)
    
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
                titleEl.innerText = movieData.title
                scoreEl.innerText = movieData.userRating + '점'
                
                movieSearchResultListEl.appendChild(listEl)
                listEl.appendChild(itemEl)
                itemEl.appendChild(imgEl)
                itemEl.appendChild(titleEl)
                itemEl.appendChild(scoreEl)
                
                itemEl.addEventListener('click', () => {
                    location.href = `/result?movieName=${movieData.title}`
                })
            }
        }))
    })
    
}