module.exports = (sequelize, DataTypes) => {
    return sequelize.define('answer', {
        type:{type: DataTypes.STRING, allowNull:false},
        message:{type: DataTypes.STRING, allowNull:false},
        userid:{type: DataTypes.INTEGER},
        status:{type: DataTypes.STRING, allowNull:false, defaultValue:'unread'}
    })
}