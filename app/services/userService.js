import UserModel from "../model/user.model.js";
import { encodeToken } from "../utility/tokenUtility.js";


// register services
export const registerServices = async (req, res) => {
    
    // try-catch for error handeling
    try {

        // take the data from request
        let userData = req.body;

        // save the data to data base using model
        const data = await UserModel.create(userData);

        // send response from the server to client
        return {
            status: 200,
            data
        }

    } catch (error) {
        
        // log the error
        console.log(error);

        // send error response fron the server to client
        return {
            status: 500,
            error: error.toString()
        }
    }
}




// login service
export const loginService = async (req, res) => {
    try {

        const userData = req.body;

        // use mongoose aggregate for find the data
        const response = await UserModel.aggregate([
            
            // match the data
            {
                $match: userData
            },

            // project the data which we want to give to the client
            {
                $project: {
                    _id: 1,
                    username: 1,
                    email: 1
                }
            }
        ]);

        // check if data is found
        if (response.length > 0) {

            // if found -> encode the data and generate a jwt token
            const token = encodeToken(response?.[0]?.email);

            // set the token to cookies 
            const option = {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "none",
                secure: process.env.NODE_ENV === "production"
            };
            res.cookie("Token", token, option);


            // return the response
            return {
                status: 200,
                token,
                response:response[0]
            }
        }

        else{

            // if not found return response 
            return {
                status: 500,
                response:"Unauthorize"
            }
        }



    } catch (error) {
        console.log(error);
        return {
            status: 500,
            error: error.toString()
        }
    }
}




// read services
export const readDataServices = async (req, res) => {
    try {

        // take the email from headers
        const email = req.headers.email;

        // find the data using email and project them without password
        const data = await UserModel.aggregate([
            {
                $match:{email}
            },
            {
                $project:{
                    password:0
                }
            }
        ])
        return {
            status: 200,
            data:data
        }
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            error: error.toString()
        }
    }
}