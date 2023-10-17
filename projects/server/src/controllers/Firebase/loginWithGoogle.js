const { User } = require("../../../models");
const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");

const loginWithGoogle = async (req, res) => {
  const { idToken } = req.body;
  
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const email = decodedToken.email;
    const image_profile = decodedToken.picture || null;
    const display_name = decodedToken.name;

    let first_name = "";
    let last_name = "";
    if (display_name) {
      const nameParts = display_name.split(" ");
      first_name = nameParts[0];
      last_name = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
    }

    const user = await User.findOne({
      where: {
        google: decodedToken.uid,
      },
    });

    if (!user) {
      return res.status(404).json({ errors: [{ msg: "User not found" }] });
    }

    const payload = {
      user_id: user.user_id,
      email: user.email,
      first_name: first_name,
      last_name: last_name,
      image_profile: image_profile,
    };
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });

    return res.status(200).json({ message: "Login successful", token, payload });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { loginWithGoogle };
