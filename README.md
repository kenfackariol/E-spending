# Expense Management API

## Overview
This is an API server built using Express.js for managing expenses, categories, and budgets. It includes features such as user management, automatic budget status updates, and notification processing.

## Features
* User Management: Create, update, retrieve, and delete users.
* Category Management: Create, update, retrieve, and delete categories.
* Expense Management: Create, update, retrieve, and delete expenses.
* Budget Status Automation: Automatically update budget statuses daily.
* Notifications: Process budget notifications hourly and send alerts.
* Database Seeding: Initialize categories from a JSON file.

## Getting Started

### Prerequisites
* Node.js (>= 14.x)
* npm

### Installation
```
git clone <repository_url>
npm install
```

### Running the Server
```
node server.js
```
The server will be running at `http://localhost:3000`.

### API Endpoints
```

#### User Management
- **Create a User**
  ```bash
  POST /users
  ```
  **Body:**
  ```json
  {
    "nom": "John Doe",
    "email": "john@example.com",
    "numero": 1234567890,
    "mot_de_passe": "password"
  }
  ```
- **Update a User**
  ```bash
  PUT /users/:id
  ```
  **Body:**
  ```json
  {
    "nom": "Jane Doe",
    "email": "jane@example.com",
    "numero": 9876543210,
    "mot_de_passe": "newpassword"
  }
  ```
- **Delete a User**
  ```bash
  DELETE /users/:id
  ```
- **Get All Users**
  ```bash
  GET /users
  ```
- **Get a User by ID**
  ```bash
  GET /users/:id
  ```
- **Check User Credentials**
  ```bash
  POST /users/check
  ```
  **Body:**
  ```json
  {
    "nom": "John Doe",
    "mot_de_passe": "password"
  }
  ```
- **Get User by Email**
  ```bash
  GET /users/email/:email
  ```
- **Get User by Username**
  ```bash
  GET /users/username/:nom
  ```
- **Get User by Phone Number**
  ```bash
  GET /users/phone/:numero
  ```

#### Category Management
- **Create a Category**
  ```bash
  POST /categories
  ```
  **Body:**
  ```json
  {
    "nom": "Groceries"
  }
  ```
- **Update a Category**
  ```bash
  PUT /categories/:id
  ```
  **Body:**
  ```json
  {
    "nom": "Food"
  }
  ```
- **Delete a Category**
  ```bash
  DELETE /categories/:id
  ```
- **Get All Categories**
  ```bash
  GET /categories
  ```
- **Get a Category by ID**
  ```bash
  GET /categories/:id
  ```

#### Expense Management
- **Create an Expense**
  ```bash
  POST /expenses
  ```
  **Body:**
  ```json
  {
    "id_utilisateur": 1,
    "id_categorie": 1,
    "montant": 50,
    "date": "2024-05-14",
    "commentaire": "Lunch"
  }
  ```
- **Update an Expense**
  ```bash
  PUT /expenses/:id
  ```
  **Body:**
  ```json
  {
    "id_utilisateur": 1,
    "id_categorie": 1,
    "montant": 60,
    "date": "2024-05-14",
    "commentaire": "Dinner"
  }
  ```
- **Delete an Expense**
  ```bash
  DELETE /expenses/:id
  ```
- **Get All Expenses**
  ```bash
  GET /expenses
  ```
- **Get an Expense by ID**
  ```bash
  ```bash
  GET /expenses/:id
  ```
- **Get Limited Expenses (Last 5)**
  ```bash
  GET /expenses/limit/recent
  ```
- **Get Expenses by Category ID**
  ```bash
  GET /expenses/category/:id
  ```

#### Budget Automation & Notifications
- **Update Budget Status Automatically**
  ```bash
  GET /update-budget-status
  ```
  Updates budget status daily at midnight via the scheduler.

- **Process Notifications Automatically**
  ```bash
  GET /process-notifications
  ```
  Processes budget notifications hourly via the scheduler.

### Database Seeding
The project includes a seeding mechanism to initialize categories.

- **Seeding Categories**
  The `initCategories` function in `seeds.js` uses the `categorie.json` file to initialize categories. It is automatically invoked when the `/init` endpoint is called.

### Scheduler
The scheduler uses `node-cron` to run tasks periodically.

- **Update Budget Status**: Runs daily at midnight.
- **Process Notifications**: Runs hourly.

### Logs
Logging is handled via the `winston` library.

- **Logs Files**
  - `error.log`: Contains error logs.
  - `combined.log`: Contains all logs.

### Example Logs Output

**error.log**
```
2024-05-14 15:00:00 [ERROR]: Error processing notifications: Some error message
```

**combined.log**
```
2024-05-14 00:00:00 [INFO]: Running updateBudgetStatutAuto...
2024-05-14 00:00:00 [INFO]: updateBudgetStatutAuto completed successfully.
2024-05-14 01:00:00 [INFO]: Running processNotifications...
2024-05-14 01:00:00 [INFO]: processNotifications completed successfully.
2024-05-14 02:00:00 [INFO]: Running processNotifications...
2024-05-14 02:00:00 [ERROR]: Error processing notifications: Some error message
```

### How to Test the API
- **Initialize Database and Seed Categories**:
  ```bash
  curl http://localhost:3000/init
  ```
- **Create a User**:
  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"nom":"John Doe","email":"john@example.com","numero":1234567890,"mot_de_passe":"password"}' http://localhost:3000/users
  ```
- **Get All Users**:
  ```bash
  curl http://localhost:3000/users
  ```

### Dependencies
1. **Node.js** (>= 14.x)
2. **npm**

### Installation
1. Clone the repository:
    ```bash
    git clone <repository_url>
    ```
2. Install dependencies:
    ```bash
    npm install
    ```

### Running the Server
1. Start the server:
    ```bash
    node server.js
    ```
2. The server will be running at `http://localhost:3000`.

### Dependencies Used
- **express**: Web framework for building the API.
- **body-parser**: Middleware to handle JSON and URL-encoded data.
- **sqlite3**: SQLite database package for Node.js.
- **node-cron**: Scheduling library for running periodic tasks.
- **winston**: Logging library for error and information logs.

### Authors
- Your Name

### License
This project is licensed under the MIT License.
```

### Summary
- The `README.md` file provides an overview of the project and guides the user on how to set up and run the API.
- Make sure the project structure and API endpoints match the `README.md` contents.