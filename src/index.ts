import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import Livro from './models/livro';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/crud_livros', {
}).then(() => console.log('Connected to MongoDB')).catch(err => console.error(err));

// Routes
app.get('/livros', async (req: Request, res: Response) => {
    const livros = await Livro.find();
    res.json(livros);
});

app.post('/livros', async (req: Request, res: Response) => {
    const novoLivro = new Livro(req.body);
    await novoLivro.save();
    res.status(201).json(novoLivro);
});

app.delete('/livros/:id', async (req: Request, res: Response) => {
    await Livro.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));