module.exports = (sequelize,DataTypes) =>{
    return sequelize.define('category',{
        name:{type: DataTypes.JSON, allowNull:false}
    })
}