const categories = require('./categorie.json');
const { createCategory, getCategoryByName } = require('./db');
const logger = require('./logger');

const initCategories = async () => {
    if (categories && categories.length) {
        try {
            for (let category of categories) {
                let old = await getCategoryByName(category.name);
                if (!old) {
                    await createCategory(category.name);
                    logger.info(`Category "${category.name}" created.`);
                } else {
                    logger.info(`Category "${category.name}" already exists.`);
                }
            }
        } catch (error) {
            logger.error(`Error initializing categories: ${error.message}`);
        }
    }
};

module.exports = {
    initCategories
};