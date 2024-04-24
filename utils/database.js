import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';

const db = SQLite.openDatabase('expenses.db');

export function initDB() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS Utilisateur (id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT UNIQUE, email TEXT UNIQUE, numero INTEGER UNIQUE, mot_de_passe TEXT)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS Categorie (id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT, type TEXT)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS Depense (id INTEGER PRIMARY KEY AUTOINCREMENT, id_utilisateur INTEGER, id_categorie INTEGER, montant REAL, date TEXT, commentaire TEXT, FOREIGN KEY (id_utilisateur) REFERENCES Utilisateur(id), FOREIGN KEY (id_categorie) REFERENCES Categorie(id))');
      tx.executeSql('CREATE TABLE IF NOT EXISTS Budget (id INTEGER PRIMARY KEY AUTOINCREMENT, id_utilisateur INTEGER, id_categorie INTEGER, montant REAL, periode TEXT, FOREIGN KEY (id_utilisateur) REFERENCES Utilisateur(id), FOREIGN KEY (id_categorie) REFERENCES Categorie(id))');
      tx.executeSql('CREATE TABLE IF NOT EXISTS Objectif (id INTEGER PRIMARY KEY AUTOINCREMENT, id_utilisateur INTEGER, id_categorie INTEGER, montant_cible REAL, date_limite TEXT, FOREIGN KEY (id_utilisateur) REFERENCES Utilisateur(id), FOREIGN KEY (id_categorie) REFERENCES Categorie(id))');
      tx.executeSql('CREATE TABLE IF NOT EXISTS Depense_Obj (id INTEGER PRIMARY KEY AUTOINCREMENT, id_depense INTEGER, id_objectif INTEGER, FOREIGN KEY (id_depense) REFERENCES Depense(id), FOREIGN KEY (id_objectif) REFERENCES Objectif(id))');
    }, (error) => {
      reject(`Error initializing database: ${error}`);
    }, () => {
      resolve('Databse initialized successfully');
    });
  });
}


export const resetDB = () => {
  return new Promise((resolve, reject) => {
    // Get the correct path to the database file
    const dbPath = FileSystem.documentDirectory + 'SQLite/expenses.db';

    FileSystem.deleteAsync(dbPath)
      .then(() => resolve("Database reset successfully"))
      .catch((error) => reject(error));
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



export const createCategory = (nom, type) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Categorie (nom, type) VALUES (?, ?)',
        [nom, type],
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
        'SELECT * FROM Depense',
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
        'SELECT * FROM Depense WHERE id = ?',
        [id],
        (_, { rows }) => resolve(rows.length > 0 ? rows.item(0) : null),
        (_, error) => reject(error)
      );
    });
  });
}

export const updateExpense = (id, id_utilisateur, id_categorie, montant, date, commentaire) => {
  return new Promise((resolve, reject) => {
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


export const createBudget = (id_utilisateur, id_categorie, montant, periode) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Budget (id_utilisateur, id_categorie, montant, periode) VALUES (?, ?, ?, ?)',
        [id_utilisateur, id_categorie, montant, periode],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId);
          else reject('Error inserting budget');
        },
        (_, error) => reject(error)
      );
    });
  });
};

export const updateBudget = (id, id_utilisateur, id_categorie, montant, periode) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE Budget SET id_utilisateur = ?, id_categorie = ?, montant = ?, periode = ? WHERE id = ?',
        [id_utilisateur, id_categorie, montant, periode, id],
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
        'SELECT * FROM Budget',
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
        'SELECT * FROM Budget WHERE id = ?',
        [id],
        (_, { rows }) => resolve(rows.length > 0 ? rows.item(0) : null),
        (_, error) => reject(error)
      );
    });
  });
}