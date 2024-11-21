module.exports = (sequelize, DataTypes) => {
    return sequelize.define('vote', {
        userid:{type: DataTypes.STRING, allowNull:'false'},
        questionId:{type: DataTypes.STRING, allowNull:'false'},
        status:{type: DataTypes.STRING, allowNull:false, defaultValue:'unread'}
    })
}