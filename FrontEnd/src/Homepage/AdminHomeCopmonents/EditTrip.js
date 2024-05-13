import React, {useState} from "react";

const EditTrip = (props) => {
    const [tripId, setTripId] = useState('');
    const [trainId, setTrainId] = useState('');
    const [fareId, setFareId] = useState('');
    const [seats, setSeats] = useState(0);
    const [tripStartStation, setTripStartStation] = useState('');
    const [tripEndStation, setTripEndStation] = useState('');
    const [tripTime, setTripTime] = useState('');


    const handleUpdateTrip = () => {
        // Create a payload object with the updated trip details
        const tripData = {
            trainId: trainId,
            fareId: fareId,
            seats: seats,
            time: tripTime,
            status: 'Scheduled',
            startStation: tripStartStation,
            endStation: tripEndStation
        };

        fetch(`http://localhost:3000/trips/${tripId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tripData),
        })
            .then((response) => response.json())
            .then((data) => {
                // Update the UI accordingly
                // For example, you can fetch the updated trips data to reflect the changes
                fetch('http://localhost:3000/trips/all')
                    .then((response) => response.json())
                    .then((data) => {
                        props.setTrips(data);
                        props.setUpdate(prev => !prev)
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        // Handle the error scenario
                    });
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle the error scenario
            });
    };


    return (<div className="editTrip">
            <h4>Edit Trip Details</h4>
            <div className="form-group">
                <label>Trip ID:</label>
                <select
                    className="form-control"
                    value={tripId}
                    onChange={(e) => setTripId(e.target.value)}
                >
                    {props.tripIds.map((id) => (
                        <option key={id} value={id}>
                            {id}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Train ID:</label>
                <select
                    className="form-control"
                    value={trainId}
                    onChange={(e) => setTrainId(e.target.value)}
                >
                    {props.trainIds.map((id) => (
                        <option key={id} value={id}>
                            {id}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Fare ID:</label>
                <input
                    type="text"
                    className="form-control"
                    value={fareId}
                    onChange={(e) => setFareId(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Seats:</label>
                <input
                    type="text"
                    className="form-control"
                    value={seats}
                    onChange={(e) => setSeats(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Start Station:</label>
                <select
                    className="form-control"
                    value={tripStartStation}
                    onChange={(e) => setTripStartStation(e.target.value)}
                >
                    <option value={1}>Downtown, Cairo</option>
                    <option value={2}>Gleem, Alexandria</option>
                    <option value={3}>Giza Square, Giza</option>
                    <option value={4}>Luxor City, Luxor</option>
                    <option value={5}>Aswan City, Aswan</option>
                </select>
            </div>
            <div className="form-group">
                <label>End Station:</label>
                <select
                    className="form-control"
                    value={tripEndStation}
                    onChange={(e) => setTripEndStation(e.target.value)}
                >
                    <option value={1}>Downtown, Cairo</option>
                    <option value={2}>Gleem, Alexandria</option>
                    <option value={3}>Giza Square, Giza</option>
                    <option value={4}>Luxor City, Luxor</option>
                    <option value={5}>Aswan City, Aswan</option>
                </select>
            </div>
            <div className="form-group">
                <label>Trip Time:</label>
                <select
                    className="form-control"
                    value={tripTime}
                    onChange={(e) => setTripTime(e.target.value)}
                >
                    <option value="09:15:00">09:15 PM</option>
                    <option value="10:00:00">10:00 AM</option>
                    <option value="12:00:00">12:00 PM</option>
                    <option value="12:45:00">12:45 PM</option>
                    <option value="14:30:00">2:30 PM</option>
                </select>
            </div>
            <button className="btn btn-primary" onClick={handleUpdateTrip}>
                Update Trip
            </button>
        </div>
    )
}
export default EditTrip;
