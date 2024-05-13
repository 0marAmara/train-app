const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL connection configuration
// CHANGE THIS BASED ON THE MYSQL ON YOUR MACHINE
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root123',
	database: 'traindb',
});

// Connect to the database
connection.connect((err) => {
	if (err) {
		console.error('Error connecting to the database: ', err);
		return;
	}
	console.log('Connected to the database');
});

// API routes
// Login
app.post('/login', (req, res) => {
	const { username, password } = req.body;

	// Perform authentication logic here
	// You can query the database to check if the username and password match

	// Example: Checking if the username and password match in the USERS table
	const sql = 'SELECT * FROM USERS WHERE USER_NAME = ? AND PASSWORD = ?';
	const values = [username, password];

	connection.query(sql, values, (error, results) => {
		if (error) {
			console.error('Error performing login: ', error);
			res.status(500).json({ error: 'An error occurred' });
			return;
		}

		if (results.length > 0) {
			// Authentication successful
			const userId = results[0].USER_ID;
			const email = results[0].EMAIL;
			const address = results[0].ADDRESS;
			const phoneNumber = results[0].PHONE_NUMBER;
			const role = results[0].ROLE;
			res.status(200).json({
				success: true,
				userId,
				role,
				email,
				address,
				phoneNumber,
				username,
				password,
			});
		} else {
			// Authentication failed
			res.status(401).json({ success: false });
		}
	});
});

// Sign up
app.post('/users/signup', (req, res) => {
	const { username, email, address, phoneNumber, role, password } = req.body;

	// Check if the email or username already exists in the database
	const checkExistingQuery =
		'SELECT * FROM USERS WHERE EMAIL = ? OR USER_NAME = ?';
	const checkExistingValues = [email, username];

	connection.query(checkExistingQuery, checkExistingValues, (error, results) => {
		if (error) {
			console.error('Error checking existing user:', error);
			res.status(500).json({ error: 'An error occurred' });
			return;
		}

		if (results.length > 0) {
			// User with the same email or username already exists
			res.status(409).json({ error: 'User already exists' });
		} else {
			// Insert the new user into the database
			const insertUserQuery =
				'INSERT INTO USERS (USER_NAME, EMAIL, ADDRESS, PHONE_NUMBER, ROLE, PASSWORD) VALUES (?, ?, ?, ?, ?, ?)';
			const insertUserValues = [
				username,
				email,
				address,
				phoneNumber,
				role,
				password,
			];

			connection.query(insertUserQuery, insertUserValues, (error, results) => {
				if (error) {
					console.error('Error signing up user:', error);
					res.status(500).json({ error: 'An error occurred' });
					return;
				}
				res.status(200).json({ message: 'User signed up successfully' });
			});
		}
	});
});

// Performing operations on trips: Booking
//
app.post('/trips/:tripId/book', (req, res) => {
	const tripId = req.params.tripId;
	const { userId, seats } = req.body;

	// Check if seats are available
	const checkSeatsSql = 'SELECT SEATS FROM TRIPS WHERE TRIP_ID = ?';
	connection.query(checkSeatsSql, [tripId], (error, results) => {
		if (error) {
			console.error('Error checking available seats:', error);
			res.status(500).json({ error: 'An error occurred' });
			return;
		}

		const availableSeats = results[0].SEATS;

		if (availableSeats < seats) {
			res.status(400).json({ error: 'Not enough available seats' });
			return;
		}

		// Check if the user has already booked the trip
		const checkBookingSql =
			'SELECT COUNT(*) AS count FROM BOOKS WHERE USER_ID = ? AND TRIP_ID = ?';
		connection.query(checkBookingSql, [userId, tripId], (error, results) => {
			if (error) {
				console.error('Error checking trip booking:', error);
				res.status(500).json({ error: 'An error occurred' });
				return;
			}

			const bookingCount = results[0].count;

			if (bookingCount > 0) {
				res.status(400).json({ error: 'You have already booked this trip' });
				return;
			}

			// Perform booking
			const sql = 'INSERT INTO BOOKS (USER_ID, TRIP_ID) VALUES (?, ?)';
			const values = [userId, tripId];

			connection.query(sql, values, (error, results) => {
				if (error) {
					console.error('Error booking trip:', error);
					res.status(500).json({ error: 'An error occurred' });
					return;
				}

				// Update available seats
				const updateSeatsSql =
					'UPDATE TRIPS SET SEATS = SEATS - ? WHERE TRIP_ID = ?';
				connection.query(updateSeatsSql, [seats, tripId], (error, results) => {
					if (error) {
						console.error('Error updating available seats:', error);
						res.status(500).json({ error: 'An error occurred' });
						return;
					}

					res.status(200).json({ message: 'Trip booked successfully' });
				});
			});
		});
	});
});

