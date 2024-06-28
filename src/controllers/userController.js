const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    try {

        const { name, mobile_no, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, mobile_no, email, password: hashedPassword });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, mobile_no, email } = req.body;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.name = name;
        user.mobile_no = mobile_no;
        user.email = email;
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await User.deleteOne({ _id: id });
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.listUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.searchUser = async (req, res) => {
    try {
        const { name } = req.query;
        const users = await User.find({ name: new RegExp(name, 'i') });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.followUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(req.user.id);
        if (!user.following.includes(id)) {
            user.following.push(id);
            await user.save();
            const followedUser = await User.findById(id);
            followedUser.followers.push(req.user.id);
            await followedUser.save();
            res.status(200).json({ message: 'User followed' });
        } else {
            res.status(400).json({ error: 'Already following this user' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.unfollowUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(req.user.id);
        user.following.pull(id);
        await user.save();
        const unfollowedUser = await User.findById(id);
        unfollowedUser.followers.pull(req.user.id);
        await unfollowedUser.save();
        res.status(200).json({ message: 'User unfollowed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};