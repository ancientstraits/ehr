import { FirebaseError, initializeApp } from 'firebase/app'
import { AuthError, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { child, get, getDatabase, ref, serverTimestamp } from 'firebase/database'
import { setPage } from './page.js'
import { $, $btn, $div, $form } from './util.js'

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

// Login and Logout
$div('#login').onsubmit = async (e) => {
    e.preventDefault()
    const email = $form('#login').user.value, password = $form('#login').pass.value

    try {
        await signInWithEmailAndPassword(
            fireAuth, email, password
        )
        $('#login-error').style.display = 'none'
    } catch (err) {
        if (err instanceof FirebaseError) {
            console.log('EEEEE')
            console.log(err.code)
            if (err.code == 'auth/invalid-credential') {
                console.log('ok')
                $('#login-error').style.display = 'block'
            }
        }
    }
}
// $btn('#logout').onclick = async () => {
//     await signOut(fireAuth)
// }

let uid: string | null = null
onAuthStateChanged(fireAuth, async (user) => {
    if (user == null) {
        // Logout
        uid = null
        setPage('login')
    } else {
        // Login
        uid = user.uid
        setPage('main')
    }
})
export function getUid(): string | null {
    return uid
}
export async function getOthersUids(): Promise<string[]> {
    serverTimestamp()
    const users = await get(child(ref(fireDb), 'users'))
    return Object.keys(users.val()).filter(x => x != uid)
}


let users: { [uid: string]: any } | null = null
async function loadUsers() {
    const usersResp = await get(ref(fireDb, `/users`))
    users = usersResp.val()
}
loadUsers() // don't wait to load users


export function getDisplayNameFromUid(uid: string): string | null {
    if (users == null) return null

    return users[uid] ? users[uid].displayName : null
}
