// import express types
import type { Request, Response } from "express";

// import prisma client
import prisma from "../prisma/client";

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

export { findUsers };
