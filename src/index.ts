import express from 'express';
import cors from 'cors';
import diagnosisRouter from './routes/diagnoses';
import patientRouter from './routes/patient';
import path from 'path';

const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));
app.use('/api/diagnosis', diagnosisRouter);
app.use('/api/patients', patientRouter);

const PORT = process.env.PORT || 3001;

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

// Serve your React application's index.html for all routes
app.get('*', (_req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
