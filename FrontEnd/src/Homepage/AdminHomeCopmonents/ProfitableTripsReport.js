import React, {useState} from 'react';

const ProfitableTripsReport = () => {
    const [trips, setTrips] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const generateReport = () => {
        setIsLoading(true);

        fetch('http://localhost:3000/report/profitable-trips')
            .then((response) => response.json())
            .then((data) => {
                setTrips(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching profitable trips:', error);
                setIsLoading(false);
            });
    };

    return (
        <div className='mt-5'>
            <button className="btn btn-primary" onClick={generateReport} disabled={isLoading}>
                {isLoading ? 'Generating Report...' : 'Generate Report'}
            </button>

            {trips.length > 0 && (
                <div className="mt-4">
                    <h3>Top 3 Profitable Trips</h3>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Trip ID</th>
                            <th>Seats</th>
                            <th>Capacity</th>
                            <th>Fare Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        {trips.map((trip) => (
                            <tr key={trip.TRIP_ID}>
                                <td>{trip.TRIP_ID}</td>
                                <td>{trip.SEATS}</td>
                                <td>{trip.CAPACITY}</td>
                                <td>{trip.AMOUNT}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ProfitableTripsReport;
