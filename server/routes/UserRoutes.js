// crete router
const express = require('express')
const router = express.Router()
const userSchema = require('./../model/userSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// get all users 
router.get('/users', async (req, res) => {
    try {
        const user = await userSchema.find()
        res.status(200).json(user)
    } catch (err) {
        console.log(err, 'err from /users')
        res.status(500).json({ 'msg': 'Server Error' })
    }
})

// register new user
router.post('/user/register', async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        console.log(name, username, email, password)
        if (!email || !password || !username || !name) {
            return res.status(400).json({ 'msg': 'Enter all required fild.' })
        }

        const emailExist = await userSchema.findOne({ email })
        console.log("user Exists : ", emailExist)
        if (emailExist) {
            return res.status(400).json({ 'msg': 'User with this email already exists.', })

        }
        const UsernameExist = await userSchema.findOne({ username })
        if (UsernameExist) {
            return res.status(400).json({ 'msg': "User with this username already exists." })
        }



        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        console.log(password, salt, hashedPassword)
        const newUser = new userSchema({
            name,
            username,
            password: hashedPassword,
            email,

        })
        const UpdatedUser = await newUser.save()

        res.status(201).json({ 'msg': "user registered successfully" })

    } catch (err) {
        console.log(err)
        res.status(500).send('server Error');

    }

})

// login route
router.post('/user/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // if email or passward null
        if (!email || !password) {
            return res.status(400).json({ 'msg': 'Enter valid email or Password' })

        }

        //if user not found 
        const user = await userSchema.findOne({ email })
        if (!user) {
            return res.status(400).json({ 'msg': "Invalid credentials." })
        }

        const isMatch =  bcrypt.compare(password, user.password)
        // if password not match
        if (!isMatch) {
            return res.status(400).json({ 'msg': "Invalid credentials." })
        }

        //user is valid create a payload
        const payload = {
            user: {
                id: user.id,
            }
        }


        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) {
                throw err;
            };

            return res.status(200).json({ token })
        })

    } catch (err) {
       return res.status(500).json({ 'msg': "Server Error" })
    }
})

//delete exist user
router.delete('/users/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        const deletedUser = await userSchema.findByIdAndDelete(req.params.id)
        res.json(deletedUser)
    } catch (err) {
        console.log(err, 'err on user Delete ::')
        res.send('data not found')
    }
})

module.exports = router;

