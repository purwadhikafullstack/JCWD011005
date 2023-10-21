const { User } = require("../../../models");
const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");

const registerWithGoogle = async (req, res) => {
  const { idToken } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const email = decodedToken.email;

    const existingUser = await User.findOne({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(422).json({ errors: [{ msg: "Email already registered with other method" }] });
    }

    const googleUser = await User.findOne({
      where: {
        google: uid,
      },
    });

    if (googleUser) {
      return res.status(422).json({ errors: [{ msg: "Email already registered, try to login" }] });
    }

    const user = await User.create({
      email: email,
      google: uid,
      is_verified: 1,
      login_method_id: 2,
    });

    const payload = { user_id: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });
    return res.status(200).json({ message: "You're successfully registered", token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { registerWithGoogle };
