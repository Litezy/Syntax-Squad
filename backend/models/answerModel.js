module.exports = (sequelize, DataTypes) => {
    return sequelize.define('answer', {
        comment:{type: DataTypes.TEXT, allowNull:false},
        userid:{type: DataTypes.INTEGER},
        slug:{type: DataTypes.STRING, allowNull:true},
        questionId:{type: DataTypes.INTEGER},
        votecounts:{type: DataTypes.INTEGER,defaultValue:0},
        edited: {type: DataTypes.STRING, defaultValue:'false'},
        image:{type: DataTypes.JSON},
    })
}