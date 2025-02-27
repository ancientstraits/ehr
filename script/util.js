import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js'
import { getAuth } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js'
import { getDatabase } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js'

export const $ = document.querySelector.bind(document)
export const $$ = document.querySelectorAll.bind(document)

export const firebaseConfig = {
    apiKey: 'AIzaSyD85p4w02tZ4MGOJuj-DWc0DY_Igau0LNU',
    authDomain: 'project-4209476263125400271.firebaseapp.com',
    projectId: 'project-4209476263125400271',
    storageBucket: 'project-4209476263125400271.firebasestorage.app',
    messagingSenderId: '845208103451',
    appId: '1:845208103451:web:260334c73d093994af66be',
    databaseURL: 'https://project-4209476263125400271-default-rtdb.firebaseio.com'
}

export const fireApp  = initializeApp(firebaseConfig)
export const fireAuth = getAuth(fireApp)
export const fireDb   = getDatabase(fireApp)
