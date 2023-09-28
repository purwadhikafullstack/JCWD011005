module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        user_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        first_name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        phone: {
            allowNull: false,
            type: DataTypes.BIGINT
        },
        gender: {
            type: DataTypes.STRING
        },
        birthdate: {
            type: DataTypes.DATEONLY
        },
        image_profile: {
            type: DataTypes.STRING
        },
        otp: {
          type: DataTypes.INTEGER
        },
        otp_sent_a_day: {
            defaultValue: 0,
            type: DataTypes.INTEGER
        },
        is_otp_expired: {
            type: DataTypes.BOOLEAN
        },
        is_verified: {
            allowNull: false,
            defaultValue: false,
            type: DataTypes.BOOLEAN
        }
    }, {
        createdAt: false,
        timestamps: false,
        updatedAt: false
    });

    return User;
}