import express from 'express';
import patientServices from '../services/patientServices';
import { toNewPatient } from '../utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  res.send(patientServices.getPatients());
});

patientRouter.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientServices.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e: unknown) {
    let errorMessage = 'Something went wrong';
    if (e instanceof Error) {
      errorMessage += ' Error: ' + e.message;
      res.status(400).send(errorMessage);
    }
  }
});

patientRouter.get('/:id', (req, res) => {
  const foundPatient = patientServices.getPatient(req.params.id);
  if (foundPatient) {
    res.json(foundPatient);
  } else {
    res.status(400).send(`Error: patient was not found`);
  }
});

export default patientRouter;
