const User = require("../schemas/User");
const Todo = require("../schemas/Todo");
const logger = require("../utils/logger");
const {
  sendSuccess,
  sendError,
  sendCreated,
} = require("../utils/responseHandlers");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-__v");
    return sendSuccess(res, users);
  } catch (error) {
    logger.error(error);
    return sendError(res, error);
  }
};

const getUser = async (req, res) => {
  try {
    let user = null;

    if (
      req.user._id.toString() === req.params.id.toString() ||
      req.user.role === "admin"
    ) {
      user = await User.findById(req.params.id)
        .select("-__v")
        .populate({
          path: "todos",
          select: "title completed createdAt",
          options: { sort: { createdAt: -1 } },
        });
    } else {
      return sendError(
        res,
        "Access denied, you can access only your data or only Admins are allowed",
        403
      );
    }

    if (!user) {
      return sendError(res, "User not found", 404);
    }

    return sendSuccess(res, user);
  } catch (error) {
    logger.error(error);
    return sendError(res, error);
  }
};

const createUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    let newUser = null;

    if (!username || !email) {
      return sendError(res, "Username and Email are required", 400);
    }

    if (req.user) {
      if (req.user.role === "admin") {
        newUser = await User.create({ username, email });
      } else {
        return sendError(
          res,
          "Access denied, just Admins are allowed to create a new user",
          403
        );
      }
    } else {
      return sendError(
        res,
        "Access denied, you need to be logged in as Admin to create a new user",
        403
      );
    }

    return sendCreated(res, newUser);
  } catch (error) {
    logger.error(error);
    return sendError(res, error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, email },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return sendError(res, "User not found", 404);
    }
    return sendSuccess(res, updatedUser);
  } catch (error) {
    logger.error(error);
    return sendError(res, error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return sendError(res, "User not found", 404);
    }

    await Todo.deleteMany({ user: req.params.id });

    return sendSuccess(res, {
      message: "User deleted successfully and the data associated to the user",
    });
  } catch (error) {
    logger.error(error);
    return sendError(res, error);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
