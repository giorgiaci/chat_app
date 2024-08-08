import { validationResult } from 'express-validator';
import { User } from '../mongoose-schema/user-schema.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import configEnv from '../../config-env.js';

export const getUsers = async (req, res) => {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        const { username, password } = req.query;
    
        const searchCriteria = {};
        if (username) searchCriteria.username = username;
        if (password) searchCriteria.password = password;

        try {
            let users;

            if(searchCriteria.username && searchCriteria.password){
                users = await User.findOne(searchCriteria);
            } else {
                users = await User.find({})
            }          

            if (users) {
                res.status(200).send(users);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
};

export const getUser = async (req, res) => {
    try {         
        const cookie = req.cookies['jwt'];

        const claims = jwt.verify(cookie, configEnv.jwtSecretKey);

        if(!claims){
            res.status(401).send({ errors: "Not authenticated" });
        }

        const user = await User.findOne({_id: claims._id})
        const { password, ...data} = await user.toJSON();
       
        res.status(200).send(data);
        
    } catch (error) {
        res.status(500).send({ errors: error.array() });
    }
};

export const logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 0 });
    return res.send({message: 'You have been logged out'})
}

export const login = async (req, res) => {
   const user = await User.findOne({email: req.body.email});

    if(!user){
        return res.status(404).send({message: 'User not found'});
    }

    if(!await bcrypt.compare(req.body.password, user.password)){
        return res.status(400).send({message: "Invalid credentials"})
    } else {     
        const token = jwt.sign({_id: user._id}, configEnv.jwtSecretKey);

        // res.cookie('jwt', token, {
        //     httpOnly: true,
        //     maxAge: 24 * 60 * 60 * 1000 //1d
        // })
        
        let { password, ...data } = await user.toJSON();
        
        data.token = token;
        return res.status(200).send(data)
    }
}

export const createUser = async (req, res) => {
    const user = await User.findOne({ username: req.body.username, email: req.body.email });

    if(user) {
        res.status(400).send({ error: "User already exist"})
        return;
    }
    
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).send({ errors: result.array() });
   
    const salt = await bcrypt.genSalt(10);
    const ashPassword = bcrypt.hash(req.body.password, salt);
    
    const newUser = new User({
        username: req.body.username,
        password: await ashPassword,
        email: req.body.email
    });
    
    try {
        const savedUser = await newUser.save();
        const {password, ...data} = await savedUser.toJSON();
        
        return res.status(201).send(data);
    } catch (err) {
        console.log(err)
        return res.sendStatus(400);
    }
    
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndUpdate(id, req.body);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const updatedUser = await User.findById(id);
        res.status(200).send(updatedUser);

    } catch (error) {
        res.status(500).send({ message: error.message });
    }

};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await User.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};