import User from "../models/User.js"
import jwt from 'jsonwebtoken'


// middleware to protect routes
export const protectRoute = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization?.startsWith('Bearer ')
            ? req.headers.authorization.split(' ')[1]
            : null
        const token = req.headers.token || bearerToken

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized - No token provided',
            })
        }

        const decoded =  jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId).select("-password") // selecting user without password field

        if(!user){
            return res.status(401).json({
                success : false,
                message: "User Not Found"
            })
        }

        req.user = user;
        next()
    }
    catch(error){
        console.log(error.message)
        res.status(401).json({success: false, message: 'Unauthorized - Invalid token'})
    }
} 
