import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import currencyRoutes from './routes/currency.routes';

const app = express();

app.use(cors({
  origin: ['http://localhost:4200']
}));

app.use(express.json());
app.use('/api', currencyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});