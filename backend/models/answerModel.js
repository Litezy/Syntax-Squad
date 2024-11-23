module.exports = (sequelize, DataTypes) => {
    return sequelize.define('answer', {
        comment:{type: DataTypes.STRING, allowNull:false},
        userid:{type: DataTypes.INTEGER},
        questionId:{type: DataTypes.INTEGER},
        image:{type: DataTypes.STRING, allowNull:'true'},
    })
}