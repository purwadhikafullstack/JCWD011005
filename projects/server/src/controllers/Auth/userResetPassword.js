const {User, sequelize} = require("../../../models")
const utils = require("../../services/utils")

const userResetPassword = async (req, res) => {
    try{
        const {password, confirm_password} = req.body
        const token = req.headers.authorization.split(" ")[1]
        const user = utils.decodeToken(token)
        const hashedPassword = await utils.hashedPassword(password)

        await sequelize.transaction(async(t) => {
            const result = await User.update(
                {password: hashedPassword},
                {where: {user_id: user.user_id}}
            )

            return res.status(200).json({ message: 'Password successfully changed.' }),
            {transaction: t}
        })

    } catch(err){
        return res.status(500).json(err.message)
    }
}

module.exports = {userResetPassword}