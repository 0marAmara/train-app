import React, {useState} from "react";

const AddTrip = (props) => {
    const [trainId, setTrainId] = useState('');
    const [fareId, setFareId] = useState('');
    const [seats, setSeats] = useState(0);
    const [tripStartStation, setTripStartStation] = useState(1);
    const [tripEndStation, setTripEndStation] = useState(1);
    const [tripTime, setTripTime] = useState('09:00:00');


    const handleAddTrip = () => {

        // Create a payload object with the trip details
        const tripData = {
            trainId: trainId,
            fareId: fareId,
            seats: seats,
            time: tripTime,
            status: 'Scheduled',
            startStation: tripStartStation,
            endStation: tripEndStation
        };

        fetch('http://localhost:3000/addtrips', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tripData),
        })
            .then((response) => response.json())
            .then((data) => {
                props.setUpdate(prev => !prev)
                setFareId('')
                setSeats('')
                setTrainId('')
                setTripTime('09:00:00')
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    return (<div className="addTrip">
            <h4>Add a Trip</h4>
            <div className="form-group">
                <label>Train ID:</label>
                <input
                    type="text"
                    className="form-control"
                    value={trainId}
                    onChange={(e) => setTrainId(e.target.value)}
                />
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
                    <option value="09:00:00">9:00 AM</option>
                    <option value="12:00:00">12:00 PM</option>
                    <option value="14:30:00">2:30 PM</option>
                    <option value="12:45:00">12:45 PM</option>
                </select>
            </div>
            <button className="btn btn-primary" onClick={handleAddTrip}>
                Add Trip
            </button>
        </div>
    )
}
export default AddTrip;
