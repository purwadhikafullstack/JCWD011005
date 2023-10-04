const { property_category } = require("../models");

const PropertyController = {
    getCategories: async (req, res) => {
        try {
            const result = await db.property_category.findAll();
            console.log(result);
            console.log("All categories:", JSON.stringify(result, null, 2));
            
            return res.status(200).json({
                message: 'Data kategori properti berhasil diambil',
                data: result
            });
        } catch (err) {
            console.log("err.message: "+err.message)
            return res.status(503).json({
                message: 'Mohon maaf, sedang ada pemeliharaan layanan saat ini. Silakan coba lagi nanti.',
                error: err.message
            });
        }
    }
}
module.exports = PropertyController;