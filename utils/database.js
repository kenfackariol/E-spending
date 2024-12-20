import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';

const db = SQLite.openDatabase('expenses.db');

export function alterTable() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('ALTER TABLE Depense ADD status TEXT');
      
    }, (error) => {
      reject(`Error drop database: ${error}`);
    }, () => {
      resolve('Table is already modify');
    });
  });
}

export function initDB() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS Utilisateur (id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT, email TEXT, numero INTEGER, mot_de_passe TEXT)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS Categorie (id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS Depense (id INTEGER PRIMARY KEY AUTOINCREMENT, id_utilisateur INTEGER, id_categorie INTEGER, montant INTEGER, date VARCHAR(10), commentaire TEXT, FOREIGN KEY (id_utilisateur) REFERENCES Utilisateur(id), FOREIGN KEY (id_categorie) REFERENCES Categorie(id))');
      tx.executeSql('CREATE TABLE IF NOT EXISTS Budget (id INTEGER PRIMARY KEY AUTOINCREMENT, id_utilisateur INTEGER, id_categorie INTEGER, montant INTEGER, debut TEXT, fin TEXT, statut TEXT, FOREIGN KEY (id_utilisateur) REFERENCES Utilisateur(id), FOREIGN KEY (id_categorie) REFERENCES Categorie(id))');
      tx.executeSql('CREATE TABLE IF NOT EXISTS Objectif (id INTEGER PRIMARY KEY AUTOINCREMENT, id_utilisateur INTEGER, montant_cible REAL, date_limite TEXT, FOREIGN KEY (id_utilisateur) REFERENCES Utilisateur(id))');
      tx.executeSql('CREATE TABLE IF NOT EXISTS Depense_Obj (id INTEGER PRIMARY KEY AUTOINCREMENT, id_depense INTEGER, id_objectif INTEGER, FOREIGN KEY (id_depense) REFERENCES Depense(id), FOREIGN KEY (id_objectif) REFERENCES Objectif(id))');
      tx.executeSql('CREATE TABLE IF NOT EXISTS Notification (id_message INTEGER PRIMARY KEY AUTOINCREMENT,id_budget INTEGER, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, notifs TEXT, statut TEXT,  FOREIGN KEY (id_budget) REFERENCES Budget(id));');
    }, (error) => {
      reject(`Error initializing database: ${error}`);
    }, () => {
      resolve('Database initialized successfully');
    });
  });
}
//status des budgets : expiré, depassé, non atteind 

export const resetDB = () => {
  return new Promise((resolve, reject) => {
    // Get the correct path to the database file
    const dbPath = FileSystem.documentDirectory + 'SQLite/expenses.db';

    FileSystem.deleteAsync(dbPath)
      .then(() => resolve("Database reset successfully"))
      .catch((error) => reject(error));
  });
};


export const dropAllTables = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
     
      tx.executeSql('DROP TABLE Notification');
      
      resolve('Tables dropped');
    }, (error) => {
      reject(`Error dropping tables: ${error}`);
    });
  });
};



export const createUser = (nom, email, numero, mot_de_passe) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Utilisateur (nom, email, numero, mot_de_passe) VALUES (?, ?, ?, ?)',
        [nom, email, numero, mot_de_passe],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId);
          else reject('Error inserting user');
        },
        (_, error) => reject(error)
      );
    });
  });
};

export const updateUser = (id, nom, email, numero, mot_de_passe) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE Utilisateur SET nom = ?, email = ?,numero = ?, mot_de_passe = ? WHERE id = ?',
        [nom, email, numero, mot_de_passe, id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve();
          else reject('Error updating user');
        },
        (_, error) => reject(error)
      );
    });
  });
};

export const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM Utilisateur WHERE id = ?',
        [id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve();
          else reject('Error deleting user');
        },
        (_, error) => reject(error)
      );
    });
  });
};

export const getUsers = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Utilisateur',
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

