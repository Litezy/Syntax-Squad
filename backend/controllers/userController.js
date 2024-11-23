const SendMail = require('../emails/mailConfig')
const moment = require('moment')
const { ServerError, Excludes } = require('../utils/utils')
const slug = require('slug')
const jwt = require('jsonwebtoken')
const otpgenerator = require('otp-generator')
const User = require('../models').users
const Notify = require('../models').notifications
const Question = require('../models').questions
const Answer = require('../models').answers
const Vote = require('../models').votes
const fs = require('fs')
const path = require('path');
const Badge = require('../models').badges
const BadgeNames = require('../models').badgenames



exports.Signup = async (req, res) => {
    try {
        const { firstname, lastname, email, classgrade, school, username, confirm_password, password, gender } = req.body
        if (!firstname) return res.json({ status: 400, msg: 'Firstname is missing' })
        if (!lastname) return res.json({ status: 400, msg: 'Lastname is missing' })
        if (!username) return res.json({ status: 400, msg: 'Lastname is missing' })
        if (!gender) return res.json({ status: 400, msg: 'gender is missing' })
        if (!email) return res.json({ status: 400, msg: 'email is missing' })
        if (!school) return res.json({ status: 400, msg: 'school name is missing' })
        if (!classgrade) return res.json({ status: 400, msg: 'classgrade is missing' })
        if (!confirm_password) return res.json({ status: 400, msg: 'confirm_password is missing' })
        if (!password) return res.json({ status: 400, msg: 'password is missing' })
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.json({ status: 400, msg: "Invalid email format." });
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
        const findUsername = await User.findOne({ where: { username } })
        if (findUsername) return res.json({ status: 400, msg: 'Username exists, try another' })
        const finduser = await User.findOne({ where: { email: email } })
        if (finduser) return res.json({ status: 400, msg: 'This email already exists with us, Kindly login you account' })
        const otp = otpgenerator.generate(6, { specialChars: false, lowerCaseAlphabets: false, upperCaseAlphabets: false })

        const user = await User.create({ firstname, gender, lastname, email, classgrade, username, password, code: otp, school })
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
            userid: user.id,
            type: 'Successful Signup',
            message: 'Welcome to EduConnect! Your account has been successfully created. Start exploring, learning, and connecting with the educational opportunities waiting for you!',
        })

        return res.json({ status: 200, msg: 'Signup successful', data: user })

    } catch (error) {
        ServerError(res, error)
    }
}



exports.LoginAcc = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.json({ status: 404, msg: "Incomplete request" })
        const user = await User.findOne({ where: { email } })
        if (!user) return res.json({ status: 400, msg: 'Account not found' })
        if (user.password !== password) return res.json({ status: 404, msg: 'Invalid password' })
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '48h' })
        user.status = 'online'
        return res.json({ status: 200, msg: 'Login successful', token })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}


exports.GetUserProfile = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { id: req.user },
            attributes: { exclude: Excludes }
        })
        if (!user) return res.json({ status: 400, msg: 'Incomplete request' })
        return res.json({ status: 200, msg: 'Profile fetched successfully', data: user })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })

    }
}


exports.logOutUser = async (req, res) => {
    try {
        if (!req.user) return res.json({ status: 400, msg: 'User not authenticated' })
        const user = await User.findOne({ where: { id: req.user } })
        if (!user) return res.json({
            status: 404,
            msg: `Account not found`,
        })
        user.status = 'offline'
        await user.save()
        return res.json({ status: 200, msg: `Logged out successfully ` })

    } catch (error) {
        return res.json({ status: 404, msg: error })
    }
}


exports.ChangeProfileImage = async (req, res) => {
    try {
        const { firstname, email } = req.body
        if (!firstname || !email) return res.json({ status: 404, msg: 'Incomplete request' })
        if (!req.files) return res.json({ status: 404, msg: 'profile image is required' })
        const findProfile = await User.findOne({ where: { email } })
        const image = req?.files?.image  // null or undefined
        let imageName;
        const filePath = './public/profiles'
        const currentImagePath = `${filePath}/${findProfile.image}`
        if (image) {
            // Check image size and format
            if (image.size >= 10000000) return res.json({ status: 400, msg: `Cannot upload up to 1MB` })
            if (!image.mimetype.startsWith('image/')) return res.json({ status: 400, msg: `Invalid image format (jpg, jpeg, png, svg, gif, webp)` })

            // Check for the existence of the current image path and delete it
            if (fs.existsSync(currentImagePath)) {
                fs.unlinkSync(currentImagePath)
            }

            // Check for the existence of the image path
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath)
            }
            imageName = `${slug(firstname, '-')}.png`
            findProfile.image = imageName
            await image.mv(`${filePath}/${imageName}`)
        }
        await findProfile.save()
        return res.json({ status: 200, msg: 'profile image uploaded successfully', data: findProfile })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}


