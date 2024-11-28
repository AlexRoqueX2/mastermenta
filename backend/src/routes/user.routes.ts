import { Router } from 'express';
import { getAllUsers, getUsers, createUser, updateUser, deleteUser, loginUser } from '../controllers/user.controller';

const router = Router();

router.get('/user', getAllUsers);

router.get('/user/:id', getUsers);
router.post('/user', createUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

router.post('/user/login', loginUser);

export default router;


