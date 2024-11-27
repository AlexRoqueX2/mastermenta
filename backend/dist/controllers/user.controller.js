"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = exports.getAllUsers = void 0;
const user_model_1 = __importDefault(require("../model/user.model"));
// Função para listar todos os usuários
const getAllUsers = async (req, res) => {
    try {
        const users = await user_model_1.default.find(); // Busca todos os usuários
        res.status(200).json({
            status: 'success',
            message: 'Usuários buscados com sucesso',
            data: users,
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Erro ao buscar usuários',
            data: null,
            details: error,
        });
    }
};
exports.getAllUsers = getAllUsers;
const getUsers = async (req, res) => {
    try {
        const user = await user_model_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'Usuário não encontrado',
                data: null,
            });
        }
        res.json({
            status: 'success',
            message: 'Usuário encontrado',
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Erro ao buscar usuário',
            data: null,
            details: error,
        });
    }
};
exports.getUsers = getUsers;
// Função para criar um novo usuário
const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const newUser = await user_model_1.default.create({ username, email, password });
        res.status(201).json({
            status: 'success',
            message: 'Usuário criado com sucesso',
            data: newUser,
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Erro ao criar usuário',
            data: null,
            details: error,
        });
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
            return res.status(404).json({
                status: 'error',
                message: 'Usuário não encontrado',
                data: null,
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Usuário atualizado com sucesso',
            data: updatedUser,
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Erro ao atualizar usuário',
            data: null,
            details: error,
        });
    }
};
exports.updateUser = updateUser;
// Função para excluir um usuário
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await user_model_1.default.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({
                status: 'error',
                message: 'Usuário não encontrado',
                data: null,
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Usuário excluído com sucesso',
            data: deletedUser,
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Erro ao excluir usuário',
            data: null,
            details: error,
        });
    }
};
exports.deleteUser = deleteUser;
