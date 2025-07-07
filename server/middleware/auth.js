const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const protect = async (req, res, next) => {
    try {
        if (!req.headers.authorization || !req.header.authorization.startsWith('Bearer')) {
            return res.status(400).json({ 'msg': "Not authorized, user not found" })
        }
        const token = req.header.authorization.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            console.log('decoded failed ', decoded)
        }
        console.log('decoded -', decoded)

        req.user = User.findById(decoded.id).select('-password');
  
        if (!req.user) {
            return res.status(401).json({ 'msg': "Not authorized, user not found" })
        }

        next();
    } catch(err) {
        res.status(401).json({'msg': "Authorization failed"})
    }
}


module.exports = protect;
