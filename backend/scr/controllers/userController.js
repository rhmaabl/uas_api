const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll({
                attributes: ['id_user', 'username', 'email', 'role', 'created_at', 'updated_at']
            });
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getUserById: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id, {
                attributes: ['id_user', 'username', 'email', 'role', 'created_at', 'updated_at']
            });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    createUser: async (req, res) => {
        try {
            const { username, password, email, role } = req.body;
            const existingUser = await User.findOne({ where: { username } });
            if (existingUser) {
                return res.status(400).json({ message: 'Username already exists' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const token = jwt.sign(
                { username, role: role || 'kasir' },
                JWT_SECRET,
                { expiresIn: '24h' }
            );
            const user = await User.create({
                username,
                password: hashedPassword,
                email,
                role: role || 'kasir',
                token
            });
            res.status(201).json({
                message: 'User created successfully',
                token,
                user: {
                    id: user.id_user,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateUser: async (req, res) => {
        try {
            const { username, email, role } = req.body;
            const user = await User.findByPk(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const token = jwt.sign(
                { id: user.id_user, username: username || user.username, role: role || user.role },
                JWT_SECRET,
                { expiresIn: '24h' }
            );
            await user.update({
                username: username || user.username,
                email: email || user.email,
                role: role || user.role,
                token
            });
            res.json({
                message: 'User updated successfully',
                token,
                user: {
                    id: user.id_user,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            await user.destroy();
            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = userController; 