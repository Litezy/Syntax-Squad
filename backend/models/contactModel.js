module.exports = (sequelize,DataTypes) =>{
    return sequelize.define('contact',{
        name:{type : DataTypes.STRING,allowNull:false},
        email:{type : DataTypes.STRING, allowNull:false},
        message:{type : DataTypes.STRING, allowNull:false}
    })
}