// Performing operations on trips: Canceling
//
app.post('/trips/:tripId/cancel', (req, res) => {
	const tripId = req.params.tripId;
	const { userId } = req.body;

	// Check if trip is booked by the user
	const checkBookingSql =
		'SELECT * FROM BOOKS WHERE USER_ID = ? AND TRIP_ID = ?';
	connection.query(checkBookingSql, [userId, tripId], (error, results) => {
		if (error) {
			console.error('Error checking trip booking: ', error);
			res.status(500).json({ error: 'An error occurred' });
			return;
		}

		if (results.length === 0) {
			res.status(400).json({ error: 'Trip is not booked by the user' });
			return;
		}

		// Cancel the booking
		const cancelBookingSql =
			'DELETE FROM BOOKS WHERE USER_ID = ? AND TRIP_ID = ?';
		connection.query(cancelBookingSql, [userId, tripId], (error, results) => {
			if (error) {
				console.error('Error canceling trip booking: ', error);
				res.status(500).json({ error: 'An error occurred' });
				return;
			}

			// Update available seats
			const updateSeatsSql =
				'UPDATE TRIPS SET SEATS = SEATS + 1 WHERE TRIP_ID = ?';
			connection.query(updateSeatsSql, [tripId], (error, results) => {
				if (error) {
					console.error('Error updating available seats: ', error);
					res.status(500).json({ error: 'An error occurred' });
					return;
				}

				res.status(200).json({ message: 'Trip canceled successfully' });
			});
		});
	});
});

// Fetching trips on a route with filters
//
app.get('/trips', (req, res) => {
	const { startStationId, endStationId, time, status } = req.query;

	// Construct the SQL query based on the provided filters
	let sql = `
      SELECT TRIPS.TRIP_ID, TRAINS.TRAIN_NAME, TRIPS.TIME, TRIPS.STATUS
      FROM TRIPS
      INNER JOIN TRAINS ON TRIPS.TRAIN_ID = TRAINS.TRAIN_ID
      INNER JOIN PASSES_THROUGH ON TRIPS.TRIP_ID = PASSES_THROUGH.TRIP_ID
      WHERE 1=1
    `;
	const values = [];

	// Add optional filters to the SQL query
	if (startStationId !== '0') {
		sql += ' AND PASSES_THROUGH.START_STATION_ID = ?';
		values.push(startStationId);
	}

	if (endStationId !== '0') {
		sql += ' AND PASSES_THROUGH.END_STATION_ID = ?';
		values.push(endStationId);
	}

	if (time !== '0') {
		sql += ' AND TRIPS.TIME = ?';
		values.push(time);
	}

	if (status !== '0') {
		sql += ' AND TRIPS.STATUS = ?';
		values.push(status);
	}

	connection.query(sql, values, (error, results) => {
		if (error) {
			console.error('Error fetching trips: ', error);
			res.status(500).json({ error: 'An error occurred' });
			return;
		}
		res.status(200).json(results);
	});
});

// Fetching all trips with start and end station details
//
app.get('/trips/all', (req, res) => {
	const sql = `
      SELECT TRIPS.TRIP_ID,TRIPS.TIME, PASSES_THROUGH.START_STATION_ID, PASSES_THROUGH.END_STATION_ID 
      FROM TRIPS,PASSES_THROUGH
      WHERE TRIPS.TRIP_ID = PASSES_THROUGH.TRIP_ID
    `;

	connection.query(sql, (error, results) => {
		if (error) {
			console.error('Error fetching trips: ', error);
			res.status(500).json({ error: 'An error occurred' });
			return;
		}
		res.status(200).json(results);
	});
});

// Fetching all fares
//
app.get('/fares/all', (req, res) => {
	const sql = `
    SELECT FARE_ID,AMOUNT from FARES
    `;

	connection.query(sql, (error, results) => {
		if (error) {
			console.error('Error fetching fares: ', error);
			res.status(500).json({ error: 'An error occurred' });
			return;
		}
		res.status(200).json(results);
	});
});

