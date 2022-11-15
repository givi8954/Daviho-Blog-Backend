import { body } from "express-validator";

export const loginValidation = [
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5})
];

export const registerValidation = [
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5}),
    body('fullName','Enter name').isLength({ min: 3}),
    body('avatarUrl', 'invalid link on your avatar').optional().isURL(),
];

export const postCreateValidation = [
    body('title', 'Enter title').isLength({ min: 3 }).isString(),
    body('text', 'Enter text').isLength({ min: 3}).isString(),
    body('tags','Invalid tag').optional().isString(),
    body('imageUrl', 'invalid link on your image').optional().isString(),
];