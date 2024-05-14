const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'expenses.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err);
    } else {
        console.log('Database opened successfully');
    }
});

const alterTable = () => {
    return new Promise((resolve, reject) => {
        db.run('ALTER TABLE Depense ADD status TEXT', (error) => {
            if (error) {
                reject(`Error altering table: ${error}`);
            } else {
                resolve('Table is already modified');
            }
        });
    });
};

const initDB = () => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run('CREATE TABLE IF NOT EXISTS Utilisateur (id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT, email TEXT, numero INTEGER, mot_de_passe TEXT)');
            db.run('CREATE TABLE IF NOT EXISTS Categorie (id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT)');
            db.run('CREATE TABLE IF NOT EXISTS Depense (id INTEGER PRIMARY KEY AUTOINCREMENT, id_utilisateur INTEGER, id_categorie INTEGER, montant INTEGER, date VARCHAR(10), commentaire TEXT, FOREIGN KEY (id_utilisateur) REFERENCES Utilisateur(id), FOREIGN KEY (id_categorie) REFERENCES Categorie(id))');
            db.run('CREATE TABLE IF NOT EXISTS Budget (id INTEGER PRIMARY KEY AUTOINCREMENT, id_utilisateur INTEGER, id_categorie INTEGER, montant INTEGER, debut TEXT, fin TEXT, statut TEXT, FOREIGN KEY (id_utilisateur) REFERENCES Utilisateur(id), FOREIGN KEY (id_categorie) REFERENCES Categorie(id))');
            db.run('CREATE TABLE IF NOT EXISTS Objectif (id INTEGER PRIMARY KEY AUTOINCREMENT, id_utilisateur INTEGER, montant_cible REAL, date_limite TEXT, FOREIGN KEY (id_utilisateur) REFERENCES Utilisateur(id))');
            db.run('CREATE TABLE IF NOT EXISTS Depense_Obj (id INTEGER PRIMARY KEY AUTOINCREMENT, id_depense INTEGER, id_objectif INTEGER, FOREIGN KEY (id_depense) REFERENCES Depense(id), FOREIGN KEY (id_objectif) REFERENCES Objectif(id))');
            db.run('CREATE TABLE IF NOT EXISTS Notification (id_message INTEGER PRIMARY KEY AUTOINCREMENT, id_budget INTEGER, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, notifs TEXT, statut TEXT, FOREIGN KEY (id_budget) REFERENCES Budget(id))');

            resolve('Database initialized successfully');
        }, (error) => {
            reject(`Error initializing database: ${error}`);
        });
    });
};

const resetDB = () => {
    return new Promise((resolve, reject) => {
        const fs = require('fs');
        fs.unlink(dbPath, (error) => {
            if (error) reject(`Error deleting database: ${error}`);
            resolve('Database reset successfully');
        });
    });
};

const dropAllTables = () => {
    return new Promise((resolve, reject) => {
        db.run('DROP TABLE Notification', (error) => {
            if (error) reject(`Error dropping tables: ${error}`);
            resolve('Tables dropped');
        });
    });
};

const createUser = (nom, email, numero, mot_de_passe) => {
    return new Promise((resolve, reject) => {
        db.run(
            'INSERT INTO Utilisateur (nom, email, numero, mot_de_passe) VALUES (?, ?, ?, ?)',
            [nom, email, numero, mot_de_passe],
            function (error) {
                if (error) reject(`Error inserting user: ${error}`);
                resolve(this.lastID);
            }
        );
    });
};

const updateUser = (id, nom, email, numero, mot_de_passe) => {
    return new Promise((resolve, reject) => {
        db.run(
            'UPDATE Utilisateur SET nom = ?, email = ?, numero = ?, mot_de_passe = ? WHERE id = ?',
            [nom, email, numero, mot_de_passe, id],
            function (error) {
                if (error) reject(`Error updating user: ${error}`);
                if (this.changes > 0) resolve();
                else reject('Error updating user: No rows affected');
            }
        );
    });
};

const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM Utilisateur WHERE id = ?', [id], function (error) {
            if (error) reject(`Error deleting user: ${error}`);
            if (this.changes > 0) resolve();
            else reject('Error deleting user: No rows affected');
        });
    });
};

const getUsers = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM Utilisateur', [], (error, rows) => {
            if (error) reject(`Error fetching users: ${error}`);
            resolve(rows);
        });
    });
};

const checkUser = (nom, mot_de_passe) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM Utilisateur WHERE nom = ? AND mot_de_passe = ?', [nom, mot_de_passe], (error, row) => {
            if (error) reject(`Error checking user: ${error}`);
            resolve(row || null);
        });
    });
};

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM Utilisateur WHERE id = ?', [id], (error, row) => {
            if (error) reject(`Error fetching user: ${error}`);
            resolve(row || null);
        });
    });
};

const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM Utilisateur WHERE email = ?', [email], (error, row) => {
            if (error) reject(`Error fetching user by email: ${error}`);
            resolve(row || null);
        });
    });
};

const getUserUsername = (nom) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM Utilisateur WHERE nom = ?', [nom], (error, row) => {
            if (error) reject(`Error fetching user by username: ${error}`);
            resolve(row || null);
        });
    });
};

