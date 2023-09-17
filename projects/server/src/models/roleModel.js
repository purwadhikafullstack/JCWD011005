module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define('roles', {
            role_id: {
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
    return Role;
}