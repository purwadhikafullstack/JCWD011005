const { User } = require("../models")
const utils = require("../services/utils")

const authUserController = {
    userLogin: async (req, res) => {
        try {
            const { email, phone, password } = req.body;
            let user;
            
            if (email) {
                user = await User.findOne({ where: { email } });
            } else if (phone) {
                if (phone.startsWith("0")) {phoneNumber = phone.substring(1);}
                user = await User.findOne({ where: { phone: phoneNumber } });
            }

            const token = utils.generateToken(user.id);

            return res.status(200).json({
                message: 'Registrasi akun anda berhasil dilakukan. Silahkan periksa email anda untuk melakukan verifikasi akun.',
                data: user,
                token
            });

        } catch (err) {
            return res.status(503).json({
                message: 'Mohon maaf, sedang ada pemeliharaan layanan saat ini. Silakan coba lagi nanti.',
                error: err.message
            });
        }
    }
}

module.exports = authUserController;