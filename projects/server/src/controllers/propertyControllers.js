const PropertyController = {
    getCategories: async (req, res) => {
        try {

            return res.status(200).json({
                message: 'Data kategori properti berhasil diambil',
                data: result,
                token
            });
        } catch (err) {
            return res.status(503).json({
                message: 'Mohon maaf, sedang ada pemeliharaan layanan saat ini. Silakan coba lagi nanti.',
                error: err.message
            });
        }
    }
}
module.exports = PropertyController;