module.exports = (sequelize, Sequelize) => {
    const LoginMethod = sequelize.define('login_methods', {
        login_method_id: {
            allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
        }, {
            createdAt: false,
            timestamps: false,
            updatedAt: false
        });

    return LoginMethod;
}