// Fetching all workers
//
app.get('/workers/all', (req, res) => {
	const sql = `
    SELECT * from WORKERS
    `;

	connection.query(sql, (error, results) => {
		if (error) {
			console.error('Error fetching fares: ', error);
			res.status(500).json({ error: 'An error occurred' });
			return;
		}
		res.status(200).json(results);
	});
});

// Fetching all trains
//
app.get('/trains/all', (req, res) => {
	const sql = 'SELECT * FROM TRAINS';

	connection.query(sql, (error, results) => {
		if (error) {
			console.error('Error fetching trains: ', error);
			res.status(500).json({ error: 'An error occurred' });
			return;
		}
		res.status(200).json(results);
	});
});

// Fetching booked trains for a user
//
app.get('/trains/booked', (req, res) => {
	const { userId } = req.query;

	// Retrieve the booked trains for the user with the given userId
	const sql = `
        SELECT TRIPS.TRIP_ID, TRAINS.TRAIN_NAME, TRIPS.TIME, TRIPS.STATUS
        FROM TRIPS
        INNER JOIN BOOKS ON TRIPS.TRIP_ID = BOOKS.TRIP_ID
        INNER JOIN TRAINS ON TRIPS.TRAIN_ID = TRAINS.TRAIN_ID
        WHERE BOOKS.USER_ID = ?
    `;
	const values = [userId];

	connection.query(sql, values, (error, results) => {
		if (error) {
			console.error('Error fetching booked trains: ', error);
			res.status(500).json({ error: 'An error occurred' });
			return;
		}
		res.status(200).json(results);
	});
});

// Updating a user's details
//
app.put('/users/:userId', (req, res) => {
	const userId = req.params.userId;
	const { username, email, address, phoneNumber } = req.body;

	const sql =
		'UPDATE USERS SET USER_NAME = ?, EMAIL = ?, ADDRESS = ?, PHONE_NUMBER = ? WHERE USER_ID = ?';
	const values = [username, email, address, phoneNumber, userId];

	connection.query(sql, values, (error, results) => {
		if (error) {
			console.error('Error updating user: ', error);
			res.status(500).json({ error: 'An error occurred' });
			return;
		}
		res.status(200).json({ message: 'User updated successfully' });
	});
});

// Route to delete a user

// DELETE /users/:userId
app.delete('/users/:userId', (req, res) => {
	const userId = req.params.userId;

	// Delete the user from the database
	const deleteUserSql = 'DELETE FROM USERS WHERE USER_ID = ?';
	connection.query(deleteUserSql, [userId], (error, results) => {
		if (error) {
			console.error('Error deleting user: ', error);
			res.status(500).json({ error: 'An error occurred' });
			return;
		}
		res.status(200).json({ message: 'User deleted successfully' });
	});
});

// Adding a train
//
app.post('/trains', (req, res) => {
	const { trainName, capacity } = req.body;

	const sql = 'INSERT INTO TRAINS (TRAIN_NAME, CAPACITY) VALUES (?, ?)';
	const values = [trainName, capacity];

	connection.query(sql, values, (error, results) => {
		if (error) {
			console.error('Error adding train: ', error);
			res.status(500).json({ error: 'An error occurred' });
			return;
		}
		res.status(200).json({ message: 'Train added successfully' });
	});
});

// Route to edit a train
//
app.put('/updatetrains/:id', (req, res) => {
	const trainId = req.params.id;
	const { trainName, capacity } = req.body;

	const sql =
		'UPDATE trains SET TRAIN_NAME = ?, CAPACITY = ? WHERE TRAIN_ID = ?';

	connection.query(sql, [trainName, capacity, trainId], (err, result) => {
		if (err) {
			console.error('Error updating train details:', err);
			res.status(500).json({ error: 'Failed to update train details' });
		} else {
			res.json({ message: 'Train details updated successfully' });
		}
	});
});

