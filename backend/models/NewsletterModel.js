module.exports = (sequelize, DataTypes) => {
    return sequelize.define('newletter', {
        email: { type: DataTypes.STRING, allowNull: false }
    })
}