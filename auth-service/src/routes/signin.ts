import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { Password } from "../services/password";
import { User } from "../models/user";
import { validateRequest, BadRequestError } from "@ma-tickets/common";

const router = express.Router();

router.post("/signin", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(email, password);

  let existingUser: any;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
  }

  if (!existingUser) {
    res.status(400).json({ error: "Invalid credentials" });
    res.end();
    return;
  }

  const passwordsMatch = await Password.compare(
    existingUser!.password,
    password
  );

  if (!passwordsMatch) {
    res.status(400).json({ error: "Invalid credentials" });
    res.end();
    return;
  }

  // Generate JWT
  const userJwt = jwt.sign(
    {
      id: existingUser!.id,
      email: existingUser!.email,
      role: existingUser!.role,
    },
    "SECRET"
  );

  // Store it on session object
  req.session = {
    jwt: userJwt,
  };

  res.status(200).json({
    user: existingUser,
    jwt: userJwt,
  });

  res.end();
});

export { router as signinRouter };
