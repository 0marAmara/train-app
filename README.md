**Train App**
================

Welcome to the Train App!
=====================

This application allows you to manage train schedules and bookings. Follow the instructions below to get started.

**Installation**
---------------

Before running the Train App, please ensure you have the following prerequisites installed on your system:

* MySQL Community Version
* Node.js (including npm)

**Database Setup**
-----------------

### Step 1: Install MySQL Community Version

Install the MySQL Community Version from the official website.

### Step 2: Create a new database

Open your preferred MySQL client and create a new database.

### Step 3: Create database structure

 Inside the `database` folder of the Train App, you will find a query file (`train_app.sql`). Open this file and copy its contents. Execute the copied SQL query in your MySQL client to create the necessary database structure.

**Backend Setup**
-----------------

### Step 1: Navigate to the backend folder

Navigate to the `backend` folder of the Train App using a terminal or command prompt.

### Step 2: Install dependencies

Run the following command to install the required dependencies:
```bash
npm install
```
### Step 3: Configure database connection

Open the `index.js` file located in the `backend` folder using a text editor. Locate the database connection configuration section and modify the `username` and `password` fields with your MySQL credentials. Save the `index.js` file.

### Step 4: Start the backend server

In the terminal, run the following command to start the backend server:
```bash
node index.js
```

**Frontend Setup**
-----------------

### Step 1: Navigate to the frontend folder

Open a new terminal or command prompt. Navigate to the `frontend` folder of the Train App.

### Step 2: Install dependencies

Run the following command to install the required dependencies:
```bash
npm install
```
### Step 3: Start the frontend server

Once the installation is complete, run the following command to start the frontend server:
```bash
npm start
```
When prompted to run the app on another local port, type 'yes' and press Enter.

**Accessing the Train App**
-------------------------

With the backend and frontend servers running, you can now access the Train App using your web browser.

### Step 1: Open your web browser

Open your preferred web browser.

### Step 2: Access the Train App

In the address bar, enter `http://localhost:3001`. The Train App will load in your browser, allowing you to use its features for managing train schedules and bookings.

**Troubleshooting**
---------------

If you encounter any issues during the setup process, please ensure that you have followed all the installation steps correctly. Make sure you have provided the correct MySQL credentials in the `index.js` file of the backend folder. Verify that the MySQL Community Version is running properly on your system. Ensure that the necessary ports are not blocked by firewalls or other security measures. If you need further assistance or encounter any problems, please don't hesitate to contact me.
