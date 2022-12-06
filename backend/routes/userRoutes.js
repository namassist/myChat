const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  changeStatus,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.route("/:_id").put(changeStatus);
router.post("/login", authUser);

module.exports = router;
