module.exports = (sequelize, DataTypes)=>{
    return sequelize.define('badge', {
        name:{type: DataTypes.STRING, allowNull:'false'},
        type:{type: DataTypes.STRING, allowNull:'false'},
        desc:{type: DataTypes.STRING },
        userid:{type: DataTypes.INTEGER },
        icon:{type: DataTypes.STRING },
    })
}