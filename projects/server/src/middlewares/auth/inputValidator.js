const Yup = require("yup");

// Yup.object({
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
    const { first_name } = req.body;
    let schema = Yup.object({
        firstNameSchema: Yup.string()
            .matches(/^[a-zA-Z]+$/, "Nama depan hanya huruf yang diperbolehkan!")
            .required("Nama depan tidak boleh kosong!"),
    });
    try {
        schema.validateSync({
            firstNameSchema: first_name
        });

        return next();
    } catch (err) {
        return res.status(422).send(err.message);
    }
}

const lastNameValidator = (req, res, next) => {
    const { last_name } = req.body;
    let schema = Yup.object({
        lastNameSchema: Yup.string()
            .matches(/^[a-zA-Z]+$/, "Nama belakang hanya huruf yang diperbolehkan!"),
    });
    try {
        if (last_name != false) {
            schema.validateSync({
                lastNameSchema: last_name
            });
        }

        return next();
    } catch (err) {
        return res.status(422).send(err.message);
    }
}

const passwordValidator = (req, res, next) => {
    const { password } = req.body;
    let schema = Yup.object({
        password: Yup.string()
            .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[`~!@#$%^&*()_+=,{}[\]|:;'"><>?/])[a-zA-Z\d`~!@#$%^&*()_+=,{}[\]|:;'"><>?/]+$/, "Kata sandi harus kombinasi alphanumerik dan karakter spesial!")
            .min(6, "Kata sandi setidaknya minimal 6 karakter!")
            .required("Kata sandi tidak boleh kosong!"),
    });
    try {
        schema.validateSync({
            password: password
        });

        return next();
    } catch (err) {
        return res.status(422).send(err.message);
    }
}

const phoneValidator = (req, res, next) => {
    const { phone } = req.body;
    let schema = Yup.object({
        phone: Yup.string()
          .matches(/[0-9]/, "Nomor ponsel yang diperbolehkan hanya angka!")
          .min(10, "Nomor ponsel setidaknya minimal 10 digit!")
          .max(13, "Nomor ponsel maksimal 13 digit!")
          .required("Nomor ponsel tidak boleh kosong!")
    });
    try {
        schema.validateSync({
            phone: phone
        });

        return next();
    } catch (err) {
        return res.status(422).send(err.message);
    }
}

module.exports = { firstNameValidator, lastNameValidator, emailValidator, passwordValidator, phoneValidator };