const cron = require('node-cron');
const { updateBudgetStatutAuto, processNotifications } = require('./notifications');
const logger = require('./logger');

// Schedule to update budget status every day at midnight
cron.schedule('0 0 * * *', async () => {
    logger.info('Running updateBudgetStatutAuto...');
    try {
        await updateBudgetStatutAuto();
        logger.info('updateBudgetStatutAuto completed successfully.');
    } catch (error) {
        logger.error(`Error updating budget status: ${error.message}`);
    }
});

// Schedule to process notifications every hour
cron.schedule('0 * * * *', async () => {
    logger.info('Running processNotifications...');
    try {
        await processNotifications();
        logger.info('processNotifications completed successfully.');
    } catch (error) {
        logger.error(`Error processing notifications: ${error.message}`);
    }
});