const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require('jsonwebtoken');
const transporter = require('../helpers/transporter');
const path = require('path');
const fs = require('fs').promises;
const handlebars = require('handlebars');
const user = db.User;

const AuthController = {
    login: async (req, res) => {
        try {
            const { email, username, phone, password } = req.body;
            let where = {};
            if (email) { where.email = email; }
            if (username) { where.username = username; }
            if (phone) { where.phone = phone; }

            const checkLogin = await user.findOne({ where });
            if (!checkLogin.isVerified) return res.status(403).json({ message: "Untuk alasan keamanan, anda harus verifikasi email terlebih dahulu!" });

            const passwordValid = await bcrypt.compare(password, checkLogin.password);
            if (!passwordValid) return res.status(422).json({ message: "Password yang anda masukkan salah!"});

            let payload = {
                id: checkLogin.id,
                username: checkLogin.username,
                email: checkLogin.email,
                phone: checkLogin.phone,
            }

            const token = jwt.sign(
                payload,
                process.env.JWT_KEY, { expiresIn: '100h'}
            )

            return res.status(200).json({
                message: "Login success",
                data: token
            })
        } catch (err) {
            return res.status(503).json({
                message: 'Mohon maaf, layanan tidak tersedia saat ini. Silakan coba lagi nanti.',
                error: err.message
            });
        }
    },
    logout: async (req, res) => {
        try {
            
        }
        catch (err) {

        }
    },
    register: async (req, res) => {
        try {
            const { username, email, password, phone } = req.body;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            await db.sequelize.transaction(async (t) => {
                const result = await user.create({
                    username,
                    email,
                    phone,
                    password: hashedPassword,
                    isVerified: false
                }, { transaction: t });

                let payload = { id: result.id, email: result.email };

                const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' });

                const redirect = `http://localhost:3000/verification/${token}`;

                const data = await fs.readFile(
                    path.resolve(__dirname, "../email/verificationEmail.html"), 'utf-8'
                );

                const tempCompile = handlebars.compile(data);
                const tempResult = tempCompile({ username, redirect });

                await transporter.sendMail({
                    to: result.email,
                    subject: "Verify Account",
                    html: tempResult
                });

                return res.status(200).json({
                    message: 'Registrasi akun anda telah berhasil dilakukan. Silahkan periksa email anda untuk melakukan verifikasi akun.',
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
    },
    resendRegisterToken: async (req, res) => {
        try {
            const { username, email, phone } = req.body;
            let resultID, resultEmail, resultUsername = "";

            if (email) {
                const emailExist = await user.findOne({
                    where: { email: email },
                });
                resultEmail = emailExist.email;
                resultID = emailExist.user_id;
                resultUsername = emailExist.username;
            } else if (username) {
                const usernameExist = await user.findOne({
                    where: { username: username },
                });
                resultEmail = usernameExist.email;
                resultID = usernameExist.user_id;
                resultUsername = username;
            } else if (phone) {   //834567899
                const phoneExist = await user.findOne({
                    where: { phone: phone },
                });
                resultEmail = phoneExist.email;
                resultID = phoneExist.user_id;
                resultUsername = phoneExist.username;
            }
            
            let payload = { id: resultID, email: resultEmail };

            const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' });

            const redirect = `http://localhost:3000/verification/${token}`;

            const data = await fs.readFile(
                path.resolve(__dirname, "../email/verificationEmail.html"), 'utf-8'
            );

            const tempCompile = handlebars.compile(data);
            const tempResult = tempCompile({ resultUsername, redirect });

            await transporter.sendMail({
                to: resultEmail,
                subject: "Verify Account",
                html: tempResult
            });

            return res.status(200).json({
                message: 'Permintaan anda telah diterima. Silahkan periksa email anda untuk melakukan verifikasi akun.',
                data: {"user_id": resultID, "email": resultEmail, "username": resultUsername},
                token
            });
        } catch (err) {
            return res.status(503).json({
                message: 'Link atau token verifikasi email anda telah kadaluarsa. Silahkan lakukan pengajuan ulang!',
                error: err.message
            });
        }
    },
    verifyEmail: async (req, res) => {
        let token = req.headers.authorization;
        try {
            token = token.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_KEY);

            if (!decoded) return res.status(400).json({ message: 'Link atau token verifikasi email yang anda minta tidak valid. Pastikan tidak typo atau silahkan lakukan pengajuan ulang!' });

            await db.sequelize.transaction(async (t) => {
                const updateUser = await user.update(
                    { isVerified: true },
                    { where: { user_id: decoded.id } }, { transaction: t }
                );
            })

            return res.status(200).json({ message: 'Email anda berhasil diverfikasi. Silahkan lakukan login kembali.' });

        } catch (err) {
            return res.status(503).json({
                message: 'Link atau token verifikasi email anda telah kadaluarsa. Silahkan lakukan pengajuan ulang!',
                error: err.message
            });
        }
    },
}
// user.sync({alter: true})
module.exports = AuthController;