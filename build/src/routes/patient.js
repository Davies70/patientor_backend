"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientServices_1 = __importDefault(require("../services/patientServices"));
const utils_1 = require("../utils");
const patientRouter = express_1.default.Router();
patientRouter.get('/', (_req, res) => {
    res.send(patientServices_1.default.getPatients());
});
patientRouter.post('/', (req, res) => {
    try {
        const newPatient = (0, utils_1.toNewPatient)(req.body);
        const addedPatient = patientServices_1.default.addPatient(newPatient);
        res.json(addedPatient);
    }
    catch (e) {
        let errorMessage = 'Something went wrong';
        if (e instanceof Error) {
            errorMessage += ' Error: ' + e.message;
            res.status(400).send(errorMessage);
        }
    }
});
patientRouter.get('/:id', (req, res) => {
    const foundPatient = patientServices_1.default.getPatient(req.params.id);
    if (foundPatient) {
        res.json(foundPatient);
    }
    else {
        res.status(400).send(`Error: patient was not found`);
    }
});
patientRouter.post('/:id/entries', (req, res) => {
    try {
        const newEntry = (0, utils_1.toNewEntry)(req.body);
        const addedEntry = patientServices_1.default.addEntry(newEntry, req.params.id);
        res.json(addedEntry);
    }
    catch (e) {
        if (e instanceof Error) {
            let errorMessage = 'Something went wrong.';
            errorMessage += ' Error: ' + e.message;
            res.status(400).send(errorMessage);
        }
    }
});
patientRouter.put('/', (req, res) => {
    try {
        const { healthRating, id } = (0, utils_1.toNewRating)(req.body);
        patientServices_1.default.changeHealthRating(healthRating, id);
    }
    catch (e) {
        let errorMessage = 'Something went wrong';
        if (e instanceof Error) {
            errorMessage += ' Error: ' + e.message;
            res.status(400).send(errorMessage);
        }
    }
});
exports.default = patientRouter;