export const checkUser = (nom, mot_de_passe) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Utilisateur WHERE nom = ? AND mot_de_passe = ?',
        [nom, mot_de_passe],
        (_, { rows }) => resolve(rows.length > 0 ? rows.item(0) : null),
        (_, error) => reject(error)
      );
    });
  });
};


export const getUser = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Utilisateur WHERE id = ?',
        [id],
        (_, { rows }) => resolve(rows.length > 0 ? rows.item(0) : null),
        (_, error) => reject(error)
      );
    });
  });
};

export const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Utilisateur WHERE email = ?',
        [email],
        (_, { rows }) => resolve(rows.length > 0 ? rows.item(0) : null),
        (_, error) => reject(error)
      );
    });
  });
};

export const getUserUsername = (nom) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Utilisateur WHERE nom = ?',
        [nom],
        (_, { rows }) => resolve(rows.length > 0 ? rows.item(0) : null),
        (_, error) => reject(error)
      );
    });
  });
};

export const getUserByPhone = (phone) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Utilisateur WHERE numero = ?',
        [phone],
        (_, { rows }) => resolve(rows.length > 0 ? rows.item(0) : null),
        (_, error) => reject(error)
      );
    });
  });
};



export const createCategory = (nom) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Categorie (nom) VALUES (?)',
        [nom],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId);
          else reject('Error inserting category');
        },
        (_, error) => reject(error)
      );
    });
  });
};

export const updateCategory = (id, nom, type) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE Categorie SET nom = ?, type = ? WHERE id = ?',
        [nom, type, id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve();
          else reject('Error updating category');
        },
        (_, error) => reject(error)
      );
    });
  });
};

export const deleteCategory = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM Categorie WHERE id = ?',
        [id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve();
          else reject('Error deleting category');
        },
        (_, error) => reject(error)
      );
    });
  });
};

export const getCategories = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Categorie',
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};



export const getCategory = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Categorie WHERE id = ?',
        [id],
        (_, { rows }) => resolve(rows.length > 0 ? rows.item(0) : null),
        (_, error) => reject(error)
      );
    });
  });
}

export const getCategoryByName = (name) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Categorie WHERE nom = ?',
        [name],
        (_, { rows }) => resolve(rows.length > 0 ? rows.item(0) : null),
        (_, error) => reject(error)
      );
    });
  });
}

export const createExpense = (id_utilisateur, id_categorie, montant, date, commentaire) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Depense (id_utilisateur, id_categorie, montant, date, commentaire) VALUES (?, ?, ?, ?, ?)',
        [id_utilisateur, id_categorie, montant, date, commentaire],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId);
          else reject('Error inserting expense');
        },
        (_, error) => reject(error)
      );
    });
  });
};

export const getExpenses = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT Depense.id, Depense.montant, Depense.date, Depense.commentaire, Categorie.nom FROM Depense JOIN Categorie ON Depense.id_categorie = Categorie.id',
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};



export const getExpense = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT Depense.id, Depense.id_utilisateur, Depense.id_categorie, Depense.montant, Depense.date, Depense.commentaire, Categorie.nom FROM Depense JOIN Categorie ON Depense.id_categorie = Categorie.id WHERE Depense.id = ?',
        [id],
        (_, { rows }) => resolve(rows.length > 0 ? rows.item(0) : null),
        (_, error) => reject(error)
      );
    });
  });
}
export const getLimitExpense = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT id,date, SUM(montant) AS somme_motant From Depense GROUP BY date ORDER BY date DESC LIMIT 5',
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

export const getExpenseByCatId = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT Depense.id, Depense.id_utilisateur, Depense.id_categorie, Depense.montant, Depense.date, Depense.commentaire, Categorie.nom FROM Depense JOIN Categorie ON Depense.id_categorie = Categorie.id WHERE Depense.id_categorie = ?',
        [id],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
}

