import { RequestHandler } from "express";
import { hash, compare } from "bcrypt";
import User from "../entity/user";

export const login_user: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  const browser = req.headers["user-agent"];

  try {
    const user = await User.findOne({ email });

    if (user) {
      const isPasswordValid = await compare(password, user.password);

      if (isPasswordValid) {
        req.session.user = {
          user: user.email,
          browser,
        };

        req.session.save((err) => {
          if (err) console.log(err);
          else
            res.send({
              result: "OK",
              user: {
                name: user.name,
                avatar: user.avatar,
              },
            });
        });
      } else res.send({ result: "Error", message: "Password is not valid!" });
    } else res.send({ result: "Error", message: "User not found!" });
  } catch (error) {
    res.send({ result: "Error", error });
  }
};

export const logout: RequestHandler = async (req, res) => {
  req.session.destroy((err) => {
    if (err)
      res.send({ result: "Error", message: "User cannot be logged out!" });
    else {
      res.clearCookie("connect.sid", { path: "/" });
      res.send({ result: "OK", message: "Logged out!" });
    }
  });
};

export const register_user: RequestHandler = async (req, res) => {
  const { name, email, password, avatar } = req.body;
  const hashedPassword = await hash(password, 10);

  try {
    const newUser = new User();
    newUser.email = email;
    newUser.password = hashedPassword;
    newUser.name = name;
    newUser.avatar = avatar;

    const user = await newUser.save();

    res.send({
      result: "OK",
      user: {
        name: user.name,
      },
    });
  } catch (error) {
    res.send({ result: "Error", error: error });
  }
};

export const check_session: RequestHandler = async (req, res) => {
  if (req.session) res.send({ result: "OK", session: req.session });
  else res.send({ result: "Error", message: "Session doesn't exists." });
};

export const check_browser: RequestHandler = async (req, res) => {
  const { browser } = req.session.user;
  const browserHeader = req.headers["user-agent"];

  if (browser === browserHeader) {
    res.send({
      result: "OK",
      message: "Successful browser check!",
    });
  } else res.send({ result: "Error", message: "Unauthorized browser!" });
};
