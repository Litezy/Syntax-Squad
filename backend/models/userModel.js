module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        firstname: {type: DataTypes.STRING},
        lastname: {type: DataTypes.STRING},
        username: {type: DataTypes.STRING},
        email: {type: DataTypes.STRING},
        image: {type: DataTypes.STRING},
        role: {type: DataTypes.STRING, defaultValue: 'student'},
        password: {type: DataTypes.STRING, allowNull: false},
        gender: {type: DataTypes.STRING, allowNull: false},
        school: {type: DataTypes.STRING, allowNull: false},
        classgrade: {type: DataTypes.STRING},
        code: {type: DataTypes.STRING},
        status: {type: DataTypes.STRING, defaultValue:'offline'},
        postcounts: { type: DataTypes.INTEGER,defaultValue: 0},
        answercounts: { type: DataTypes.INTEGER, defaultValue:0},
        verified: {type: DataTypes.STRING, defaultValue:'false'},
        bio: {type: DataTypes.TEXT},
    })
}