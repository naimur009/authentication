import express from "express";
import { loginControler, readDataControler, registerControler } from "../controler/userControler.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register/", registerControler);

router.post("/login", loginControler);


// *! add a middleware for security check

router.get("/read", authMiddleware ,readDataControler);



export default router;