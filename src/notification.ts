import { child, push, ref, serverTimestamp, set } from "firebase/database";
import { fireDb, getUid } from "./auth.js";

export interface Notification {
    sender: string,
    priority: NotificationPriority,
    message: string,
    date: number | object, // object for `serverTimestamp()`
    read: boolean,
}
export enum NotificationPriority {
    Info = 'Information',
    Urgent = 'Urgent',
    Critical = 'Critical',
}

export const notificationCreate = (priority: NotificationPriority, message: string) => (<Notification>{
    sender: getUid(),
    priority,
    message,
    date: serverTimestamp(),
    read: false
})

export async function notificationSend(notification: Notification, recipientUids: String[]) {
    for (const recipientUid of recipientUids) {
        const notificationsRef = ref(fireDb, `/notifications/${recipientUid}`)
        const key = push(notificationsRef).key!
        console.log('EJOIFEJOWFIJEFW', notification)
        await set(child(notificationsRef, key), notification)
    }
}
