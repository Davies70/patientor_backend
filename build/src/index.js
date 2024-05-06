"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const diagnoses_1 = __importDefault(require("./routes/diagnoses"));
const patient_1 = __importDefault(require("./routes/patient"));
const app = (0, express_1.default)();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static('dist'));
app.use('/api/diagnosis', diagnoses_1.default);
app.use('/api/patients', patient_1.default);
const PORT = process.env.PORT || 3001;
app.get('/api/ping', (_req, res) => {
    res.send('pong');
});
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});
