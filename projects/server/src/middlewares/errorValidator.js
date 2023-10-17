const { validationResult } = require("express-validator");
const fs = require("fs");

const errorValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      errors: errors.array(),
    });
  }
  next();
};

module.exports = errorValidator;
