const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const path = require('path');
const transporter = require('../helpers/transporter');
const fs = require('fs').promises;
const handlebars = require('handlebars');
const { users } = require("../models");

const AuthController = {
    register: async (req, res) => {
        try {
            const { first_name, last_name, email, password, phone } = req.body;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
            
            await users.sequelize.transaction(async (t) => {
                const result = await users.create({
                    first_name,
                    last_name,
                    email,
                    phone,
                    password: hashedPassword,
                    otp,
                    otp_sent_a_day: 0,
                    otp_last_sent: new Date(),
                    login_method_id: 1
                }, { transaction: t });

                let payload = { user_id: result.user_id, email: result.email };
                const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '24h' });
                const redirect = `${process.env.REACT_APP_CLIENT_BASE_URL}/user/verify/${token}`;
                const data = await fs.readFile(
                    path.resolve(__dirname, "../email/verificationAccount.html"), 'utf-8'
                );

                const tempCompile = handlebars.compile(data);
                const tempResult = tempCompile({ first_name, last_name, otp, redirect });

                await transporter.sendMail({
                    to: result.email,
                    subject: "[Pro-Rent] Verifikasi Akun",
                    html: tempResult
                });
                console.log("result.otp_last_sent: "+result.otp_last_sent);

                return res.status(200).json({
                    message: 'Registrasi akun anda berhasil dilakukan. Silahkan periksa email anda untuk melakukan verifikasi akun.',
                    data: result,
                    token
                });
            });
        } catch (err) {
            return res.status(503).json({
                message: 'Mohon maaf, sedang ada pemeliharaan layanan saat ini. Silakan coba lagi nanti.',
                error: err.message
            });
        }
    }
}

module.exports = AuthController;