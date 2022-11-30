const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    pic,
    noJaringan,
    status,
    order,
    vendor,
    namaVendor,
  } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Kolom input harus diisi!");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("user sudah ada");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
    noJaringan,
    status,
    order,
    vendor,
    namaVendor,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      noJaringan: user.noJaringan,
      status: user.status,
      order: user.order,
      vendor: user.vendor,
      namaVendor: user.namaVendor,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Email atau Password invalid");
  }
});

module.exports = { allUsers, registerUser, authUser };