exports.VerifyEmail = async (req, res) => {

    try {
        const { code, email } = req.body
        if (!code || !email) return res.json({ status: 404, msg: 'Incomplete Request' })
        const FindEmail = await User.findOne({ where: { email } })
        if (!FindEmail) return res.json({ status: 404, msg: 'Account not found' })
        if (code !== FindEmail.code) return res.json({ status: 404, msg: 'Invalid code' })
        FindEmail.code = null
        FindEmail.verified = 'true'
        await FindEmail.save()
        await SendMail({
            mailTo: email,
            fullname: `${FindEmail.firstname} ${FindEmail.lastname}`,
            subject: 'Successful SignUp',
            school: FindEmail.school,
            grade: FindEmail.classgrade,
            username: FindEmail.firstname,
            date: moment().format('DD MMMM YYYY hh:mm A'),
            template: 'welcome'
        })
        return res.json({ status: 200, msg: 'Email verified successfully' })

    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}


exports.sendOtpForPasswordChange = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) return res.json({ status: 400, msg: 'User email is missing' })
        const FindEmail = await User.findOne({ where: { email } })
        if (!FindEmail) return res.json({ status: 404, msg: 'Account not found' })
        const otp = otpgenerator.generate(6, { specialChars: false, lowerCaseAlphabets: false, upperCaseAlphabets: false })
        FindEmail.code = otp
        await FindEmail.save()
        return res.json({ status: 200, msg: 'Otp sent successfully', data: otp })
    } catch (error) {
        ServerError(res, error)
    }
}

exports.VerifyPasswordChange = async (req, res) => {

    try {
        const { code, email } = req.body
        if (!code || !email) return res.json({ status: 404, msg: 'Incomplete Request' })
        const FindEmail = await User.findOne({ where: { email } })
        if (!FindEmail) return res.json({ status: 404, msg: 'Account not found' })
        if (code !== FindEmail.code) return res.json({ status: 404, msg: 'Invalid code' })
        FindEmail.code = null
        FindEmail.verified = 'true'
        await FindEmail.save()
        return res.json({ status: 200, msg: 'Code verified successfully' })

    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}

exports.ChangeUserPassword = async (req, res) => {
    try {
        const { email, new_password, confirm_password } = req.body
        if (!email || !new_password || !confirm_password) return res.json({ status: 404, msg: 'Incomplete rquest to change password' })
        const finduser = await User.findOne({ where: { email } })
        if (!finduser) return res.json({ status: 400, msg: 'Account not found ' })
        if (new_password !== confirm_password) return res.json({ status: 404, msg: 'Password(s) mismatched' })
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;

        if (!passwordRegex.test(new_password)) {
            return res.json({
                status: 400,
                message:
                    "Password must be at least 6 characters long, contain at least one uppercase letter, one number, and one special character.",
            });
        }
        finduser.password = new_password
        await finduser.save()
        await Notify.create({
            type: 'Account Password Change',
            message: `Your request to change your account password was successful.`,
            status: 'unread',
            userid: finduser.id
        })
        await SendMail({ mailTo: finduser.email, subject: 'Password Verification Successfull', username: finduser.firstname, message: 'Your request to change your account password was successful, login to your account with the new password', template: 'emailpass', date: moment().format('DD MMMM YYYY hh:mm A') })
        return res.json({ status: 200, msg: "Password changed succesfully, login account" })
    } catch (error) {
        return res.json({ status: 404, msg: error })
    }
}




exports.populateBadges = async (req, res) => {
    const badges = [
        { name: 'Curious Starter', desc: 'Posted your first question on Edu Connect', threshold: 1, type: 'question', image: `/badges/curiousbadge.png` },

        {
            name: 'Inquisitive Learner', desc: 'Posted your 5th questions on Edu Connect', threshold: 5, type: 'question',
            image: '/badges/inquuisitive.png'
        },

        {
            name: 'Proactive Poster', desc: 'Posted your 10th questions on Edu Connect', threshold: 10, type: 'question',
            image: '/badges/proactive.png'
        },

        {
            name: 'Helpful Responder', desc: 'Answered 1 question on Edu Connect', threshold: 1, type: 'answer',
            image: '/badges/helperbadge.png'
        },

        {
            name: 'Dedicated Helper', desc: 'Answered 5 questions on Edu Connect', threshold: 5, type: 'answer',
            image: '/badges/dedicatedbadge.png'
        },
        {
            name: 'Expert Contributor', desc: 'Answered 10 questions on Edu Connect', threshold: 10, type: 'answer',
            image: '/badges/expertbadge.png'
        },


        {
            name: 'Balanced Contributor', desc: 'Posted 15 questions and answered 15 questions on Edu Connect', threshold: 15, type: 'both', image: {
                male: '/badges/balanc-contibutor-emale.png',
                female: '/badges/balance-contributor-female.png'
            }
        },
    ];

    try {
        await BadgeNames.bulkCreate(badges, { ignoreDuplicates: true });
        return res.json({ status: 200, msg: 'Badges populated successfully' });
    } catch (error) {
        ServerError(res, error)
    }
};




const assignBadge = async (userid, badgeName) => {
    try {
        const badge = await BadgeNames.findOne({ where: { name: badgeName } });
        const findUser = await User.findOne({ where: { id: userid } })
        if (!badge || !findUser) {
            return { status: 404, msg: 'User or badge not found' };
        }
        // Check if the user already has this badge
        const existingBadge = await Badge.findOne({ where: { userid, name: badge.name } });

        if (!existingBadge) {
            const newBadge = await Badge.create({
                userid,
                type: badge.type,
                desc: badge.desc,
                name: badge.name,
                icon: `
                ${badgeName === 'Balanced Contributor' && Array.isArray(badge.image) ? findUser.gender === 'male' ? badge.image[0] : badge.image[1] : badge.image}`
            });
            await Notify.create({
                userid,
                type: 'Badge Awarded',
                message: `You have been awarded the ${badgeName} badge for your contributions to the community`
            })

            await SendMail({
                mailTo: findUser.email,
                username: findUser.username,
                badgeName: badgeName,
                criteria: badge.desc,
                subject: 'Badge Award',
                template: 'badge',
                date: moment().format('DD-MM-YYYY hh:mm A')
            });
            console.log(`User ${findUser.username} awarded ${badgeName}`)
            return { status: 200, msg: 'Badge assigned and user notified successfully.', newBadge };

        }
        else {
            return { status: 400, msg: 'User already has this badge.' };
        }

    } catch (error) {
        console.error('Error assigning badge:', error);
    }
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve,ms))

