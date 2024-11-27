module.exports = (sequelize, DataTypes) => {
    return sequelize.define('question', {
        category: { type: DataTypes.STRING, allowNull: 'false' },
        content: { type: DataTypes.TEXT, allowNull: 'false' },
        image: { type: DataTypes.JSON, },
        slug: {type: DataTypes.STRING},
        edited: {type: DataTypes.STRING, defaultValue:'false'},
        userid: { type: DataTypes.INTEGER },
    })
}