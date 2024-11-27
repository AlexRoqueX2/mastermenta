import { Request, Response } from 'express';
import User from '../model/user.model';

// Função para listar todos os usuários
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find(); // Busca todos os usuários
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários', details: error });
    }
};

// Função para criar um novo usuário
export const createUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        const newUser = await User.create({ username, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar usuário', details: error });
    }
};


// Função para atualizar um usuário
export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, email, password } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { username, email, password },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar usuário', details: error });
    }
};


// Função para excluir um usuário
export const deleteUser = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.status(200).json({ message: 'Usuário excluído com sucesso', user: deletedUser });
    } catch (error) {
        res.status(400).json({ error: 'Erro ao excluir usuário', details: error });
    }
};


