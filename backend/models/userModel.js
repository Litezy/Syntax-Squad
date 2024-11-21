module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        firstname: {type: DataTypes.STRING},
        lastname: {type: DataTypes.STRING},
        email: {type: DataTypes.STRING},
        image: {type: DataTypes.STRING},
        role: {type: DataTypes.STRING, defaultValue: 'student'},
        class: {type: DataTypes.STRING},
    })
}