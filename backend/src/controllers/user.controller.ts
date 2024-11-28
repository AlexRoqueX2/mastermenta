import { Request, Response } from 'express';
import User from '../model/user.model';

const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");

export const getAllUsers = async (req: Request, res: Response) => {
    if (!isUserAuthenticated(req.headers['authorization'])) {
        res.status(401).json(buildErrorResponse('Usuario não autenticado'));
        return;
    }

    try {
        const users = await User.find();

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
    if (!isUserAuthenticated(req.headers['authorization'])) {
        res.status(401).json(buildErrorResponse('Usuario não autenticado'));
    }

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

export const createUser = async (req: any, res: any) => {
    const { username, email, password } = req.body;

    if (username?.length < 3) {
        res.status(400).json(buildErrorResponse('O nome de usuário deve ter pelo menos 3 caracteres'));
        return;
    }

    if (password?.length < 6) {
        res.status(400).json(buildErrorResponse('A senha deve ter pelo menos 6 caracteres'));
        return;
    }

    if (!email?.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        res.status(400).json(buildErrorResponse('O email está inválido'));
        return;
    }

    let existingUser = null;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        res.status(400).json(buildErrorResponse('Erro ao criar usuário', error));
        return;
    }

    if (existingUser) {
        res.status(400).json(buildErrorResponse('Usuário já existe'));
        return;
    }

    try {
        const newUser = await User.create({ username, email, password: encryptPassword(password) });
        res.status(201).json({
            status: 'success',
            message: 'Usuário criado com sucesso',
            data: newUser,
        });
    } catch (error) {
        res.status(400).json(buildErrorResponse('Erro ao criar usuário', error));
    }
};

export const updateUser = async (req: any, res: any) => {
    if (!isUserAuthenticated(req.headers['authorization'])) {
        res.status(401).json(buildErrorResponse('Usuario não autenticado'));
        return;
    }

    const { id } = req.params;
    const { username, email, password } = req.body;

    if (username.length < 3) {
        res.status(400).json(buildErrorResponse('O nome de usuário deve ter pelo menos 3 caracteres'));
        return;
    }

    if (password.length < 6) {
        res.status(400).json(buildErrorResponse('A senha deve ter pelo menos 6 caracteres'));
        return;
    }

    if (!email?.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        res.status(400).json(buildErrorResponse('O email está inválido'));
        return;
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { username, email, password: encryptPassword(password) },
            { new: true, runValidators: true }
        );
        
        if (!updatedUser) {
            res.status(404).json(buildErrorResponse('Usuário não encontrado'));
            return;
        }

        res.status(200).json({
            status: 'success',
            message: 'Usuário atualizado com sucesso',
            data: updatedUser,
        });
    } catch (error) {
        res.status(400).json(buildErrorResponse('Erro ao atualizar usuário', error));
    }
};

export const deleteUser = async (req: any, res: any) => {
    if (!isUserAuthenticated(req.headers['authorization'])) {
        res.status(401).json(buildErrorResponse('Usuario não autenticado'));
        return;
    }

    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            res.status(404).json(buildErrorResponse('Usuário não encontrado'));
            return;
        }

        res.status(200).json({
            status: 'success',
            message: 'Usuário excluído com sucesso',
            data: deletedUser,
        });
    } catch (error) {
        res.status(400).json(buildErrorResponse('Erro ao excluir usuário', error));
    }
};

export const loginUser = async (req: any, res: any) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json(buildErrorResponse('Email e senha obrigatórios'));
        return;
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json(buildErrorResponse('Usuário nao encontrado'));
            return;
        }

        if (decriptPassword(user.password) !== password) {
            res.status(401).json(buildErrorResponse('Senha incorreta'));
            return;
        }

        jwt.sign(req.body, 'chave', (err: any, token: any) => {
            if (err) {
                buildErrorResponse('Erro ao logar usuário', err)
                return;
            }

            res.status(200).json({
                status: 'success',
                message: 'Usuário logado com sucesso',
                data: { token },
            });
        });

    } catch (error) {
        res.status(400).json(buildErrorResponse('Erro ao logar usuário', error));
    }
};

function isUserAuthenticated(token?: string) {
    if (!token) {
        return false;
    }

    let authenticated = null;
    jwt.verify(token, 'chave', (err: any) => {
        authenticated = err === null ? false : true
    });
    
    return authenticated;
}

function buildErrorResponse(message: string, error: any = null) {
    return {
        status: 'error',
        message,
        data: null,
        details: error,
    };
}

function encryptPassword(senha: string) {
    return crypto.AES.encrypt(senha, 'segredo').toString()
};

function decriptPassword(senha: string) {
    const bytes = crypto.AES.decrypt(senha, 'segredo');
    return bytes.toString(crypto.enc.Utf8)
};