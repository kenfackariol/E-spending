

import { Alert } from "react-native";

const { getBudgets, updateBudgetStatut, getSumMontantByCategory, getMontantBudget, createNotification, getNotificationByBudgetId, updateNotification } = require("./database");

exports.updateBudgetStatutAuto = async () => {
    const budgets = await getBudgets()
    const today = new Date()
    for (let budget of budgets) {
        bDate = new Date(budget.fin)
        if (today > bDate) {
            await updateBudgetStatut(budget.id, "disabled")
        }
    }
};

exports.processNotifications = async () => {
    const depenseCategorie = await getSumMontantByCategory()
    const budgets = await getBudgets()
    for (let budget of budgets) {
        for (let categorie of depenseCategorie) {
            try {
                if (categorie.id == budget.id_categorie) {
                    let bDate = new Date(budget.fin)
                    let today = new Date()
                    const notif = await getNotificationByBudgetId(budget.id)
                    
                    if (categorie.somme_montant >= budget.montant) {
                        let message = `Le Montant du budget de la categorie ${categorie.nom} est de atteint `
                        //budget depasse
                        if (!notif) {
                            let res = await createNotification(budget.id, message , "Depassé")
                            //Alert.alert("Budget Atteint pour cette Categorie Veuillez Modifier ou creer un un Budget") 
                        }
                        else{
                           
                            await updateNotification(notif.id_message, budget.id, message, "Depassé")
                        }
                    }
                    else if (today > bDate) {
                        let message = `Le budget de la categorie ${categorie.nom} est Expiré `
                        //budget expiré
                        if(!notif){
                            let res = await createNotification(budget.id, message, "Expired")
                            //Alert.alert("Budget Expiré pour cette Categorie Veuillez Modifier ou creer un un Budget")
                        }
                        else {
                            await updateNotification(notif.id_message, budget.id, message, "Expire")
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}
