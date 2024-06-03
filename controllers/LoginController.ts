// import express types
import type { Request, Response } from "express";

// Import validationResult from express-validator
import { validationResult } from "express-validator";

// import bcrypt
import bcrypt from "bcryptjs";

// import jsonwebtoken
import jwt from "jsonwebtoken";

// import prisma client
import prisma from "../prisma/client";

// Define the login function
const login = async (req: Request, res: Response): Promise<Response> => {
  // Periksa hasil validasi
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Jika ada error, kembalikan error ke pengguna
    return res.status(422).json({
      success: false,
      message: "Validation error",
      errors: errors.array(),
    });
  }

  try {
    // find user
    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    // user not found
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    // check if user.password is null
    if (!user.password) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // compare password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // password incorrect
    if (!validPassword)
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });

    // generate token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    // Destructure to remove password from user object
    const { password, ...userWithoutPassword } = user;

    // return response
    return res.status(200).send({
      success: true,
      message: "Login successfully",
      data: {
        user: userWithoutPassword,
        token: token,
      },
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export { login };
