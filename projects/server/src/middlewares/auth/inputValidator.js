const Yup = require("yup");

// Yup.object({
//     firstName: Yup.string()
//       .matches(/^[a-zA-Z]+$/, "Hanya huruf yang diperbolehkan!")
//       .required("Nama depan tidak boleh kosong!"),
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
    
    // return next();
    
    // let result = false;
    // let { email } = req.body;
    // if (email == false) return res.status(422).send("Email tidak boleh kosong!");

    // email = email.toLowerCase();

    // // dimasivonanggitama @ gmail    .com
    // // ------------------ | ------   ----------------
    // //     email name     | domain   top level domain
    // //                    |
    // //              at / separator

    // const atChar = email.indexOf("@");
    // if (atChar < 0) return res.status(422).send("Email harus memiliki karakter '@' !");

    // const domain = email.substr(atChar + 1, email.length - 1);
    // const dotCharDomain = domain.indexOf(".");
    // if (dotCharDomain < 0) return res.status(422).send("Domain email harus memiliki karakter titik (.) !");

    // const domainPattern = /[a-z.]/;
    // for (let i = 0; i < domain.length; i++) {
    //     result = domainPattern.test(domain[i]);
    //     if (result == false) return res.status(422).send("Karakter pada domain yang diperbolehkan hanya huruf dan titik (.) !");
    // }

    // const aliasName = email.substr(0, atChar);
    // const aliasNamePattern = /[a-z0-9._]/;
    // for (let i = 0; i < aliasName.length; i++) {
    //     result = aliasNamePattern.test(aliasName[i]);
    //     if (result == false) return res.status(422).send("Karakter pada nama email yang diperbolehkan hanya huruf, angka, titik (.) dan underscore (_) !");
    // }

    // return next();
    
};

const firstNameValidator = (req, res, next) => {
    let result = false;
    let { firstName } = req.body;
    if (firstName == false) return res.status(422).send("Nama depan tidak boleh kosong!");

    firstName = firstName.toLowerCase();
    const pattern = /[a-zA-Z]/;
    for (let i = 0; i < firstName.length; i++) {
        result = pattern.test(firstName[i]);
        if (result == false) return res.status(422).send("Hanya huruf yang diperbolehkan!");
    }
    return next();
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