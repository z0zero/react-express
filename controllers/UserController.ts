// import express types
import type { Request, Response } from "express";

// import prisma client
import prisma from "../prisma/client";

// Import validationResult from express-validator
import { validationResult } from "express-validator";

// import bcrypt
import bcrypt from "bcryptjs";

// Define the findUsers function
const findUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    // get all users from database
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    // send response
    return res.status(200).send({
      success: true,
      message: "Get all users successfully",
      data: users,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

// Define the createUser function
const createUser = async (req: Request, res: Response): Promise<Response> => {
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

  // hash password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    // insert data
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      },
    });

    return res.status(201).send({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

// Define the findUserById function
const findUserById = async (req: Request, res: Response): Promise<Response> => {
  // get ID from params
  const { id } = req.params;

  try {
    // get user by ID
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    // send response
    return res.status(200).send({
      success: true,
      message: `Get user By ID: ${id}`,
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

// Define the updateUser function
const updateUser = async (req: Request, res: Response): Promise<Response> => {
  // get ID from params
  const { id } = req.params;

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

  // hash password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    // update user
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      },
    });

    // send response
    return res.status(200).send({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

// Define the deleteUser function
const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  // get ID from params
  const { id } = req.params;

  try {
    // delete user
    await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    // send response
    return res.status(200).send({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export { findUsers, createUser, findUserById, updateUser, deleteUser };
