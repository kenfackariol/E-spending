const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const { initCategories } = require('./categories_seed');
require('./scheduler'); // Import and run the scheduler

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Simple logging middleware
const requestLogger = (req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    next(); // Proceed to the next middleware/handler
};

// Usage in Express app
app.use(requestLogger);

// Initialize the database
app.get('/init', async (req, res) => {
    try {
        const result = await db.initDB();
        await initCategories(); // Seed categories after initializing the database
        res.json({ message: result });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Alter Table
app.get('/alter', async (req, res) => {
    try {
        const result = await db.alterTable();
        res.json({ message: result });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Reset Database
app.get('/reset', async (req, res) => {
    try {
        const result = await db.resetDB();
        res.json({ message: result });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Drop All Tables
app.get('/drop', async (req, res) => {
    try {
        const result = await db.dropAllTables();
        res.json({ message: result });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Create a User
app.post('/users', async (req, res) => {
    const { nom, email, numero, mot_de_passe } = req.body;
    try {
        const userId = await db.createUser(nom, email, numero, mot_de_passe);
        res.json({ userId });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Update a User
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { nom, email, numero, mot_de_passe } = req.body;
    try {
        await db.updateUser(id, nom, email, numero, mot_de_passe);
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Delete a User
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.deleteUser(id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Get All Users
app.get('/users', async (req, res) => {
    try {
        const users = await db.getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Get a User by ID
app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await db.getUser(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Create a Category
app.post('/categories', async (req, res) => {
    const { nom } = req.body;
    try {
        const categoryId = await db.createCategory(nom);
        res.json({ categoryId });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Update a Category
app.put('/categories/:id', async (req, res) => {
    const { id } = req.params;
    const { nom } = req.body;
    try {
        await db.updateCategory(id, nom);
        res.json({ message: 'Category updated successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Delete a Category
app.delete('/categories/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.deleteCategory(id);
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Get All Categories
app.get('/categories', async (req, res) => {
    try {
        const categories = await db.getCategories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Get a Category by ID
app.get('/categories/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const category = await db.getCategory(id);
        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Create an Expense
app.post('/expenses', async (req, res) => {
    const { id_utilisateur, id_categorie, montant, date, commentaire } = req.body;
    try {
        const expenseId = await db.createExpense(id_utilisateur, id_categorie, montant, date, commentaire);
        res.json({ expenseId });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Update an Expense
app.put('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const { id_utilisateur, id_categorie, montant, date, commentaire } = req.body;
    try {
        await db.updateExpense(id, id_utilisateur, id_categorie, montant, date, commentaire);
        res.json({ message: 'Expense updated successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Delete an Expense
app.delete('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.deleteExpense(id);
        res.json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Get All Expenses
app.get('/expenses', async (req, res) => {
    try {
        const expenses = await db.getExpenses();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Get an Expense by ID
app.get('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const expense = await db.getExpense(id);
        if (expense) {
            res.json(expense);
        } else {
            res.status(404).json({ error: 'Expense not found' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Get Limited Expenses (last 5)
app.get('/expenses/limit/recent', async (req, res) => {
    try {
        const expenses = await db.getLimitExpense();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Get Expenses by Category ID
app.get('/expenses/category/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const expenses = await db.getExpenseByCatId(id);
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Check User Credentials
app.post('/users/check', async (req, res) => {
    const { nom, mot_de_passe } = req.body;
    console.log('checking for credentials');
    try {
        const user = await db.checkUser(nom, mot_de_passe);
        if (user) {
            res.json(user);
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Get User by Email
app.get('/users/email/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const user = await db.getUserByEmail(email);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Get User by Username
app.get('/users/username/:nom', async (req, res) => {
    const { nom } = req.params;
    try {
        const user = await db.getUserUsername(nom);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Get User by Phone Number
app.get('/users/phone/:numero', async (req, res) => {
    const { numero } = req.params;
    try {
        const user = await db.getUserByPhone(numero);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Create a Budget
app.post('/budgets', async (req, res) => {
    const { id_utilisateur, id_categorie, montant, debut, fin, statut } = req.body;
    try {
        const budgetId = await db.createBudget(id_utilisateur, id_categorie, montant, debut, fin, statut);
        res.json({ budgetId });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Update a Budget Statut
app.put('/budgets/:id/statut', async (req, res) => {
    const { id } = req.params;
    const { statut } = req.body;
    try {
        await db.updateBudgetStatut(id, statut);
        res.json({ message: 'Budget statut updated successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Update a Budget
app.put('/budgets/:id', async (req, res) => {
    const { id } = req.params;
    const { id_utilisateur, id_categorie, montant, debut, fin, statut } = req.body;
    try {
        await db.updateBudget(id, id_utilisateur, id_categorie, montant, debut, fin, statut);
        res.json({ message: 'Budget updated successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Delete a Budget
app.delete('/budgets/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.deleteBudget(id);
        res.json({ message: 'Budget deleted successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Get all Budgets
app.get('/budgets', async (req, res) => {
    console.log('route matched');
    try {
        const budgets = await db.getBudgets();
        res.json(budgets);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Get Budget by ID
app.get('/budgets/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const budget = await db.getBudget(id);
        res.json(budget);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Create a Notification
app.post('/notifications', async (req, res) => {
    const { id_budget, notifs, statut } = req.body;
    try {
        const notificationId = await db.createNotification(id_budget, notifs, statut);
        res.json({ notificationId });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Update a Notification
app.put('/notifications/:id', async (req, res) => {
    const { id } = req.params;
    const { id_budget, notifs, statut } = req.body;
    try {
        await db.updateNotification(id, id_budget, notifs, statut);
        res.json({ message: 'Notification updated successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Delete a Notification
app.delete('/notifications/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.deleteNotification(id);
        res.json({ message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Get all Notifications
app.get('/notifications', async (req, res) => {
    try {
        const notifications = await db.getNotifications();
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Get Notification by Budget ID
app.get('/notifications/:id/budget', async (req, res) => {
    const { id } = req.params;
    try {
        const notification = await db.getNotificationByBudgetId(id);
        res.json(notification);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Handle undefined routes
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

// Handle errors
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
        error: { message, data },
    });
});

// Start server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
});