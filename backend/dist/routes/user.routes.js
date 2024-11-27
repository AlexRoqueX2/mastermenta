"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
// Rota para buscar todos os usuários
router.get('/', user_controller_1.getAllUsers);
// Rota para criar um novo usuário
router.post('/', user_controller_1.createUser);
// Rota para atualizar um usuário
router.put('/:id', user_controller_1.updateUser);
// Rota para excluir um usuário
router.delete('/:id', user_controller_1.deleteUser);
exports.default = router;
