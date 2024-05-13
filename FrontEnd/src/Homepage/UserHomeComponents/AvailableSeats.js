import React, {useState} from 'react';

const AvailableSeats = (props) => {
    const [seats, setSeats] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [criteria, setCriteria] = useState({
        time: '',
        source: '',
        destination: '',
        requiredSeats: '',
    });

    const bookSeats = (tripId) => {
        const userId = props.userId; // Replace with the actual user ID
        const seatsToBook = parseInt(criteria.requiredSeats);

        const requestBody = {
            userId,
            seats: seatsToBook,
        };

        fetch(`http://localhost:3000/trips/${tripId}/book`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data); // Handle the response as needed
            })
            .catch((error) => {
                console.error('Error booking seats:', error);
            });
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCriteria((prevCriteria) => ({...prevCriteria, [name]: value}));
    };

    const fetchAvailableSeats = () => {
        setIsLoading(true);

        const {time, source, destination, requiredSeats} = criteria;

        const formattedSource = source || 0;
        const formattedDestination = destination || 0;

        const queryParams = new URLSearchParams({
            time,
            source: formattedSource,
            destination: formattedDestination,
            requiredSeats,
        });

        fetch(`http://localhost:3000/seats?${queryParams}`)
            .then((response) => response.json())
            .then((data) => {
                setSeats(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching available seats:', error);
                setIsLoading(false);
            });
    };

    return (
        <div>
            <div className="form-group">
                <label htmlFor="time">Time:</label>
                <select
                    className="form-control"
                    id="time"
                    name="time"
                    value={criteria.time}
                    onChange={handleChange}
                >
                    <option value="">Select Time</option>
                    <option value="09:15:00">09:15 PM</option>
                    <option value="10:00:00">10:00 AM</option>
                    <option value="12:00:00">12:00 PM</option>
                    <option value="12:45:00">12:45 PM</option>
                    <option value="14:30:00">2:30 PM</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="source">Source:</label>
                <select
                    className="form-control"
                    id="source"
                    name="source"
                    value={criteria.source}
                    onChange={handleChange}
                >
                    <option value="">Select Source</option>
                    <option value={1}>Downtown, Cairo</option>
                    <option value={2}>Gleem, Alexandria</option>
                    <option value={3}>Giza Square, Giza</option>
                    <option value={4}>Luxor City, Luxor</option>
                    <option value={5}>Aswan City, Aswan</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="endStation">End Station:</label>
                <select
                    className="form-control"
                    id="endStation"
                    name="destination"
                    value={criteria.destination}
                    onChange={handleChange}
                >
                    <option value="">Select End Station</option>
                    <option value={1}>Downtown, Cairo</option>
                    <option value={2}>Gleem, Alexandria</option>
                    <option value={3}>Giza Square, Giza</option>
                    <option value={4}>Luxor City, Luxor</option>
                    <option value={5}>Aswan City, Aswan</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="requiredSeats">Required Seats:</label>
                <input
                    type="number"
                    className="form-control"
                    id="requiredSeats"
                    name="requiredSeats"
                    value={criteria.requiredSeats}
                    onChange={handleChange}
                />
            </div>

            <button className="btn btn-primary" onClick={fetchAvailableSeats} disabled={isLoading}>
                {isLoading ? 'Fetching Seats...' : 'Find Available Seats'}
            </button>

            {seats.length > 0 && (
                <div className="mt-4">
                    <h3>Available Seats</h3>
                    <ul className="list-group">
                        {seats.map((seat) => (
                            <li className="list-group-item d-flex justify-content-between align-items-center"
                                key={seat.TRIP_ID}>
                                Trip ID: {seat.TRIP_ID}, Seats: {seat.SEATS}
                                <button
                                    className="btn btn-primary ml-10"
                                    onClick={() => bookSeats(seat.TRIP_ID)}
                                >
                                    Book Seats
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AvailableSeats;
