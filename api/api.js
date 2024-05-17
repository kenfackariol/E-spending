// api.js

// Set the base URL for your API
const API_BASE_URL = 'http://192.168.208.64:3000';

// Helper function to handle `fetch` requests with JSON
const fetchWithJson = async (endpoint, options = {}) => {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

    const {
        headers = {},
        ...restOptions
    } = options;

    const defaultHeaders = {
        'Content-Type': 'application/json'
    };

    const response = await fetch(url, {
        headers: {
            ...defaultHeaders,
            ...headers
        },
        ...restOptions
    });

    let responseData;

    try {
        responseData = await response.json();
    } catch (error) {
        responseData = { message: 'Invalid JSON response' };
    }

    if (!response.ok) {
        const error = new Error(responseData.error || responseData.message || 'An error occurred');
        error.status = response.status;
        error.responseData = responseData;
        throw error;
    }

    return responseData;
};


// Users
export const createUser = (nom, email, numero, mot_de_passe) =>
    fetchWithJson(`${API_BASE_URL}/users`, {
        method: 'POST',
        body: JSON.stringify({ nom, email, numero, mot_de_passe }),
    });

export const updateUser = (id, nom, email, numero, mot_de_passe) =>
    fetchWithJson(`${API_BASE_URL}/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ nom, email, numero, mot_de_passe }),
    });

export const deleteUser = (id) =>
    fetchWithJson(`${API_BASE_URL}/users/${id}`, {
        method: 'DELETE',
    });

export const getUsers = () =>
    fetchWithJson(`${API_BASE_URL}/users`);

export const getUser = (id) =>
    fetchWithJson(`${API_BASE_URL}/users/${id}`);

export const getUserByEmail = (email) =>
    fetchWithJson(`${API_BASE_URL}/users/email/${email}`);

export const getUserByUsername = (nom) =>
    fetchWithJson(`${API_BASE_URL}/users/username/${nom}`);

export const getUserByPhone = (numero) =>
    fetchWithJson(`${API_BASE_URL}/users/phone/${numero}`);

export const checkUser = (nom, mot_de_passe) =>
    fetchWithJson(`${API_BASE_URL}/users/check`, {
        method: 'POST',
        body: JSON.stringify({ nom, mot_de_passe }),
    });

// Categories
export const createCategory = (nom) =>
    fetchWithJson(`${API_BASE_URL}/categories`, {
        method: 'POST',
        body: JSON.stringify({ nom }),
    });

export const updateCategory = (id, nom) =>
    fetchWithJson(`${API_BASE_URL}/categories/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ nom }),
    });

export const deleteCategory = (id) =>
    fetchWithJson(`${API_BASE_URL}/categories/${id}`, {
        method: 'DELETE',
    });

export const getCategories = () =>
    fetchWithJson(`${API_BASE_URL}/categories`);

export const getCategoryById = (id) =>
    fetchWithJson(`${API_BASE_URL}/categories/${id}`);

// Expenses
export const createExpense = (id_utilisateur, id_categorie, montant, date, commentaire) =>
    fetchWithJson(`${API_BASE_URL}/expenses`, {
        method: 'POST',
        body: JSON.stringify({ id_utilisateur, id_categorie, montant, date, commentaire }),
    });

export const updateExpense = (id, id_utilisateur, id_categorie, montant, date, commentaire) =>
    fetchWithJson(`${API_BASE_URL}/expenses/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ id_utilisateur, id_categorie, montant, date, commentaire }),
    });

export const deleteExpense = (id) =>
    fetchWithJson(`${API_BASE_URL}/expenses/${id}`, {
        method: 'DELETE',
    });

export const getExpenses = () =>
    fetchWithJson(`${API_BASE_URL}/expenses`);

export const getExpense = (id) =>
    fetchWithJson(`${API_BASE_URL}/expenses/${id}`);

export const getLimitExpense = () =>
    fetchWithJson(`${API_BASE_URL}/expenses/limit/recent`);

export const getExpenseByCatId = (id) =>
    fetchWithJson(`${API_BASE_URL}/expenses/category/${id}`);

// Budgets
export const createBudget = (id_utilisateur, id_categorie, montant, debut, fin, statut) =>
    fetchWithJson(`${API_BASE_URL}/budgets`, {
        method: 'POST',
        body: JSON.stringify({ id_utilisateur, id_categorie, montant, debut, fin, statut }),
    });

export const updateBudgetStatut = (id, statut) =>
    fetchWithJson(`${API_BASE_URL}/budgets/${id}/statut`, {
        method: 'PUT',
        body: JSON.stringify({ statut }),
    });

export const updateBudget = (id, id_utilisateur, id_categorie, montant, debut, fin, statut) =>
    fetchWithJson(`${API_BASE_URL}/budgets/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ id_utilisateur, id_categorie, montant, debut, fin, statut }),
    });

export const deleteBudget = (id) =>
    fetchWithJson(`${API_BASE_URL}/budgets/${id}`, {
        method: 'DELETE',
    });

export const getBudgets = () =>
    fetchWithJson(`${API_BASE_URL}/budgets`);

export const getBudget = (id) =>
    fetchWithJson(`${API_BASE_URL}/budgets/${id}`);

// Notifications
export const createNotification = (id_budget, notifs, statut) =>
    fetchWithJson(`${API_BASE_URL}/notifications`, {
        method: 'POST',
        body: JSON.stringify({ id_budget, notifs, statut }),
    });

export const updateNotification = (id, id_budget, notifs, statut) =>
    fetchWithJson(`${API_BASE_URL}/notifications/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ id_budget, notifs, statut }),
    });

export const deleteNotification = (id) =>
    fetchWithJson(`${API_BASE_URL}/notifications/${id}`, {
        method: 'DELETE',
    });

export const getNotifications = () =>
    fetchWithJson(`${API_BASE_URL}/notifications`);

export const getNotificationByBudgetId = (id) =>
    fetchWithJson(`${API_BASE_URL}/notifications/${id}/budget`);

// Database
export const initDB = () =>
    fetchWithJson(`${API_BASE_URL}/init`);

export const alterTable = () =>
    fetchWithJson(`${API_BASE_URL}/alter`);

export const resetDB = () =>
    fetchWithJson(`${API_BASE_URL}/reset`);

export const dropAllTables = () =>
    fetchWithJson(`${API_BASE_URL}/drop`);