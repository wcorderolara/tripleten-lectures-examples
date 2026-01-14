const User = require("../schemas/User");
const crypto = require("crypto");
const {
  generateToken,
  getExpirationDate,
  verifyToken,
} = require("../utils/tokenUtils");
const logger = require("../utils/logger");
const {
  sendError,
  sendCreated,
  sendSuccess,
} = require("../utils/responseHandlers");

const signUp = async (req, res, next) => {
  try {
    // extract the name, email and password from req.body
    const { username, email, password } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email }); // {email : email}

    console.log("Existing User:", existingUser);

    if (existingUser) {
      return sendError(res, "User with this email already exists", 400);
    }

    // Create a new User
    const newUser = await User.create({
      username,
      email,
      password,
    });

    // create the token
    const token = generateToken(newUser);

    return sendCreated(res, {
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    });
  } catch (error) {
    logger.error("Error in signUp:", error);
  }
};

// Login User (just for existing users)
// Authentication
const signIn = async (req, res, next) => {
  try {
    // 1. Extract email and password from req.body
    const { email, password } = req.body;

    // 2. Validate the input
    if (!email || !password) {
      return sendError(res, "Email and Password are required", 400);
    }

    //3. Find the user and includes password fields
    const user = await User.findOne({ email }).select("+password");

    //4. Validate if user exists
    if (!user) {
      return sendError(res, "User not found with this email", 401);
    }

    //5. Verify ifuser is active
    if (!user.isActive) {
      return sendError(
        res,
        "Your account has been deactivated. Please contact support.",
        401
      );
    }

    //6. Check if password matches
    const iPasswordValid = await user.comparePassword(password);

    
    if (!iPasswordValid) {
      return sendError(res, "Invalid credentials", 401);
    }

    //7. Generate JWT Token
    const token = generateToken(user);

    //9. Send response with token
    return sendSuccess(res, {
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      },
      token,
    });
  } catch (error) {
    //10. Handle errors
    logger.error("Error in signIn:", error.message);
    return sendError(res, "Internal Server Error", 500);
  }
};

module.exports = {
  signUp,
  signIn
};
