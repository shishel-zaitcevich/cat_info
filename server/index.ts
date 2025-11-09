import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import geminiRouter from './api/gemini.ts';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/gemini', geminiRouter);

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
