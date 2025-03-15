import { push, child, ref, set, get, update } from 'firebase/database'
import { $, fireDb } from './util.js'

const patientsRef = child(ref(fireDb), 'patients')

export const handlers = {
    addPatient(horitab, content) {
        const form = content.querySelector('form')
        form.onsubmit = async (e) => {
            e.preventDefault()
            
            const fd = new FormData(form)
            const obj = {}
            fd.entries()

            obj.time = Date.now()
            console.log(obj)

            const key = push(patientsRef).key
            await set(ref(fireDb, `/patients/${key}`), obj)
            console.log('DONE')
        }
    },

    async viewPatients(horitab, content) {
        const patients = await get(patientsRef)
        const patientsData = patients.val()

        const theadtr = content.querySelector('thead').querySelector('tr')
        const tbody = content.querySelector('tbody')

        const keys = [...theadtr.children].map(th => th.getAttribute('name'))

        const trs = Object.values(patientsData).map(data => {
            const tr = document.createElement('tr')
            const tds = keys.map(key => {
                const td = document.createElement('td')

                let val = data[key]
                if (key == 'time') {
                    const d = new Date(val)
                    val = ``
                }

                td.innerText = val
                return td
            })
            tr.append(...tds)
            return tr
        })
        tbody.append(...trs)
    }
}
