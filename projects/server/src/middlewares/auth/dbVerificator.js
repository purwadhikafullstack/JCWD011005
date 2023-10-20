const { User } = require('../../models');

const dbVerificator = async (req, res, next) => {
    const { email, phone } = req.body;
    try {
        const emailExist = await User.findOne({
            where: { email: email },
        });
        if (emailExist) return res.status(409).json({ message: "Email sudah digunakan sebelumnya" });
        
        const phoneExist = await User.findOne({
            where: { phone: phone },
        });
        if (phoneExist) return res.status(409).json({ message: "Nomor telepon sudah digunakan sebelumnya" });

        next();
    } catch (err) {
        return res.status(503).json({
            message: 'Mohon maaf, sedang ada pemeliharaan layanan saat ini. Silakan coba lagi nanti.',
            error: err.message
        });
    }
}

module.exports = { dbVerificator }