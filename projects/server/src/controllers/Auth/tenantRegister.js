const {Tenant, sequelize} = require("../../../models")
const { utils } = require("../../services")

const tenantRegister = async (req, res) => {
    try{
        if (req.fileValidationError) {
            return res.status(400).json({
                message: "File validation error",
                error: req.fileValidationError,
            })
        }
        
        const { first_name, last_name, email, phone, password, confirm_password} = req.body
        const image_idcard = req.file.path

        const hashedPassword = await utils.hashedPassword(password)

        await sequelize.transaction(async (t) => {
            const result = await Tenant.create({
                first_name,
                last_name,
                email,
                phone,
                password: hashedPassword,
                confirm_password,
                image_idcard: image_idcard,
            }, { transaction: t })

            return res.status(200).json({
                message: "Account successfully registered!",
                data: result
            })
        }) 
    }
    catch(err){
        console.log(err.message)
        return res.status(500).json(err.message)
    }
}

module.exports = {tenantRegister}