import jwt from 'jsonwebtoken';
import config from "../config/config.js";

// generate jwt token
export const encodeToken = (data) => {

    const payload = { data };
    const key = config.JWT_KEY;
    const expire = config.JWT_EXPIRED;

    return jwt.sign(payload, key, { expiresIn: expire })
}




// verify jwt token
export const decodeToken = (token) => {

    try {

        const decoded = jwt.verify(token, config.JWT_KEY);
        return decoded;

    } catch (error) {
        return null
    }

}

