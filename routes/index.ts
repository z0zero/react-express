// import express
import express from "express";

// init express router
const router = express.Router();

// import verifyToken
import verifyToken from "../middlewares/auth";

// import register controller
import { register } from "../controllers/RegisterController";

// import login controller
import { login } from "../controllers/LoginController";

// import user controller
import { findUsers } from "../controllers/UserController";

// import validate register and login
import { validateRegister, validateLogin } from "../utils/validators/auth";

// define route for register
router.post("/register", validateRegister, register);

// define route for login
router.post("/login", validateLogin, login);

// define route for user
router.get("/admin/users", verifyToken, findUsers);

// export router
export default router;
