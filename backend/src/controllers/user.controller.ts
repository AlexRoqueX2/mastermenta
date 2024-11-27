import { Request, Response } from 'express';
import User from '../model/user.model';

// Função para listar todos os usuários
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find(); // Busca todos os usuários
        res.status(200).json({
            status: 'success',
            message: 'Usuários buscados com sucesso',
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Erro ao buscar usuários',
            data: null,
            details: error,
        });
    }
};

export const getUsers = async (req: any, res: any) => {
    try {
        const user = await User.findById(req.params.id);
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
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Erro ao buscar usuário',
            data: null,
            details: error,
        });
    }
};


// Função para criar um novo usuário
export const createUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        const newUser = await User.create({ username, email, password });
        res.status(201).json({
            status: 'success',
            message: 'Usuário criado com sucesso',
            data: newUser,
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Erro ao criar usuário',
            data: null,
            details: error,
        });
    }
};


// Função para atualizar um usuário
export const updateUser = async (req: any, res: any) => {
    const { id } = req.params;
    const { username, email, password } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { username, email, password },
            { new: true, runValidators: true }
        );
        
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
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Erro ao atualizar usuário',
            data: null,
            details: error,
        });
    }
};


// Função para excluir um usuário
export const deleteUser = async (req: any, res: any) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);

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
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Erro ao excluir usuário',
            data: null,
            details: error,
        });
    }
};


