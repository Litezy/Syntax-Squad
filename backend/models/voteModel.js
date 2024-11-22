module.exports = (sequelize, DataTypes) => {
    return sequelize.define('vote', {
        userid:{type: DataTypes.INTEGER, allowNull:'false'},
        questionId:{type: DataTypes.INTEGER, allowNull:'false'},
        status:{type: DataTypes.STRING, allowNull:false, defaultValue:'unread'}
    })
}