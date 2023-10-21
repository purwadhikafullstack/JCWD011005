const { User } = require("../../../models")
const utils = require("../../services/utils")

const userLogin = async (req, res) => {
    try {
        const { email, phone, password } = req.body;
        let user;
        
        if (email) {
            user = await User.findOne({ where: { email } });
        } else if (phone) {
            if (phone.startsWith("0")) {phoneNumber = phone.substring(1);}
            user = await User.findOne({ where: { phone: phoneNumber } });
        }

        const token = await utils.generateToken(user.id);
    
        return res.status(200).json({ message: "Login successful", user, token });

      } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
}

module.exports = {userLogin}