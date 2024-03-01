import data from '../../data/patients';
import { NewPatient, Patient } from '../types';
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

export default {
  getPatients,
  addPatient,
  getPatient,
};
