const { sequelize } = require('../models');
const { ServerError } = require('./utils');
const categoryModel = require('../models').categories;

exports.uploadCategories = async (req, res) => {
    try {

        await sequelize.authenticate();
        console.log('Database connected')


        const existingCategories = await categoryModel.count();
        if (existingCategories > 0) {
            console.log('Categories already populated. Exiting script.');
            return res.json({ status: 200, msg: 'Categories already populated. Exiting script.' })

        }
        const categoryNames = [
            { name: 'Mathematics' },
            { name: 'English Language' },
            { name: 'Basic Science' },
            { name: 'Basic Technology' },
            { name: 'Social Studies' },
            { name: 'Civic Education' },
            { name: 'Business Studies' },
            { name: 'Computer Science (ICT)' },
            { name: 'Physical and Health Education (PHE)' },
            { name: 'Home Economics' },
            { name: 'Agricultural Science' },
            { name: 'Christian Religious Studies (CRS)' },
            { name: 'Islamic Religious Studies (IRS)' },
            { name: 'Fine Arts' },
            { name: 'Music' },
            { name: 'French' },
            { name: 'History' },
            { name: 'Igbo' },
            { name: 'Hausa' },
            { name: 'Yoruba' },
            { name: 'Biology' },
            { name: 'Physics' },
            { name: 'Chemistry' },
            { name: 'Geography' },
            { name: 'Economics' },
            { name: 'Further Mathematics' },
            { name: 'Literature in English' },
            { name: 'Government' },
            { name: 'Technical Drawing' },
            { name: 'Commerce' },
            { name: 'Financial Accounting' },

            // South African Curriculum (Examples)
            { name: 'Zulu' },
            { name: 'Afrikaans' },
            { name: 'Xhosa' },
            { name: 'Life Orientation' },
            { name: 'Natural Sciences' },
            { name: 'Creative Arts' },
            { name: 'Technology' },
            { name: 'Economic and Management Sciences (EMS)' },
            { name: 'Sepedi' },
            { name: 'Sesotho' },
        ];

        // create new or ignore duplicates
        await categoryModel.bulkCreate(categoryNames, { ignoreDuplicates: true });


        //In case for any category already uploaded but no longer wanted on the db and not on updated script.
        // Fetch all categories in the database
        const fetchCategories = await categoryModel.findAll();
        const checkExistingNames = fetchCategories.map((category) => category.name);


        // Find categories to remove
        const newNames = categoryNames.map((category) => category.name);
        const categoriesToRemove = checkExistingNames.filter((name) => !newNames.includes(name));

        // Remove old categories not in the new list
        if (categoriesToRemove.length > 0) {
            await categoryModel.destroy({
                where: {
                    name: categoriesToRemove,
                },
            });
            console.log(`Removed categories: ${categoriesToRemove.join(', ')}`);
        }

        console.log('Categories populated successfully');
        return res.json({ status: 200, msg: 'categories uploaded successfully' })
    } catch (error) {
        console.error('Error in uploading categories to the database:', error);
        ServerError(res,error)

    }
}