exports.CreateQuestion = async (req, res) => {
    try {
        // Ensure this is populated via middleware

        const { category, content } = req.body;

        if (!category || !content) {
            return res.status(400).json({ status: 400, msg: 'Incomplete request found' });
        }
        const findUser = await User.findOne({ where: { id: req.user } })
        if (!findUser) return res.json({ status: 400, msg: "Unauthorized access" })

        const username = findUser.username
        const images = req.files?.images;
        let imageNames = [];
        const slugData = slug(username, '-')
        const filePath = './public/questions';

        let counter = 1
        if (images) {
            const imagesArray = Array.isArray(images) ? images : [images];

            for (const image of imagesArray) {
                if (image.size >= 10000000) {
                    return res.json({ status: 400, status: 400, msg: 'Cannot upload images larger than 10MB' });
                }
                if (!image.mimetype.startsWith('image/')) {
                    return res.json({ status: 400, status: 400, msg: 'Invalid image format (jpg, jpeg, png, svg, gif, webp)' });
                }

                if (!fs.existsSync(filePath)) {
                    await fs.promises.mkdir(filePath, { recursive: true });
                }
                const date = new Date();
                const timeStamp = date.getTime().toString();
                const slicedTime = timeStamp.slice(-6);
                const otp = otpgenerator.generate(5, { specialChars: false, upperCaseAlphabets: false });
                const imageName = `${slugData}-${slicedTime}-${otp}-${counter}.jpg`;
                imageNames.push(imageName);
                counter++;


                await image.mv(`${filePath}/${imageName}`);
            }
        }

        const newQuestionPost = await Question.create({
            category,
            content,
            slug: slugData,
            image: JSON.stringify(imageNames),
            userid: req.user,
        });

        await User.increment('postcounts', { where: { id: req.user } });
        const updatedUser = await User.findOne({ where: { id: req.user } });
        await delay(1000);
        // 
        if (updatedUser.postcounts === 1) {
            let badgename = 'Curious Starter';
            await assignBadge(updatedUser.id, badgename);
            console.log('awarded')
        }

        if (updatedUser.postcounts === 5) {
            let badgename = 'Inquisitive Learner';
            await assignBadge(updatedUser.id, badgename);
        }
        if (updatedUser.postcounts === 10) {
            let badgename = 'Proactive Poster';
            await assignBadge(updatedUser.id, badgename);
        }
        if (updatedUser.postcounts === 15 && updatedUser.answercounts === 15) {
            let badgename = 'Balanced Contibutor';
            await assignBadge(updatedUser.id, badgename);
        }


        return res.json({ status: 200, msg: 'Question created successfully', data: newQuestionPost });
    } catch (error) {
        console.error(error);
        ServerError(res, error);
    }
};

exports.getAllUsersQuestions = async (req, res) => {
    try {
        const questions = await Question.findAll({ where: { userid: req.user } })
        if (!questions) return res.json({
            status: 404, msg: "No posts found",
            include: [
                {
                    model: Answer, as: "userans"
                }
            ]
        })

        return res.json({ status: 200, msg: "fetch success", data: questions })
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
            date: moment().format('DD MMMM YYYY hh:mm A')
        })
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


