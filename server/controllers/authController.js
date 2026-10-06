import User from '../models/User.js'
import generateToken from '../utils/generateToken.js'

export const registerUser = async(req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'please enter all the fields'
            });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists.'
            });
        }
        const user = await User.create({
            name,
            email,
            password,
        });
        res.status(201).json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            },
        });

        
    } catch (err) {
       return res.status(400).json({
            success: false,
            message: 'server error during registration',
            err: err.message,
        });
    }
}

export const loginUser = async (req, res) => {
    console.log(req.body);
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                status: false,
                message: 'Please provide email and password',
            });
        }
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
           res.status(201).json({
             success: true,
             user: {
               _id: user._id,
               name: user.name,
               email: user.email,
               role: user.role,
               token: generateToken(user._id),
             },
           }); 
        }
        else {
            res.status(401).json({
                success: false,
                message: 'invalid credentials',
            });
        }

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'server error during login',
            err: err.message,
        })
    }
}