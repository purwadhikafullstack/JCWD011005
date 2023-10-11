const {User, sequelize} = require("../../../models")
const utils = require("../../services/utils")

const userForgotPassword = async (req, res) => {
    try{
        const { email } = req.body
        const user = await User.findOne({ where: { email } })
        const token = await utils.generateToken(user.user_id)
        
        await sequelize.transaction(async (t) => {
            const result = await utils.sendForgotPasswordMail(email, token)
            
            return res.status(200).json({ message: "Please check your email to reset your password", data: result }),
            { transaction: t }
        })
    }
    catch(err){
        return res.status(500).json(err.message)
    }
}

module.exports = {userForgotPassword}