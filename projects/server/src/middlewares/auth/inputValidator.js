const Yup = require("yup");

// Yup.object({
//     lastName: Yup.string()
//       .matches(/^[a-zA-Z]+$/, "Hanya huruf yang diperbolehkan!"),
//     password: Yup.string()
//       .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[`~!@#$%^&*()_+=,{}[\]|:;'"><>?/])[a-zA-Z\d`~!@#$%^&*()_+=,{}[\]|:;'"><>?/]+$/, "Kata sandi harus kombinasi alphanumerik dan karakter spesial!")
//       .min(6, "Kata sandi setidaknya minimal 6 karakter!")
//       .required("Kata sandi tidak boleh kosong!"),
//     phone: Yup.string()
//       .matches(/[0-9]/, "Nomor ponsel yang diperbolehkan hanya angka!")
//       .min(10, "Nomor ponsel setidaknya minimal 10 digit!")
//       .max(13, "Nomor ponsel maksimal 13 digit!")
//       .required("Nomor ponsel tidak boleh kosong!")
//   }),

const emailValidator = (req, res, next) => {
    const { email } = req.body;
    let schema = Yup.object({
        email: Yup.string()
            .email("Format penulisan email tidak valid!")
            .required("Email tidak boleh kosong!")
    });
    try {
        schema.validateSync({
            email: email
        });

        return next();
    } catch (err) {
        return res.status(422).send(err.message);
    }
};

const firstNameValidator = (req, res, next) => {
    const { firstName } = req.body;
    let schema = Yup.object({
        firstName: Yup.string()
            .matches(/^[a-zA-Z]+$/, "Hanya huruf yang diperbolehkan!")
            .required("Nama depan tidak boleh kosong!"),
    });
    try {
        schema.validateSync({
            firstName: firstName
        });

        return next();
    } catch (err) {
        return res.status(422).send(err.message);
    }
}

const lastNameValidator = (req, res, next) => {
    let result = false;
    let { lastName } = req.body;
    if (lastName != false) {
        lastName = lastName.toLowerCase();
        const pattern = /[a-zA-Z]/;
        for (let i = 0; i < lastName.length; i++) {
            result = pattern.test(lastName[i]);
            if (result == false) return res.status(422).send("Hanya huruf yang diperbolehkan!");
        }
    }

    return next();
}

const passwordValidator = (req, res, next) => {
    let result = false;
    let { password } = req.body;
    if (password == false) return res.status(422).send("Password tidak boleh kosong!");
    if (password.length < 6) return res.status(422).send("Password setidaknya minimal 6 karakter!");

    const capitalizePattern = /[A-Z]/;
    for (let i = 0; i < password.length; i++) {
        result = capitalizePattern.test(password[i]);
        if (result) break;
    }
    if (result === false) return res.status(422).send("Password setidaknya terdapat huruf kapital!");
    
    const numericPattern = /[0-9]/;
    for (let i = 0; i < password.length; i++) {
        result = numericPattern.test(password[i]);
        if (result) break;
    }
    if (result === false) return res.status(422).send("Password setidaknya terdapat angka!");
    
    const specialCharPattern = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/;
    for (let i = 0; i < password.length; i++) {
        result = specialCharPattern.test(password[i]);
        if (result) break;
    }
    if (result === false) return res.status(422).send("Password setidaknya terdapat karakter spesial/unik!");

    return next();
}

const phoneValidator = (req, res, next) => {
    let result = false;
    let { phone } = req.body;
    if (phone == false) return res.status(422).send("Nomor ponsel tidak boleh kosong!");
    if (phone.length < 10 || phone.length > 13) return res.status(422).send("Nomor ponsel harus antara 10-13 digit!");

    const numericPattern = /[0-9]/;
    for (let i = 0; i < phone.length; i++) {
        result = numericPattern.test(phone[i]);
        if (result === false) return res.status(422).send("Nomor ponsel yang diperbolehkan hanya angka!");
    }

    if (`${phone[0]}${phone[1]}` !== '08') return res.status(422).send("Nomor ponsel harus diawali dengan '08'!");
    return next();
}

module.exports = { firstNameValidator, lastNameValidator, emailValidator, passwordValidator, phoneValidator };