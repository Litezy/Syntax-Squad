module.exports = (sequelize,DataTypes) =>{
    return sequelize.define('category',{
        name:{type: DataTypes.STRING, allowNull:false},
        postCount:{type: DataTypes.INTEGER, defaultValue:0},
        questionid:{type: DataTypes.JSON,allowNull: true,defaultValue: []}
    })
}