import {
  NewPatient,
  Gender,
  EntryWithoutId,
  HealthCheckRating,
  Discharge,
  Diagnosis,
  SickLeave,
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseEmpolyerName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing employer name');
  }
  return name;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date of birth');
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (
    !discharge ||
    typeof discharge !== 'object' ||
    !('date' in discharge) ||
    !('criteria' in discharge)
  ) {
    throw new Error('Incorrect or missing discharge');
  }
  if (!isString(discharge.date) || !isDate(discharge.date)) {
    throw new Error('Incorrect or missing discharge date');
  }

  if (!isString(discharge.criteria)) {
    throw new Error('Incorrect or missing discharge criteria');
  }
  return discharge as Discharge;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };
    return newPatient;
  }

  throw new Error('Incorrect data: field missing');
};

const isHealthCheckRating = (value: number): value is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => Number(v))
    .includes(value);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  const value = Number(healthCheckRating);
  if (healthCheckRating === undefined || !isHealthCheckRating(value)) {
    throw new Error(
      `'Incorrect data: field missing for healthcheck rating: ${healthCheckRating}`
    );
  }
  return value;
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (
    !object ||
    typeof object !== 'object' ||
    !('startDate' in object) ||
    !('endDate' in object)
  ) {
    throw new Error('Incorrect data: missing field for sick leave');
  }
  if (
    isString(object.endDate) &&
    isDate(object.endDate) &&
    isString(object.startDate) &&
    isDate(object.startDate)
  ) {
    return object as SickLeave;
  }
  throw new Error('Incorrect data: invalid format for sick leave');
};

const parseHospitalEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data for Hospital Entry');
  }

  if (
    'date' in object &&
    'specialist' in object &&
    'description' in object &&
    'discharge' in object &&
    'type' in object
  ) {
    const newEntry = {
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      description: parseDescription(object.description),
      discharge: parseDischarge(object.discharge),
      diagnosisCodes:
        'diagnosisCodes' in object ? parseDiagnosisCodes(object) : undefined,
      type: 'Hospital' as const, // Update the type to be "Hospital"
    };
    return newEntry;
  }

  throw new Error('Incorrect data: field missing for Hospital Entry Type');
};

const parseHospitalCheckEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data for Hospital Check Entry');
  }

  if (
    'date' in object &&
    'specialist' in object &&
    'description' in object &&
    'healthCheckRating' in object &&
    'type' in object
  ) {
    const newEntry: EntryWithoutId = {
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      description: parseDescription(object.description),
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      diagnosisCodes:
        'diagnosisCodes' in object ? parseDiagnosisCodes(object) : undefined, // Fix the property name to 'diagnosisCodes'
      type: 'HealthCheck' as const, // Assign the correct type of "HealthCheck"
    };
    return newEntry;
  }

  throw new Error(
    'Incorrect data: field missing for Hospital Check Entry Type'
  );
};

const parseOccupationalHealthEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error(
      'Incorrect or missing data for Occupational Health Check Entry'
    );
  }
  if (
    'date' in object &&
    'employerName' in object &&
    'specialist' in object &&
    'description' in object &&
    'type' in object
  ) {
    const newEntry: EntryWithoutId = {
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      description: parseDescription(object.description),
      sickLeave:
        'sickLeave' in object ? parseSickLeave(object.sickLeave) : undefined,
      employerName: parseEmpolyerName(object.employerName),
      diagnosisCodes:
        'diagnosisCodes' in object
          ? parseDiagnosisCodes(object.diagnosisCodes)
          : undefined, // Fix the property name to 'diagnosisCodes'
      type: 'OccupationalHealthcare' as const, // Assign the correct type of "HealthCheck"
    };
    return newEntry;
  }

  throw new Error(
    'Incorrect data: field missing for Occupational Health Check Entry Type'
  );
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object' || !('type' in object)) {
    throw new Error('Incorrect or missing data');
  }
  switch (object.type) {
    case 'Hospital':
      return parseHospitalEntry(object);

    case 'HealthCheck':
      return parseHospitalCheckEntry(object);

    default:
      return parseOccupationalHealthEntry(object);
  }
};
