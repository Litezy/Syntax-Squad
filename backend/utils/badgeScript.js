const { sequelize, } = require('../models')
const BadgeModel = require('../models').badgenames

    async function populateBadgeNames()  {
        try {
            await sequelize.authenticate();
            console.log('Database connected')


            const existingBadges = await BadgeModel.count();
            if (existingBadges > 0) {
                console.log('Badges already populated. Exiting script.');
                process.exit(0); 
            }
            const badges = [
                { name: 'Curious Starter', desc: 'Posted your first question on Edu Connect', threshold: 1, type: 'question', image: `/badges/curiousbadge.png` },

                {
                    name: 'Inquisitive Learner', desc: 'Posted your 5th question on Edu Connect', threshold: 5, type: 'question',
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
                    name: 'Dedicated Helper', desc: 'Answered 5 question on Edu Connect', threshold: 5, type: 'answer',
                    image: '/badges/dedicatedbadge.png'
                },
                {
                    name: 'Expert Contributor', desc: 'Answered 10 question on Edu Connect', threshold: 10, type: 'answer',
                    image: '/badges/expertbadge.png'
                },


                {
                    name: 'Balanced Contributor', desc: 'Posted 15 questions and answered 15 questions on Edu Connect', threshold: 15, type: 'both', image: {
                        male: '/badges/balanc-contibutor-emale.png',
                        female: '/badges/balance-contributor-female.png'
                    }
                },
            ];
            await BadgeModel.bulkCreate(badges, { ignoreDuplicates: true });
            console.log('Badges populated successfully')
            process.exit();
        
        }

        catch (error) {
            console.error('Error populating data:', error);
            process.exit();
        }
    }
    populateBadgeNames();