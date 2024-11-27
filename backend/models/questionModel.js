module.exports = (sequelize, DataTypes) => {
    return sequelize.define('question', {
        category: { type: DataTypes.STRING, allowNull: 'false' },
        content: { type: DataTypes.STRING, allowNull: 'false' },
        image: { type: DataTypes.JSON, },
        slug: {type: DataTypes.STRING},
        userid: { type: DataTypes.INTEGER },
    })
}