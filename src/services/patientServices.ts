import data from '../../data/patients';
import { NewPatient, Patient, EntryWithoutId, Entry } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return data;
};

const getPatient = (id: string): Patient | undefined => {
  const patient = data.find((d) => d.id === id);
  if (patient) {
    const foundPatient = {
      ...patient,
    };
    return foundPatient;
  }
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    ...patient,
    id: uuid(),
  };
  data.push(newPatient);
  return newPatient;
};

const addEntry = (entry: EntryWithoutId, id: string): Entry => {
  const newEntry = {
    ...entry,
    id: uuid(),
  };
  data.forEach((patient: Patient) => {
    if (patient.id === id) {
      patient.entries.push(newEntry);
    }
  });
  return newEntry;
};

const changeHealthRating = (rating: number, id: string) => {
  const index = data.findIndex((patient) => {
    return patient.id === id;
  });
  if (index !== -1) {
    const patient = data[index];
    data[index] = { ...patient, healthRating: rating };
  }
};

export default {
  getPatients,
  addPatient,
  getPatient,
  addEntry,
  changeHealthRating,
};