// Adding a trip
//
app.post('/addtrips', (req, res) => {
	const { trainId, fareId, seats, time, status, startStation, endStation } =
		req.body;

	const sql =
		'INSERT INTO TRIPS (TRAIN_ID, FARE_ID, SEATS, TIME, STATUS) VALUES (?, ?, ?, ?, ?)';
	const values = [trainId, fareId, seats, time, status];

	connection.query(sql, values, (error, results) => {
		if (error) {
			console.error('Error adding trip: ', error);
			res.status(500).json({ error: 'An error occurred' });
			return;
		}

		const tripId = results.insertId;

		const passesThroughSql =
			'INSERT INTO PASSES_THROUGH (END_STATION_ID, START_STATION_ID, TRIP_ID) VALUES (?, ?, ?)';
		const passesThroughValues = [endStation, startStation, tripId];

		connection.query(passesThroughSql, passesThroughValues, (error, results) => {
			if (error) {
				console.error('Error adding trip to PASSES_THROUGH table: ', error);
				res.status(500).json({ error: 'An error occurred' });
				return;
			}

			res.status(200).json({ message: 'Trip added successfully' });
		});
	});
});

// Updating a trip details (by admin)
//
app.put('/trips/:tripId', (req, res) => {
	const tripId = req.params.tripId;
	const { trainId, fareId, seats, time, status, startStation, endStation } =
		req.body;

	const updateTripSql =
		'UPDATE TRIPS SET TRAIN_ID = ?, FARE_ID = ?, SEATS = ?, TIME = ?, STATUS = ? WHERE TRIP_ID = ?';
	const updatePassesThroughSql =
		'UPDATE PASSES_THROUGH SET START_STATION_ID = ?, END_STATION_ID = ? WHERE TRIP_ID = ?';
	const tripValues = [trainId, fareId, seats, time, status, tripId];
	const passesThroughValues = [startStation, endStation, tripId];

	connection.beginTransaction((error) => {
		if (error) {
			console.error('Error beginning transaction: ', error);
			res.status(500).json({ error: 'An error occurred' });
			return;
		}

		connection.query(updateTripSql, tripValues, (error, tripResults) => {
			if (error) {
				connection.rollback(() => {
					console.error('Error updating trip: ', error);
					res.status(500).json({ error: 'An error occurred' });
				});
				return;
			}

			connection.query(
				updatePassesThroughSql,
				passesThroughValues,
				(error, passesThroughResults) => {
					if (error) {
						connection.rollback(() => {
							console.error('Error updating passes through: ', error);
							res.status(500).json({ error: 'An error occurred' });
						});
						return;
					}

					connection.commit((error) => {
						if (error) {
							connection.rollback(() => {
								console.error('Error committing transaction: ', error);
								res.status(500).json({ error: 'An error occurred' });
							});
							return;
						}

						res
							.status(200)
							.json({ message: 'Trip and passes through updated successfully' });
					});
				},
			);
		});
	});
});

// Showing a list of available seats that satisfy certain criteria
app.get('/seats', (req, res) => {
	const { time, source, destination, requiredSeats } = req.query;

	let sql = `
	  SELECT TRIP_ID, SEATS
	  FROM TRIPS
	  WHERE TIME = ? AND STATUS = 'Scheduled'
		AND TRIP_ID IN (
		  SELECT TRIP_ID
		  FROM PASSES_THROUGH
		  WHERE 1 = 1
	`;

	let values = [time];

	// Check if source is provided
	if (source && source !== '0') {
		sql += 'AND START_STATION_ID = ? ';
		values.push(source);
	}

	// Check if destination is provided
	if (destination && destination !== '0') {
		sql += 'AND END_STATION_ID = ? ';
		values.push(destination);
	}

	sql += ') AND SEATS >= ?';

	values.push(requiredSeats);

	connection.query(sql, values, (error, results) => {
		if (error) {
			console.error('Error fetching available seats: ', error);
			res.status(500).json({ error: 'An error occurred' });
			return;
		}
		res.status(200).json(results);
	});
});

// Fetching the three most profitable trips
app.get('/report/profitable-trips', (req, res) => {
	const sql = `
	  SELECT TRIPS.TRIP_ID, TRIPS.SEATS, TRAINS.CAPACITY, FARES.AMOUNT
	  FROM TRIPS
	  INNER JOIN TRAINS ON TRIPS.TRAIN_ID = TRAINS.TRAIN_ID
	  INNER JOIN FARES ON TRIPS.FARE_ID = FARES.FARE_ID
	  ORDER BY (TRAINS.CAPACITY-TRIPS.SEATS) * FARES.AMOUNT DESC
	  LIMIT 3
	`;

	connection.query(sql, (error, results) => {
		if (error) {
			console.error('Error fetching profitable trips:', error);
			res.status(500).json({ error: 'An error occurred' });
			return;
		}

		res.status(200).json(results);
	});
});

// Start the server
app.listen(3000, () => {
	console.log('Server started on port 3000');
});
