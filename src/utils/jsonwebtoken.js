import jwt from "jsonwebtoken";


const PRIVATE_KEY = process.env.PRIVATE_KEY

const generateToken = (user) => {
    const token = jwt.sign(user, PRIVATE_KEY, {expiresIn:"12h"});
    return token
}

export default generateToken;