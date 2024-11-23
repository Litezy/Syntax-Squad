const { Sequelize, DataTypes } = require("sequelize");


const isproduction = process.env.NODE_ENV === 'production'
const sequelize = new Sequelize(isproduction ? process.env.DB_NAME : 'syntax_squad', isproduction ? process.env.DB_USER : 'root', isproduction ? process.env.DB_PASSWORD : '', {
  host: isproduction ? process.env.DB_HOST : 'localhost',
  dialect: isproduction ? process.env.DB_DIALECT : 'mysql'
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
db.notifications = require(`./notificationModel`)(sequelize, DataTypes)
db.questions = require(`./questionModel`)(sequelize, DataTypes)
db.answers = require(`./answerModel`)(sequelize, DataTypes)
db.votes = require(`./voteModel`)(sequelize, DataTypes)
db.badges = require(`./badgeModel`)(sequelize, DataTypes)
db.badgenames = require(`./BadgeNames`)(sequelize, DataTypes)


//One to Many relationships
db.users.hasMany(db.questions, { foreignKey: "userid", as: 'userquestions' });
db.users.hasMany(db.answers, { foreignKey: "userid", as: 'useranswers' });
db.questions.hasMany(db.answers, { foreignKey: "questionId", as: 'userans' });
db.users.hasOne(db.votes, { foreignKey: "userid", as: 'uservote' });
db.answers.hasMany(db.votes, { foreignKey: "answerid", as: 'answer_votes' });
db.users.hasMany(db.notifications, { foreignKey: 'userid', as: 'usernotify' })
db.users.hasMany(db.badges, { foreignKey: 'userid', as: 'user_badges' })



//One to One relationships
db.questions.belongsTo(db.users, { foreignKey: 'userid', as: "userquestions" });
db.answers.belongsTo(db.users, { foreignKey: 'userid', as: "useranswers" });
db.answers.belongsTo(db.questions, { foreignKey: 'questionId', as: "userans" });
db.votes.belongsTo(db.users, { foreignKey: 'userid', as: "uservote" });
db.votes.belongsTo(db.answers, { foreignKey: 'answerid', as: "answer_votes" });
db.notifications.belongsTo(db.users, { foreignKey: 'userid', as: 'usernotify' })
db.badges.belongsTo(db.users, { foreignKey: 'userid', as: 'user_badges' })



db.sequelize.sync({ force: false })
  .then(() => console.log(`Connection has been established successfully on ${isproduction ? 'online db' : 'local db'} `))
  .catch(error => console.log(`${error}`))

module.exports = db