import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import booksRouter from './routes/books.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/books', booksRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
