import { Router } from 'express';
import { getAllUsers, createUser, updateUser, deleteUser } from '../controllers/user.controller';

const router = Router();

// Rota para buscar todos os usuários
router.get('/', getAllUsers);

// Rota para criar um novo usuário
router.post('/', createUser);

// Rota para atualizar um usuário
router.put('/', updateUser);

// Rota para excluir um usuário
router.delete('/:id', deleteUser);


export default router;


