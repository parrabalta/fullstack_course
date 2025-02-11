import patientsData from '../../data/patients'
import { NonSensitivePatientEntry, PatientsEntry } from '../types'

const patients: PatientsEntry[] = patientsData as PatientsEntry[];

export const getPatients = (): PatientsEntry[] => {
    return patients;
  }

export const getNonSensitivePatients = (): NonSensitivePatientEntry[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
}


