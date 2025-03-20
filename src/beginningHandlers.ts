import { get, onValue, ref } from "firebase/database"
import { AdministerMethod } from "./medication"
import { fireDb } from "./auth"

export const beginningHandlers: { [name: string]: (horitab: HTMLDivElement, content: HTMLDivElement) => void } = {
    addMedication(horitab, content) {
        const form = content.querySelector('form')!
        const typeSelect = <HTMLSelectElement>form.type

        const options = Object.values(AdministerMethod).map((name, num) => {
            if (!isNaN(Number(name)))
                return null

            const opt = document.createElement('option')
            opt.value = `${num}`
            opt.textContent = <string>name
            return opt
        })
        typeSelect.append(...options.filter(x => (x != null)))
    },

    async orderMedication(horitab, content) {
        const form = content.querySelector('form')!

        onValue(ref(fireDb, '/medications'), (snapshot) => {
            const meds = snapshot.val()

            const medNameOptions = Object.keys(meds).map(medName => {
                const opt = document.createElement('option')
                opt.value = medName
                opt.textContent = medName
                return opt
            })
            form.medName.replaceChildren(...medNameOptions)
        })

        onValue(ref(fireDb, '/users'), (snapshot) => {
            const users: any = snapshot.val()
            const nurses = Object.entries(users)
                .filter(([uid, info]) => (<any>info).role == 'nurse')
                .map(([uid, info]) => ({ uid, displayName: <string>(<any>info).displayName }))

            const recipientNameOptions = nurses.map(({ uid, displayName }) => {
                const opt = document.createElement('option')
                opt.value = uid
                opt.textContent = displayName
                return opt
            })
            form.recipientName.replaceChildren(...recipientNameOptions)
        })

        onValue(ref(fireDb, '/patients'), (snapshot) => {
            const patients: any = snapshot.val()
            const names = Object.entries(patients)
                .map(([pid, info]) => ({ pid, name: <string>(<any>info).name }))

            const patientNameOptions = names.map(({ pid, name }) => {
                const opt = document.createElement('option')
                opt.value = pid
                opt.textContent = name
                return opt
            })

            form.patientName.replaceChildren(...patientNameOptions)
        })
    },
}
