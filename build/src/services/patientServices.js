"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getPatients = () => {
    return patients_1.default;
};
const getPatient = (id) => {
    const patient = patients_1.default.find((d) => d.id === id);
    if (patient) {
        const foundPatient = Object.assign({}, patient);
        return foundPatient;
    }
    return patient;
};
const addPatient = (patient) => {
    const newPatient = Object.assign(Object.assign({}, patient), { id: (0, uuid_1.v1)() });
    patients_1.default.push(newPatient);
    return newPatient;
};
const addEntry = (entry, id) => {
    const newEntry = Object.assign(Object.assign({}, entry), { id: (0, uuid_1.v1)() });
    patients_1.default.forEach((patient) => {
        if (patient.id === id) {
            patient.entries.push(newEntry);
        }
    });
    return newEntry;
};
const changeHealthRating = (rating, id) => {
    const index = patients_1.default.findIndex((patient) => {
        return patient.id === id;
    });
    if (index !== -1) {
        const patient = patients_1.default[index];
        patients_1.default[index] = Object.assign(Object.assign({}, patient), { healthRating: rating });
    }
};
exports.default = {
    getPatients,
    addPatient,
    getPatient,
    addEntry,
    changeHealthRating,
};
