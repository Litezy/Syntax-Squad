const { ServerError } = require('../utils/utils')

const Users = require('../models').users
const Notify = require('../models').notifications
const Question = require('../models').questions
const Answer = require('../models').answers
const Vote = require('../models').votes

exports.getUser = async(req,res) =>{
 try {
  return console.log('db not connected')
 } catch (error) {
  ServerError(res,error)
 }
}