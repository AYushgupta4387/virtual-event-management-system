import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const registerUser = async (req, res) => {
  const { email, password, userName } = req.body;

  if (!email || !password || !userName) {
    return res.status(400).send({
      message: "Email, password, and userName are required",
    });
  }

  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { userName }],
    });

    if (existingUser) {
      return res
        .status(400)
        .send({ message: "User already exists with this email or username." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const dbUser = await User.create({
      email,
      userName,
      password: hashedPassword,
    });

    if (!process.env.JWT_SECRET) {
      return res
        .status(500)
        .send({ message: "JWT_SECRET not set in environment variables." });
    }

    const token = jwt.sign(
      { id: dbUser._id, userName: dbUser.userName, email: dbUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).send({
      user: {
        id: dbUser._id,
        email: dbUser.email,
        userName: dbUser.userName,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "An error occurred while creating the user.",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      message: "Email and password are required",
    });
  }

  try {
    const dbUser = await User.findOne({ email });

    if (!dbUser) {
      return res.status(400).send({ message: "Email not found." });
    }

    const isPasswordSame = await bcrypt.compare(password, dbUser.password);

    if (!isPasswordSame) {
      return res.status(400).send({ message: "Password is incorrect!" });
    }

    const token = jwt.sign(
      { id: dbUser._id, userName: dbUser.userName, email: dbUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).send({ success: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "An error occurred while logging in.",
    });
  }
};

export { registerUser, loginUser };
