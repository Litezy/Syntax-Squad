module.exports = (sequelize,DataTypes )=>{
    return sequelize.define('user',{
        firstname: {type: DataTypes.STRING, allowNull:'false'},
        lastname: {type: DataTypes.STRING, allowNull:'false'},
        email: {type: DataTypes.STRING, allowNull:'false'},
        image: {type: DataTypes.STRING , allowNull: 'true'},
        role: {type: DataTypes.STRING, defaultValue: 'student'}
    })
}