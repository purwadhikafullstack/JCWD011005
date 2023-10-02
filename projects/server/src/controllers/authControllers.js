const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const path = require('path');
const transporter = require('../helpers/transporter');
const fs = require('fs').promises;
const handlebars = require('handlebars');
const { users } = require("../models");
const { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, getAuth } = require("firebase/auth");
const auth = require("../firebase")

const AuthController = {
    googleOAuth: async (req, res) => {
        console.log("[this is googleOAuth section]");
        const provider = new GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/userinfo.profile");

        const auth = getAuth();
        auth.useDeviceLanguage();

        provider.setCustomParameters({
            'login_hint': 'user@example.com'
        });

        console.log("[this is try section]");
        signInWithPopup(auth, provider)
        .then((result) => {
            console.log("this is signInWithPopup section");

            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            console.log("result: " + result);
            console.log("credential: " + token);
            console.log("token: " + token);
            console.log("user: " + user);
            
            return res.status(200).json({
                message: 'Registrasi akun anda berhasil dilakukan. Silahkan [...]',
                data: result,
                token
            });
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            console.log("error: " + error);
            console.log("errorCode: " + errorCode);
            console.log("errorMessage: " + errorMessage);
            console.log("email: " + email);
            console.log("credential: " + credential);
            
            return res.status(503).json({
                message: 'Mohon maaf, sedang ada pemeliharaan layanan saat ini. Silakan coba lagi nanti.',
                error: error.message
            });
        });
    },
    register: async (req, res) => {
        try {
            const { first_name, last_name, email, password, phone } = req.body;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
            
            // await createUserWithEmailAndPassword(auth, email, password)
            //     .then((userCredential) => {
            //         // Signed in
            //         const user = userCredential.user;
            //         console.log(user);
            //         navigate("/login")
            //         // ...
            //     })
            //     .catch((error) => {
            //         const errorCode = error.code;
            //         const errorMessage = error.message;
            //         console.log(errorCode, errorMessage);
            //         // ..
            //     });
            
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