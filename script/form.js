import { push, child, ref, set, update } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js'
import { $, fireDb } from './util.js'

const formSubmits = {}
formSubmits.addPatient = async form => {
    const fd = new FormData(form)
    const obj = Object.fromEntries(fd.entries())
    console.log(obj)

    const key = push(child(ref(fireDb), 'patients')).key

    console.log(key)

    await set(ref(fireDb, `/patients/${key}`), {
        name: form.name.value,
    })

    console.log('should be done updating now...')

    // await update(ref(fireDb), {
    //     [`/patients/${key}`]: {
    //         name: form.name,
    //     },
    // })
}

export function copyFormEvents(fromElem, toElem) {
    const fromForms = [...fromElem.querySelectorAll('.ehr-form')]
    const toForms   = [...toElem.querySelectorAll('.ehr-form')]
    console.log(fromForms, toForms)

    fromForms.forEach((form, i) => {
        toForms[i].onsubmit = form.onsubmit
    })
}

export function registerFormEvents() {
    const formElems = [...$('#template-container').querySelectorAll('.ehr-form')]
    for (const formElem of formElems) {
        const handlerName = formElem.id.replace(/^ehr-form-/, '')
        const handler = formSubmits[handlerName]
        formElem.onsubmit = (e) => {
            e.preventDefault()
            handler(e.target)
        }
    }
}