const getUserByPhone = (phone) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM Utilisateur WHERE numero = ?', [phone], (error, row) => {
            if (error) reject(`Error fetching user by phone: ${error}`);
            resolve(row || null);
        });
    });
};

const createCategory = (nom) => {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO Categorie (nom) VALUES (?)', [nom], function (error) {
            if (error) reject(`Error inserting category: ${error}`);
            resolve(this.lastID);
        });
    });
};

const updateCategory = (id, nom) => {
    return new Promise((resolve, reject) => {
        db.run('UPDATE Categorie SET nom = ? WHERE id = ?', [nom, id], function (error) {
            if (error) reject(`Error updating category: ${error}`);
            if (this.changes > 0) resolve();
            else reject('Error updating category: No rows affected');
        });
    });
};

const deleteCategory = (id) => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM Categorie WHERE id = ?', [id], function (error) {
            if (error) reject(`Error deleting category: ${error}`);
            if (this.changes > 0) resolve();
            else reject('Error deleting category: No rows affected');
        });
    });
};

const getCategories = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM Categorie', [], (error, rows) => {
            if (error) reject(`Error fetching categories: ${error}`);
            resolve(rows);
        });
    });
};

const getCategory = (id) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM Categorie WHERE id = ?', [id], (error, row) => {
            if (error) reject(`Error fetching category by ID: ${error}`);
            resolve(row || null);
        });
    });
};

const getCategoryByName = (name) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM Categorie WHERE nom = ?', [name], (error, row) => {
            if (error) reject(`Error fetching category by name: ${error}`);
            resolve(row || null);
        });
    });
};

const createExpense = (id_utilisateur, id_categorie, montant, date, commentaire) => {
    return new Promise((resolve, reject) => {
        db.run(
            'INSERT INTO Depense (id_utilisateur, id_categorie, montant, date, commentaire) VALUES (?, ?, ?, ?, ?)',
            [id_utilisateur, id_categorie, montant, date, commentaire],
            function (error) {
                if (error) reject(`Error inserting expense: ${error}`);
                resolve(this.lastID);
            }
        );
    });
};

const getExpenses = () => {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT Depense.id, Depense.montant, Depense.date, Depense.commentaire, Categorie.nom
             FROM Depense
             JOIN Categorie ON Depense.id_categorie = Categorie.id`,
            [],
            (error, rows) => {
                if (error) reject(`Error fetching expenses: ${error}`);
                resolve(rows);
            }
        );
    });
};

const getExpense = (id) => {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT Depense.id, Depense.id_utilisateur, Depense.id_categorie, Depense.montant, Depense.date, Depense.commentaire, Categorie.nom
             FROM Depense
             JOIN Categorie ON Depense.id_categorie = Categorie.id
             WHERE Depense.id = ?`,
            [id],
            (error, row) => {
                if (error) reject(`Error fetching expense: ${error}`);
                resolve(row || null);
            }
        );
    });
};

const getLimitExpense = () => {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT id, date, SUM(montant) AS somme_montant
             FROM Depense
             GROUP BY date
             ORDER BY date DESC
             LIMIT 5`,
            [],
            (error, rows) => {
                if (error) reject(`Error fetching limited expenses: ${error}`);
                resolve(rows);
            }
        );
    });
};

const getExpenseByCatId = (id) => {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT Depense.id, Depense.id_utilisateur, Depense.id_categorie, Depense.montant, Depense.date, Depense.commentaire, Categorie.nom
             FROM Depense
             JOIN Categorie ON Depense.id_categorie = Categorie.id
             WHERE Depense.id_categorie = ?`,
            [id],
            (error, rows) => {
                if (error) reject(`Error fetching expenses by category: ${error}`);
                resolve(rows);
            }
        );
    });
};

const updateExpense = (id, id_utilisateur, id_categorie, montant, date, commentaire) => {
    return new Promise((resolve, reject) => {
        db.run(
            `UPDATE Depense
             SET id_utilisateur = ?, id_categorie = ?, montant = ?, date = ?, commentaire = ?
             WHERE id = ?`,
            [id_utilisateur, id_categorie, montant, date, commentaire, id],
            function (error) {
                if (error) reject(`Error updating expense: ${error}`);
                if (this.changes > 0) resolve();
                else reject('Error updating expense: No rows affected');
            }
        );
    });
};

const deleteExpense = (id) => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM Depense WHERE id = ?', [id], function (error) {
            if (error) reject(`Error deleting expense: ${error}`);
            if (this.changes > 0) resolve();
            else reject('Error deleting expense: No rows affected');
        });
    });
};

// Export all functions
module.exports = {
    alterTable,
    initDB,
    resetDB,
    dropAllTables,
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    checkUser,
    getUser,
    getUserByEmail,
    getUserUsername,
    getUserByPhone,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategories,
    getCategory,
    getCategoryByName,
    createExpense,
    getExpenses,
    getExpense,
    getLimitExpense,
    getExpenseByCatId,
    updateExpense,
    deleteExpense
};