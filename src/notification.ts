import { child, push, ref, serverTimestamp, set } from "firebase/database";
import { fireDb, getUid } from "./auth.js";
import { Medication } from "./medication.js";

export enum NotificationPriority {
    Info = 'Information',
    Urgent = 'Urgent',
    Critical = 'Critical',
    Order = 'Order',
}
export interface Notification {
    priority: NotificationPriority,
    sender: string,
    message: string,
    date: number | object, // object for `serverTimestamp()`
    read: boolean,
}

export enum OrderType {
    Medication = 'Medication',
    PhysicalExam = 'Physical Exam',
}
export interface OrderNotification extends Notification {
    priority: NotificationPriority.Info,
    orderType: OrderType,
}
export interface OrderMedicationNotification extends OrderNotification {
    orderType: OrderType.Medication,
    medName: string,
    recipientID: string,
    patientID: string,
    amount: number,
}

interface NotificationCreateType {
    priority: string,
    message: string,
    [ name: string ]: any,
}
export const notificationCreate = (obj: NotificationCreateType) => (<Notification>{
    sender: getUid(),
    date: serverTimestamp(),
    read: false,
    ...obj
})

export async function notificationSend(notification: Notification, recipientUids: String[]) {
    for (const recipientUid of recipientUids) {
        const notificationsRef = ref(fireDb, `/notifications/${recipientUid}`)
        const key = push(notificationsRef).key!
        console.log('EJOIFEJOWFIJEFW', notification)
        await set(child(notificationsRef, key), notification)
    }
}
