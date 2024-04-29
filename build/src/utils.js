"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.toNewRating = exports.toNewPatient = void 0;
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseName = (name) => {
    if (!isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};
const parseEmpolyerName = (name) => {
    if (!isString(name)) {
        throw new Error('Incorrect or missing employer name');
    }
    return name;
};
const parseDate = (date) => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date of birth');
    }
    return date;
};
const parseSsn = (ssn) => {
    if (!isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};
const isGender = (gender) => {
    return Object.values(types_1.Gender)
        .map((v) => v.toString())
        .includes(gender);
};
const parseGender = (gender) => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};
const parseSpecialist = (specialist) => {
    if (!isString(specialist)) {
        throw new Error('Incorrect or missing specialist');
    }
    return specialist;
};
const parseDescription = (description) => {
    if (!isString(description)) {
        throw new Error('Incorrect or missing description');
    }
    return description;
};
const parseDischarge = (discharge) => {
    if (!discharge ||
        typeof discharge !== 'object' ||
        !('date' in discharge) ||
        !('criteria' in discharge)) {
        throw new Error('Incorrect or missing discharge');
    }
    if (!isString(discharge.date) || !isDate(discharge.date)) {
        throw new Error('Incorrect or missing discharge date');
    }
    if (!isString(discharge.criteria)) {
        throw new Error('Incorrect or missing discharge criteria');
    }
    return discharge;
};
const parseDiagnosisCodes = (object) => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        // we will just trust the data to be in correct form
        return [];
    }
    return object.diagnosisCodes;
};
const toNewPatient = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object &&
        'dateOfBirth' in object &&
        'ssn' in object &&
        'gender' in object &&
        'occupation' in object) {
        const newPatient = {
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
exports.toNewPatient = toNewPatient;
const toNewRating = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('id' in object && 'healthRating' in object) {
        const RatingAndId = {
            healthRating: Number(object.healthRating),
            id: String(object.id),
        };
        return RatingAndId;
    }
    throw new Error('Incorrect data: field missing');
};
exports.toNewRating = toNewRating;
const isHealthCheckRating = (value) => {
    return Object.values(types_1.HealthCheckRating)
        .map((v) => Number(v))
        .includes(value);
};
const parseHealthCheckRating = (healthCheckRating) => {
    const value = Number(healthCheckRating);
    if (healthCheckRating === undefined || !isHealthCheckRating(value)) {
        throw new Error(`'Incorrect data: field missing for healthcheck rating: ${healthCheckRating}`);
    }
    return value;
};
const parseSickLeave = (object) => {
    if (!object ||
        typeof object !== 'object' ||
        !('startDate' in object) ||
        !('endDate' in object)) {
        throw new Error('Incorrect data: missing field for sick leave');
    }
    if (isString(object.endDate) &&
        isDate(object.endDate) &&
        isString(object.startDate) &&
        isDate(object.startDate)) {
        return object;
    }
    throw new Error('Incorrect data: invalid format for sick leave');
};
const parseHospitalEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data for Hospital Entry');
    }
    if ('date' in object &&
        'specialist' in object &&
        'description' in object &&
        'discharge' in object &&
        'type' in object) {
        const newEntry = {
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            description: parseDescription(object.description),
            discharge: parseDischarge(object.discharge),
            diagnosisCodes: 'diagnosisCodes' in object ? parseDiagnosisCodes(object) : undefined,
            type: 'Hospital', // Update the type to be "Hospital"
        };
        return newEntry;
    }
    throw new Error('Incorrect data: field missing for Hospital Entry Type');
};
const parseHospitalCheckEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data for Hospital Check Entry');
    }
    if ('date' in object &&
        'specialist' in object &&
        'description' in object &&
        'healthCheckRating' in object &&
        'type' in object) {
        const newEntry = {
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            description: parseDescription(object.description),
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
            diagnosisCodes: 'diagnosisCodes' in object ? parseDiagnosisCodes(object) : undefined, // Fix the property name to 'diagnosisCodes'
            type: 'HealthCheck', // Assign the correct type of "HealthCheck"
        };
        return newEntry;
    }
    throw new Error('Incorrect data: field missing for Hospital Check Entry Type');
};
const parseOccupationalHealthEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data for Occupational Health Check Entry');
    }
    if ('date' in object &&
        'employerName' in object &&
        'specialist' in object &&
        'description' in object &&
        'type' in object) {
        const newEntry = {
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            description: parseDescription(object.description),
            sickLeave: 'sickLeave' in object ? parseSickLeave(object.sickLeave) : undefined,
            employerName: parseEmpolyerName(object.employerName),
            diagnosisCodes: 'diagnosisCodes' in object
                ? parseDiagnosisCodes(object.diagnosisCodes)
                : undefined, // Fix the property name to 'diagnosisCodes'
            type: 'OccupationalHealthcare', // Assign the correct type of "HealthCheck"
        };
        return newEntry;
    }
    throw new Error('Incorrect data: field missing for Occupational Health Check Entry Type');
};
const toNewEntry = (object) => {
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
exports.toNewEntry = toNewEntry;
