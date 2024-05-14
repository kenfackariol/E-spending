// api.js

// Set the base URL for your API
const API_BASE_URL = 'http://127.0.0.1:3000';

// Helper function to handle `fetch` requests with JSON
const fetchWithJson = async (url, options = {}) => {
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'API request failed');
    }

    return response.json();
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

export const getUserById = (id) =>
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

export const getExpenseById = (id) =>
    fetchWithJson(`${API_BASE_URL}/expenses/${id}`);

export const getRecentExpenses = () =>
    fetchWithJson(`${API_BASE_URL}/expenses/limit/recent`);

export const getExpensesByCategoryId = (id) =>
    fetchWithJson(`${API_BASE_URL}/expenses/category/${id}`);

// Database
export const initDB = () =>
    fetchWithJson(`${API_BASE_URL}/init`);

export const alterTable = () =>
    fetchWithJson(`${API_BASE_URL}/alter`);

export const resetDB = () =>
    fetchWithJson(`${API_BASE_URL}/reset`);

export const dropAllTables = () =>
    fetchWithJson(`${API_BASE_URL}/drop`);