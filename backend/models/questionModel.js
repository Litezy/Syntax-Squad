module.exports = (sequelize, DataTypes) => {
    return sequelize.define('question', {
        category: { type: DataTypes.STRING, allowNull: 'false' },
        title: { type: DataTypes.STRING, allowNull: 'false' },
        image: { type: DataTypes.STRING, },
        userid: { type: DataTypes.STRING }
    })
}