import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js'
import { getDatabase, ref, set, get, child } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js'

const firebaseConfig = {
    apiKey: 'AIzaSyCOZ75JeeBShX9novowym6CL-FUFiM6e0Q',
    authDomain: 'moviereviewweb-36e87.firebaseapp.com',
    projectId: 'moviereviewweb-36e87',
    storageBucket: 'moviereviewweb-36e87.appspot.com',
    messagingSenderId: '166097667548',
    appId: '1:166097667548:web:1ca63e9824efd736783b19',
    measurementId: 'G-THT11DMFB1'
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

export function writeReview(movieName, movieReleaseYear, username, content) {
    set(ref(database, `review/${movieName}-${movieReleaseYear}/${username}`), {
        username: username,
        content: content
    })
}

export function readReviews(movieName, movieReleaseYear) {
    get(child(ref(database), `review/${movieName}-${movieReleaseYear}`)).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot
        } else {
            return null
        }
    })
}