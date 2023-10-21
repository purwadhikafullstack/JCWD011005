const {PropertyCategory} = require("../../../models")

const getPropertyCategories = async (req, res) => {
    try {
        const result = await PropertyCategory.findAll()
        return res.status(200).json({
            message: 'Data kategori properti berhasil diambil',
            data: result
        })
    } catch (error) {
        console.log("err.message: "+err.message)
        return res.status(503).json({
            message: 'Mohon maaf, sedang ada pemeliharaan layanan saat ini. Silakan coba lagi nanti.',
            error: err.message
        });
    }
}

module.exports = { getPropertyCategories }