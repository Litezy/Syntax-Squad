const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize('syntax_squad','root',  '', {
    host: 'localhost',
    dialect:  'mysql'
  });
  

  sequelize.authenticate().then(() => {
    console.log(`Connection has been established successfully.`);
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  const db = {}

  db.sequelize = sequelize 
  db.Sequelize = Sequelize

  db.users = require('./userModel')(sequelize, DataTypes)
  db.notifications = require(`./notificationModel`)(sequelize,DataTypes)
  db.questions = require(`./questionModel`)(sequelize,DataTypes)
  db.answers = require(`./answerModel`)(sequelize,DataTypes)
  db.votes = require(`./voteModel`)(sequelize,DataTypes)
  

  //One to Many relationships
  db.users.hasMany(db.questions, { foreignKey: "userid", as: 'questions' });
  db.questions.belongsTo(db.users, { foreignKey: 'userid', as: "author" });
  
  

  db.sequelize.sync({force: false})
  .then(() => console.log(`Connection has been established successfully on `))
  .catch(error => console.log(`${error}`))

  module.exports = db