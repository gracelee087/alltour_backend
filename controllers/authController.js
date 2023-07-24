import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// user registration
export const register = async (req, res) => {
  try {
    // 해싱으로 비번을 누구도 알아보지 못하게 보안처리한다.
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      photo: req.body.photo,
    });

    await newUser.save();

    res.status(200).json({ success: true, message: "Successfully created" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create. Try again" });
  }
};

// user login
export const login = async (req, res) => {
  const email = req.body.email;

  try {
    const user = await User.findOne({ email });

    // 만약 사용자가 없다면
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    //만약 사용자가 존재한다면, 기존 비번이랑 비교하기
    const checkCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    //만약 사용자가 입력한 비번이 - 올바르다면?
    if (!checkCorrectPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect email or password" });
    }
    const { password, role, ...rest } = user._doc;

    // 1. jwt 토근 만들기
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    // 2. 토큰을 브라우저쿠키에 박제하고, 고객에게 반응해주기
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: token.expiresIn,
        //   secure: true,
      })
      .status(200)
      .json({
        token,
        data: { ...rest },
        role,
      });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};
