const {
    getBudgets,
    updateBudgetStatut,
    getSumMontantByCategory,
    createNotification,
    getNotificationByBudgetId,
    updateNotification
} = require('./db');

exports.updateBudgetStatutAuto = async () => {
    const budgets = await getBudgets();
    const today = new Date();
    for (let budget of budgets) {
        let bDate = new Date(budget.fin);
        if (today > bDate) {
            await updateBudgetStatut(budget.id, 'disabled');
        }
    }
};

exports.processNotifications = async () => {
    const depenseCategorie = await getSumMontantByCategory();
    const budgets = await getBudgets();
    for (let budget of budgets) {
        for (let categorie of depenseCategorie) {
            try {
                if (categorie.id === budget.id_categorie) {
                    let bDate = new Date(budget.fin);
                    let today = new Date();
                    const notif = await getNotificationByBudgetId(budget.id);

                    if (categorie.somme_montant >= budget.montant) {
                        let message = `Le Montant du budget de la catégorie ${categorie.nom} est atteint.`;
                        // Budget dépassé
                        if (!notif) {
                            await createNotification(budget.id, message, 'Dépassé');
                        } else {
                            await updateNotification(notif.id_message, budget.id, message, 'Dépassé');
                        }
                    } else if (today > bDate) {
                        let message = `Le budget de la catégorie ${categorie.nom} est expiré.`;
                        // Budget expiré
                        if (!notif) {
                            await createNotification(budget.id, message, 'Expiré');
                        } else {
                            await updateNotification(notif.id_message, budget.id, message, 'Expire');
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
};