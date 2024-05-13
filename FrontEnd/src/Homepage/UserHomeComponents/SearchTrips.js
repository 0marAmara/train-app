import React, {useState} from "react";

const SearchTrips = (props) => {
    const [selectedStatus, setSelectedStatus] = useState(0);
    const [selectedTime, setSelectedTime] = useState(0);
    const [selectedStartStation, setSelectedStartStation] = useState(0);
    const [selectedEndStation, setSelectedEndStation] = useState(0);
    const [searchResults, setSearchResults] = useState([]);

    const handleFilterChange = (event) => {
        const {name, value} = event.target;

        if (name === 'startStation') {
            setSelectedStartStation(value);
        } else if (name === 'endStation') {
            setSelectedEndStation(value);
        } else if (name === 'status') {
            setSelectedStatus(value);
        } else if (name === 'time') {
            setSelectedTime(value);
        }
    };
    const handleSearchTrips = () => {
        const url = new URL('http://localhost:3000/trips');
        url.searchParams.append('startStationId', selectedStartStation);
        url.searchParams.append('endStationId', selectedEndStation);
        url.searchParams.append('time', selectedTime);
        url.searchParams.append('status', selectedStatus);

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setSearchResults(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleBookTrip = (tripId) => {
        const bookingData = {
            userId: props.userId,
            seats: 1,
        };

        fetch(`http://localhost:3000/trips/${tripId}/book`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    if (data.error === 'You have already booked this trip') {
                        console.log('You have already booked this trip');
                    } else {
                        console.error('Error booking trip:', data.error);
                    }
                } else {
                }
            }).then(() => {
            props.setUpdatedPage(prevState => !prevState)
        })
            .catch((error) => {
                console.error('Error:', error);
            });

    };


    return <>
        <div className="form-group">
            <label>Start Station:</label>
            <select
                name="startStation"
                value={selectedStartStation}
                onChange={handleFilterChange}
                className="form-control"
            >
                <option value={0}>All</option>
                <option value={1}>Cairo Central Station</option>
                <option value={2}>Alexandria Station</option>
                <option value={3}>Giza Station</option>
                <option value={4}>Luxor Station</option>
                <option value={5}>Aswan Station</option>
            </select>
        </div>

        <div className="form-group">
            <label>End Station:</label>
            <select
                name="endStation"
                value={selectedEndStation}
                onChange={handleFilterChange}
                className="form-control"
            >
                <option value={0}>All</option>
                <option value={1}>Downtown, Cairo</option>
                <option value={2}>Gleem, Alexandria</option>
                <option value={3}>Giza Square, Giza</option>
                <option value={4}>Luxor City, Luxor</option>
                <option value={5}>Aswan City, Aswan</option>
            </select>
        </div>

        <div className="form-group">
            <label>Status:</label>
            <select
                name="status"
                value={selectedStatus}
                onChange={handleFilterChange}
                className="form-control"
            >
                <option value={0}>All</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
            </select>
        </div>

        <div className="form-group">
            <label>Time:</label>
            <select
                name="time"
                value={selectedTime}
                onChange={handleFilterChange}
                className="form-control"
            >
                <option value={0}>Anytime</option>
                <option value="09:15:00">09:15 PM</option>
                <option value="10:00:00">10:00 AM</option>
                <option value="12:00:00">12:00 PM</option>
                <option value="12:45:00">12:45 PM</option>
                <option value="14:30:00">2:30 PM</option>
            </select>
        </div>

        <button className="btn btn-primary" onClick={handleSearchTrips}>
            Search for Trips
        </button>

        {searchResults.length > 0 && (
            <div className="mt-4">
                <h2>Search Results</h2>
                <ul className="list-group">
                    {searchResults.map((trip) => (
                        <li
                            key={trip.TRIP_ID + Math.random()}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <div>
                                <strong>Train Name:</strong> {trip.TRAIN_NAME},{' '}
                                <strong>Status:</strong> {trip.STATUS},{' '}
                                <strong>Time:</strong> {trip.TIME},{' '}
                                <strong>Id:</strong> {trip.TRIP_ID}
                            </div>
                            <button
                                className="btn btn-primary"
                                onClick={() => handleBookTrip(trip.TRIP_ID)}
                            >
                                Book Trip
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </>


}
export default SearchTrips;
