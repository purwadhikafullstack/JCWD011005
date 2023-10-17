const { query } = require("express-validator");

const getAvailablePropertyRules = [
  query("start_date")
    .isDate({ format: "YYYY-MM-DD" })
    .withMessage("Start date must be a valid date in YYYY-MM-DD format")
    .custom((value, { req }) => {
      const startDate = new Date(value);
      const endDate = new Date(req.query.end_date);
      if (startDate > endDate) {
        throw new Error("Start date must be less than or equal to end date");
      }
      return true;
    }),

  query("end_date")
    .isDate({ format: "YYYY-MM-DD" })
    .withMessage("End date must be a valid date in YYYY-MM-DD format"),

  query("property_category_id")
    .notEmpty()
    .withMessage("Property category ID (location) is required"),
];

module.exports = { getAvailablePropertyRules };
