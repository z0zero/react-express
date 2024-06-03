// Import express types
import type { Request, Response } from "express";

// Import validationResult from express-validator
import { validationResult } from "express-validator";

// Import bcrypt
import bcrypt from "bcryptjs";

// Import prisma client
import prisma from "../prisma/client";

// Define the register function
const register = async (req: Request, res: Response): Promise<Response> => {
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

  // Hash password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    // Insert data
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      },
    });

    // Return response json
    return res.status(201).send({
      success: true,
      message: "Register successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export { register };
