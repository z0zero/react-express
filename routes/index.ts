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
import {
  findUsers,
  createUser,
  findUserById,
  updateUser,
} from "../controllers/UserController";

// import validate register and login
import { validateRegister, validateLogin } from "../utils/validators/auth";

// import validate user
import { validateUser } from "../utils/validators/user";

// define route for register
router.post("/register", validateRegister, register);

// define route for login
router.post("/login", validateLogin, login);

// define route for user
router.get("/admin/users", verifyToken, findUsers);

// define route for user create
router.post("/admin/users", verifyToken, validateUser, createUser);

// define route for user by id
router.get("/admin/users/:id", verifyToken, findUserById);

// define route for user update
router.put("/admin/users/:id", verifyToken, validateUser, updateUser);

// export router
export default router;
