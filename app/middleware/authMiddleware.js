import { decodeToken } from "../utility/tokenUtility.js";


export default (req, res, next) =>{

    // take the token from the cookies
    let token = req.cookies["Token"];

    // decode the token
    const decoded = decodeToken(token);


    // if token is invalid  
    if(decoded === null){
        res.status(401).json({
            status:false,
            message:"Unauthorize"
        })
    }
    else{

        // if the token is valid

        // take the data from token
        const email = decoded.data;

        // set the data (email) to headers for future use
        req.headers.email = email;

        // call the next stage
        next();
    }
}