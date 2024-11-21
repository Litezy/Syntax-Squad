const {Sequelize,DataTypes} = require("sequelize")

const sequelize = new Sequelize('syntax_squad', 'root','',{
    host:'localhost',
    dialect:'mysql'
})
sequelize.authenticate().then(()=>{ console.log(`db connected successfully`)})
.catch((error) => {console.log(error)})

const db = {}
db.sequelize =sequelize
db.Sequelize =Sequelize
db.users = require('./userModel')(sequelize,DataTypes)
db.notifications = require('./notifyModel')(sequelize,DataTypes)



// One to Many relationships



// One to one relationship 


db.sequelize.sync({force: false }).then(() => {console.log('database tables synced successfully')})
.catch((error) =>{console.log(`error occurred ${error}`)})
module.exports = db