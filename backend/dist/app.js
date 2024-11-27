"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("./model/user.model"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const app = (0, express_1.default)();
const mongoUri = 'mongodb+srv://alexroquex2:mentaMentoso@mastermentadb.3sa9o.mongodb.net/?retryWrites=true&w=majority&appName=masterMentaDB'; // Ajuste conforme seu ambiente
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Rota de teste
app.get('/', (req, res) => {
    res.send('Servidor funcionando!');
});
app.use('/users', user_routes_1.default); // Prefixo para as rotas de usuário
// Porta
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
mongoose_1.default
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
        const newUser = await user_model_1.default.create({
            username: 'alex',
            email: 'alex@example.com',
            password: '123456', // Vamos implementar hash depois
        });
        console.log('Usuário criado:', newUser);
    }
    catch (error) {
        console.error('Erro ao criar usuário:', error);
    }
};
//testUser();
