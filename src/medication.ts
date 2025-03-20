import { child, DatabaseReference, get, ref, set } from "firebase/database";
import { fireDb } from "./auth";

export enum AdministerMethod {
    Oral = 0,
    Intravenous,
    Intramuscular,
    Rectal,
    Subligual,
    Transdermal,
    Intradermal,
}

export interface Medication {
    name: string,
    // administerMethods: Set<AdministerMethod>,
    administerMethod: number,

    // This is in milligrams!!!
    // dosageAmounts: { [method in AdministerMethod]: number }

    // This is in milligrams!!!
    dosageAmount: number,
}

interface MedicationSendable {
    administerMethod: AdministerMethod,
    dosageAmount: number,
}
export async function medicationUpdate(med: Medication) {
    const medRef = ref(fireDb, '/medications')

    const sendable: MedicationSendable = {
        administerMethod: med.administerMethod,
        dosageAmount: med.dosageAmount,
    }
    await set(child(medRef, med.name), sendable)
}
export async function medicationGet(name: string): Promise<Medication> {
    const medResp = await get(child(ref(fireDb), name))
    const med: MedicationSendable = medResp.val()

    return {
        name: name,
        administerMethod: med.administerMethod,
        dosageAmount: med.dosageAmount,
    }
}

// interface MedicationSendable {
//     administerMethods: AdministerMethod[],
//     dosageAmounts: { [method in AdministerMethod]: number }
// }
// export async function medicationUpdate(med: Medication, ref: DatabaseReference) {
//     const sendable: MedicationSendable = {
//         administerMethods: Array.from(med.administerMethods),
//         dosageAmounts: med.dosageAmounts,
//     }
//     await set(child(ref, med.name), sendable)
// }
