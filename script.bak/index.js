import { signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth'
import { $, fireAuth, firebaseConfig } from './util.js'
import { setPage, hideAllPagesExcept } from './page.js'
import { createHoritabFromTemplate, loadTemplates } from './template.js'
import { addHoritab, registerLaunchHoritabEvents } from './horitab.js'
// hideAllPagesExcept('loading')

// registerFormEvents()
registerLaunchHoritabEvents()
// for (const template of loadTemplates()) {
//     const horitab = createHoritabFromTemplate(template)
    // console.log(horitab)
//     addHoritab(horitab) 
// }

onAuthStateChanged(fireAuth, async (user) => {
    if (user) {
        console.log(user)
        $('#greeting').textContent = `Hello, ${user.displayName}`
        setPage('main')
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
            fireAuth, email, password
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
    await signOut(fireAuth)
}
