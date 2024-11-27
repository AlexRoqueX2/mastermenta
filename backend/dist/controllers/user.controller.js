"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getAllUsers = void 0;
const user_model_1 = __importDefault(require("../model/user.model"));
// Função para listar todos os usuários
const getAllUsers = async (req, res) => {
    try {
        const users = await user_model_1.default.find(); // Busca todos os usuários
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários', details: error });
    }
};
exports.getAllUsers = getAllUsers;
// Função para criar um novo usuário
const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const newUser = await user_model_1.default.create({ username, email, password });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao criar usuário', details: error });
    }
};
exports.createUser = createUser;
// Função para atualizar um usuário
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    try {
        const updatedUser = await user_model_1.default.findByIdAndUpdate(id, { username, email, password }, { new: true, runValidators: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar usuário', details: error });
    }
};
exports.updateUser = updateUser;
// Função para excluir um usuário
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await user_model_1.default.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.status(200).json({ message: 'Usuário excluído com sucesso', user: deletedUser });
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao excluir usuário', details: error });
    }
};
exports.deleteUser = deleteUser;
