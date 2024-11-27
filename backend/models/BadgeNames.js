module.exports = (sequelize, DataTypes) => {
    return sequelize.define('badgename', {
        name: { type: DataTypes.STRING, },
        type: { type: DataTypes.STRING, },
        desc: { type: DataTypes.STRING },
        threshold: { type: DataTypes.INTEGER },
        image: { type: DataTypes.JSON },
    })
}