import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import User from './model/user.model';
import userRoutes from './routes/user.routes';

const app = express();
const mongoUri = 'mongodb+srv://alexroquex2:mentaMentoso@mastermentadb.3sa9o.mongodb.net/?retryWrites=true&w=majority&appName=masterMentaDB'; // Ajuste conforme seu ambiente

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});

app.use('/users', userRoutes); // Prefixo para as rotas de usuário

// Porta
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

mongoose
    .connect(mongoUri)
    .then(() => {
        console.log('Conectado ao MongoDB');
    })
    .catch((err) => {
        console.error('Erro ao conectar ao MongoDB:', err);
    });


// Teste de criação de usuário
const testUser = async () => {
    try {
        const newUser = await User.create({
            username: 'alex',
            email: 'alex@example.com',
            password: '123456', // Vamos implementar hash depois
        });
        console.log('Usuário criado:', newUser);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
    }
};

//testUser();

