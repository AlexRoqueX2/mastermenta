import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Middleware para processar os erros de validação
export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            status: 'error',
            message: 'Dados inválidos',
            errors: errors.array(),
        });
    } else {
        next();
    }
};