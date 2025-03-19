// export enum Occupation {

// }

export enum CheckInLocation {
    primaryCare = 'Primary care',
    urgentCare = 'Urgent care',
    emergencyCare = 'Emergency department',
}
export interface Patient {
    name: string,
    checkInLocation: CheckInLocation
    dateOfBirth: Date
    checkInTime: Date,
    chiefComplaint: string,
}
export type PatientSendable = { [k in keyof Patient]: string }

export function patientToSendable(p: Patient): PatientSendable {
    const { name, chiefComplaint, checkInLocation, dateOfBirth, checkInTime } = p
    return {
        name, checkInLocation, chiefComplaint,
        dateOfBirth: dateOfBirth.toDateString(),
        checkInTime: checkInTime.toString()
    }
}
export function patientFromSendable(ps: PatientSendable): Patient {
    const { name, chiefComplaint, checkInLocation, dateOfBirth, checkInTime } = ps
    return {
        name, chiefComplaint,
        checkInLocation: <CheckInLocation>checkInLocation,
        dateOfBirth: new Date(dateOfBirth),
        checkInTime: new Date(checkInTime),
    }
}
export function patientSendableFromFormData(fd: FormData): PatientSendable {
    const ret: { [k in keyof Patient]?: string } = {}

    console.log(fd)
    for (const entry of fd.entries()) {
        console.log('ENTRY IS ' + entry)
        const [k, v] = entry
        ret[<keyof Patient>k] = <string>v
    }
    ret.checkInTime = new Date().toString()

    return <PatientSendable>ret
}
