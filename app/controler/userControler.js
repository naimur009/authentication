import { loginService, readDataServices, registerServices } from "../services/userService.js"

// register
export const registerControler = async (req, res)=>{
    let response = await registerServices(req, res);
    return res.json(response);
}

// login
export const loginControler = async (req, res)=>{
    let response = await loginService(req, res);
    return res.json(response);
}

// read Data
export const readDataControler = async (req, res)=>{
    let response = await readDataServices(req, res);
    return res.json(response);
}