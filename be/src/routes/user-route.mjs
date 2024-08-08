import { Router } from 'express';
import { checkSchema, query } from 'express-validator';
import { userValidationSchema } from '../utils/validationSchema.mjs';
import { getUsers, createUser, getUser, updateUser, deleteUser, login, logout } from '../controllers/user.controller.mjs'

const router = Router();

const optionalFilters = [
    query('username').optional().isString().notEmpty().withMessage('Must not be empty').isLength({ min: 3, max: 10 }).withMessage('It must be between 3 to 10 character'),
    query('password').optional().isString().notEmpty().withMessage('Must not be empty').isLength({ min: 3, max: 30 }).withMessage('It must be between 3 to 30 character')
];


router.get("/api/users", optionalFilters, getUsers);

router.get('/api/user', getUser);

router.post("/api/user/login", login);

router.post("/api/user/logout", logout);

router.post("/api/user", checkSchema(userValidationSchema), createUser);

router.put("/api/users/:id", updateUser);

router.delete("/api/user/:id", deleteUser)

export default router;