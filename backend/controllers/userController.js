const SendMail = require('../emails/mailConfig')
const moment = require('moment')
const { ServerError } = require('../utils/utils')
const jwt = require('jsonwebtoken')
const otpgenerator = require('otp-generator')
const Users = require('../models').users
const Notify = require('../models').notifications
const Question = require('../models').questions
const Answer = require('../models').answers
const Vote = require('../models').votes



exports.Signup = async (req, res) => {
    try {
        const { firstname, lastname, email, level, confirm_password, password,gender } = req.body
        if (!firstname) return res.json({ status: 400, msg: 'Firstname is missing' })
        if (!lastname) return res.json({ status: 400, msg: 'Lastname is missing' })
        if (!gender) return res.json({ status: 400, msg: 'gender is missing' })
        if (!email) return res.json({ status: 400, msg: 'email is missing' })
        if (!level) return res.json({ status: 400, msg: 'level is missing' })
        if (!confirm_password) return res.json({ status: 400, msg: 'confirm_password is missing' })
        if (!password) return res.json({ status: 400, msg: 'password is missing' })
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.json({ status: 400, message: "Invalid email format." });
        }
        if (confirm_password !== password) return res.json({ status: 400, msg: "Password(s) mismatch " })
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;

        if (!passwordRegex.test(password)) {
            return res.json({
                status: 400,
                message:
                    "Password must be at least 6 characters long, contain at least one uppercase letter, one number, and one special character.",
            });
        }
        const finduser = await Users.findOne({ where: { email: email } })
        if (finduser) return res.json({ status: 400, msg: 'This email already exists with us, Kindly login you account' })
        const otp = otpgenerator.generate(6, { specialChars: false, lowerCaseAlphabets: false, upperCaseAlphabets: false })

        const user = await Users.create({ firstname, gender, lastname, email, level, password, code: otp })
        await SendMail({
            code: otp,
            mailTo: email,
            subject: 'Account Verification Code',
            username: firstname,
            fullname: `${firstname} ${lastname}`,
            message: 'Copy and paste your account verification code below',
            template: 'verification',
            email: email,
            date: moment().format('DD MMMM YYYY hh:mm A')
        })

        await Notify.create({
            type: 'Successful Signup',
            message: 'Welcome to EduConnect! Your account has been successfully created. Start exploring, learning, and connecting with the educational opportunities waiting for you!',
        })

        return res.json({ status: 200, msg: 'Signup successful' ,data:user})

    } catch (error) {
        ServerError(res, error)
    }
}






exports.Testmail = async (req, res) => {
    try {
  
      const otp = otpgenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false })
      await SendMail({ 
        code: otp, 
        mailTo: 'liteb237@gmail.com', 
        subject: 'Account Verification Code', 
        username: `Bethel`, 
        message: 'Copy and paste your account verification code below', 
        template: 'verification', 
        fullname: `Bethel Nnadi`, 
        email: 'liteb237@gmail.com', 
        date: moment().format('DD MMMM YYYY hh:mm A') })
      return res.json({ status: 200, msg: 'Test email sent successfully' })
    } catch (error) {
      res.json({ status: 500, msg: error.message })
    }
  }


exports.getUser = async (req, res) => {
    try {
        return console.log('db not connected')
    } catch (error) {
        ServerError(res, error)
    }
}


