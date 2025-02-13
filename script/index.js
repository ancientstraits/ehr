import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js'
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js'
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js'
import { $, firebaseConfig } from './util.js'
import { setPage, hideAllPagesExcept } from './page.js'

// hideAllPagesExcept('loading')

const app  = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db   = getDatabase(app)

onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log(user)
        $('#greeting').textContent = `Hello, ${user.displayName}`
        setPage('main')
        // set(ref(db, `/users/${user.uid}`), {
        //     'thing': true,
        //     'what': 300,
        //     'myarray': [
        //         1, 2, 3, 100, -9909
        //     ]
        // })
    } else {
        setPage('login')
    }
})

$('#login').onsubmit = async (e) => {
    e.preventDefault()
    const email = $('#login').user.value, password = $('#login').pass.value
    console.log({ email, password })

    try {
        const cred = await signInWithEmailAndPassword(
            auth, email, password
        )
        $('#login-error').style.display = 'none'
    } catch(e) {
        console.log('EEEEE')
        console.log(e.code)
        if (e.code = 'auth/invalid-credential') {
            console.log('ok')
            $('#login-error').style.display = 'block'
        }
    }
}

$('#logout').onclick = async (e) => {
    await signOut(auth)
}