export const updateExpense = (id, id_utilisateur, id_categorie, montant, date, commentaire) => {
  console.log(id, id_utilisateur, id_categorie, montant, date, commentaire)
  return new Promise((resolve, reject) => {
    null
   db.transaction(tx => {
      tx.executeSql(
        'UPDATE Depense SET id_utilisateur = ?, id_categorie = ?, montant = ?, date = ?, commentaire = ? WHERE id = ?',
        [id_utilisateur, id_categorie, montant, date, commentaire, id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve();
          else reject('Error updating expense');
        },
        (_, error) => reject(error)
      );
    });
  });
};

export const deleteExpense = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM Depense WHERE id = ?',
        [id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve();
          else reject('Error deleting expense');
        },
        (_, error) => reject(error)
      );
    });
  });
};


export const createBudget = (id_utilisateur, id_categorie, montant, debut, fin, status) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Budget (id_utilisateur, id_categorie, montant, debut, fin, statut) VALUES (?, ?, ?, ?, ?, ?)',
        [id_utilisateur, id_categorie, montant, debut, fin, status],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId);
          else reject('Error inserting budget');
        },
        (_, error) => reject(error)
      );
    });
  });
};

export const updateBudget = (id, id_utilisateur, id_categorie, montant, debut, fin, status) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE Budget SET id_utilisateur = ?, id_categorie = ?, montant = ?,debut = ?, fin = ?, statut = ? WHERE id = ?',
        [id_utilisateur, id_categorie, montant, debut, fin, status, id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve();
          else reject('Error updating budget');
        },
        (_, error) => reject(error)
      );
    });
  });
};

export const updateBudgetStatut = (id, status) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE Budget SET statut = ? WHERE id = ?',
        [status, id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve();
          else reject('Error updating budget');
        },
        (_, error) => reject(error)
      );
    });
  });
};

export const deleteBudget = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM Budget WHERE id = ?',
        [id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve();
          else reject('Error deleting budget');
        },
        (_, error) => reject(error)
      );
    });
  });
};

export const getBudgets = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT Budget.id, Budget.id_categorie, Budget.debut, Budget.fin, Budget.montant,Budget.statut, Categorie.nom FROM Budget JOIN Categorie ON Budget.id_categorie = Categorie.id',
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

export const getMontantBudget = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT montant FROM Budget WHERE id_categorie = ?',
        [id],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
}

export const getSumMontantByCategory = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT Categorie.id, Categorie.nom, Depense.id_categorie, SUM(Depense.montant) AS somme_montant FROM Depense JOIN Categorie ON Depense.id_categorie = Categorie.id GROUP BY Categorie.id, Depense.id_categorie;',
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

export const getBudget = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT Budget.id, Budget.id_categorie, Budget.debut, Budget.fin,Budget.statut, Budget.montant, Categorie.nom FROM Budget JOIN Categorie ON Budget.id_categorie = Categorie.id WHERE Budget.id = ?',
        [id],
        (_, { rows }) => resolve(rows.length > 0 ? rows.item(0) : null),
        (_, error) => reject(error)
      );
    });
  });
}

export const createNotification = (id_budget, notifs, statut) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Notification ( id_budget, notifs, statut) VALUES (?, ?, ?)',
        [id_budget,notifs, statut],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId);
          else reject('Error inserting notification');
        },
        (_, error) => reject(error)
      );
    });
  });
};

export const updateNotification = (id, id_budget, notifs, statut) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE Notification SET statut = ?, id_budget = ?, notifs = ? WHERE id_message = ?',
        [statut, id_budget, notifs, id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve();
          else reject('Error updating budget');
        },
        (_, error) => reject(error)
      );
    });
  });
}

export const deletNotification = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM Notification WHERE id_message = ?',
        [id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve();
          else reject('Error deleting notif');
        },
        (_, error) => reject(error)
      );
    });
  });
};

export const getNotifications = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Notification',
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

export const getNotificationByBudgetId = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Notification WHERE id_message = ?',
        [id],
        (_, { rows }) => resolve(rows.length > 0 ? rows.item(0) : null),
        (_, error) => reject(error)
      );
    });
  });
}