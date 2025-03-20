import { push, child, ref, set, get, update } from 'firebase/database'
import { fireDb, getOthersUids, getUid, getDisplayNameFromUid } from './auth.js'
import { patientSendableFromFormData } from './types.js'
import { makeHoritabInactive, removeHoritab } from './horitab.js'
import { Notification, notificationCreate, NotificationPriority, notificationSend, OrderMedicationNotification } from './notification.js'
import { AdministerMethod, Medication, medicationGet, medicationUpdate } from './medication.js'

const patientsRef = child(ref(fireDb), 'patients')

export const handlers: { [name: string]: (horitab: HTMLDivElement, content: HTMLDivElement) => void } = {
    addPatient(horitab, content) {
        const form = content.querySelector('form')!
        form.onsubmit = async (e) => {
            e.preventDefault()
           
            const sendable = patientSendableFromFormData(new FormData(form))

            removeHoritab(horitab, content)
            console.log('Patient Added!')

            const key = push(patientsRef).key!
            await set(child(patientsRef, key), sendable)
        }
    },

    async viewPatients(horitab, content) {
        const patients = await get(patientsRef)
        const patientsData = patients.val()

        const theadtr = content.querySelector('thead')!.querySelector('tr')!
        const tbody = content.querySelector('tbody')!

        const keys = [...theadtr.children].map(th => th.getAttribute('name'))

        const trs = Object.values(patientsData).map(data => {
            const tr = document.createElement('tr')
            const tds = keys.map(key => {
                const td = document.createElement('td')

                // @ts-ignore
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
    },

    sendNotification(horitab, content) {
        const form = content.querySelector('form')!

        form.onsubmit = async (e) => {
            e.preventDefault()

            const message: string = form.message.value
            console.log(message)

            const priority: NotificationPriority = form.priority.value
            console.log(priority)

            removeHoritab(horitab, content)

            notificationSend(notificationCreate({ priority, message }), await getOthersUids())
        }
    },

    async viewNotifications(horitab, content) {
        const container = <HTMLDivElement>content.querySelector('.notification-container')

        const notifications = await get(ref(fireDb, `/notifications/${getUid()}`))
        if (!notifications.exists()) {
            container.textContent = 'No notifications'
            return
        }
        const notifs = <Notification[]>Object.values(notifications.val())
        if (notifs.length === 0) {
            container.textContent = 'No notifications'
            return
        }
        const details = notifs.map((notif) => {
            const det = document.createElement('details')
            const summary = document.createElement('summary')
            summary.textContent = `From ${getDisplayNameFromUid(notif.sender)}`
            det.appendChild(summary)
            det.appendChild(document.createTextNode(notif.message))

            return det
        }) 
        container.append(...details)
    },

    addMedication(horitab, content) {
        const form = content.querySelector('form')!

        form.onsubmit = async (e) => {
            e.preventDefault()

            const med: Medication = {
                name: form.medName.value,
                administerMethod: parseInt(form.type.value),
                dosageAmount: Number(form.amount.value),
            }

            removeHoritab(horitab, content)
            
            await medicationUpdate(med)
        }
    },

    viewMedicationInventory(horitab, content) {

    },

    orderMedication(horitab, content) {
        const form = content.querySelector('form')!

        form.onsubmit = async (e) => {
            e.preventDefault()

            // const med = await medicationGet(form.medName.value)
            const medName = form.medName.value
            const patient = form.patientName.value
            const recipient = form.recipientName.value
            const amount = form.amount.value

            const notification = notificationCreate({
                message: `Send ${amount} milligrams of ${medName} to patient ${patient}`,
                priority: NotificationPriority.Order,
            })

            await notificationSend(notification, [recipient])
        }
    }
}
