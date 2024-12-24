import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { validateRequest, BadRequestError } from "@ma-tickets/common";
import { User } from "../models/user";

const router = express.Router();

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      email,
      password,
      firstName,
      lastName,
      role,
      SRN,
      semester,
      section,
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ error: "Email already in use" });
      res.end();
    }

    const user = User.build({
      email,
      password,
      firstName,
      lastName,
      role,
      SRN,
      semester,
      section,
    });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      "SECRET"
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send({ user, jwt: userJwt });
    res.end();
  }
);

export { router as signupRouter };
