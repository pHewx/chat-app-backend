const User = require("../models/userModel");
const token = require("../utils/token");

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = async (req, res, next) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    const error = new Error("Please Enter all the Feilds");
    next(error);
  }

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      isAdmin: user.isAdmin,
      token: token.generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const user = await User.find(keyword)
      .find({ _id: { $ne: req.user._id } })
      .select("-password");

    res.json(user);
  } catch (error) {
    next(error);
  }
};

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      isAdmin: user.isAdmin,
      token: token.generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
};

const getUserById = async (req, res, next) => {
  if (!req.params.id) {
    const error = new Error("Please Enter all the Feilds");
    next(error);
  }

  const { id } = token.decodeToken(req.params.id);

  const user = await User.findById(id).select(
    "-password -createdAt -updatedAt "
  );

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(401);
    throw new Error("User is not founded");
  }
};

const uploadUserImage = (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  res.json({ secure_url: req.file.path }).find({ id: { $ne: req.user._id } });
};

module.exports = {
  registerUser,
  loginUser,
  getAllUser,
  uploadUserImage,
  getUserById,
};
