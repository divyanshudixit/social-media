const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {
    
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        console.log('Auth Middleware: Token not provided');
        return res.status(401).json({ error: 'Token not provided' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            throw new Error();
        }
        req.user = user;
        console.log('Auth Middleware: User authenticated');
        next();
    } catch (error) {
        console.log('Auth Middleware: Error -', error);
        res.status(401).json({ error: 'Please authenticate.' });
    }
};