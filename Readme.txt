Train App - README
Welcome to the Train App! This application allows you to manage train schedules and bookings. Follow the instructions below to get started.

Installation
Before running the Train App, please ensure you have the following prerequisites installed on your system:

MySQL Community Version
Node.js (including npm)
Database Setup
Install the MySQL Community Version from the official website.
Once the installation is complete, open your preferred MySQL client and create a new database.
Inside the database folder of the Train App, you will find a query file (train_app.sql). Open this file and copy its contents.
Execute the copied SQL query in your MySQL client to create the necessary database structure.
Backend Setup
Navigate to the backend folder of the Train App using a terminal or command prompt.
Run the following command to install the required dependencies:
Copy code
npm install
Open the index.js file located in the backend folder using a text editor.
Locate the database connection configuration section and modify the username and password fields with your MySQL credentials.
Save the index.js file.
In the terminal, run the following command to start the backend server:
Copy code
node index.js
Frontend Setup
Open a new terminal or command prompt.
Navigate to the frontend folder of the Train App.
Run the following command to install the required dependencies:
Copy code
npm install
Once the installation is complete, run the following command to start the frontend server:
sql
Copy code
npm start
When prompted to run the app on another local port, type 'yes' and press Enter.
Accessing the Train App
With the backend and frontend servers running, you can now access the Train App using your web browser.

Open your preferred web browser.
In the address bar, enter http://localhost:3001.
The Train App will load in your browser, allowing you to use its features for managing train schedules and bookings.
Troubleshooting
If you encounter any issues during the setup process, please ensure that you have followed all the installation steps correctly.
Make sure you have provided the correct MySQL credentials in the index.js file of the backend folder.
Verify that the MySQL Community Version is running properly on your system.
Ensure that the necessary ports are not blocked by firewalls or other security measures.
If you need further assistance or encounter any problems, please don't hesitate to contact our team.