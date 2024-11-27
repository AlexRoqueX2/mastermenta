import { Router } from 'express';
import { getAllUsers, getUsers, createUser, updateUser, deleteUser, validateCreateUser} from '../controllers/user.controller';

const router = Router();

// Rota para buscar todos os usuários
router.get('/', getAllUsers);

// Rota para buscar um usuários por id
router.get('/:id', getUsers);

// Rota para criar um novo usuário
router.post('/', createUser);
router.post('/', validateCreateUser, createUser);

// Rota para atualizar um usuário
router.put('/:id', updateUser);

// Rota para excluir um usuário
router.delete('/:id', deleteUser);


export default router;


