const {PropertyCategory} = require("../../../models")

const getPropertyCategories = async (req, res) => {
    try {
        const result = await PropertyCategory.findAll()
        return res.status(200).json({
            message: "Property Category list retrieved successfully",
            result
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error retrieving category list" });
    }
}

module.exports = { getPropertyCategories }