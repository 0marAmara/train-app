import React, {useEffect} from "react";

const BookedTrains = (props) => {


    const userId = props.userId;

    useEffect(() => {
        // Fetch booked trains for the user
        fetch(`http://localhost:3000/trains/booked?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                props.setBookedTrains(data);

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [userId, props.updatedPage]);


    const handleCancelBooking = (tripId) => {
        fetch(`http://localhost:3000/trips/${tripId}/cancel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId}),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    console.error('Error cancelling trip booking:', data.error);
                    // Handle error case (e.g., show an error message)
                    return;
                }

                // Update the bookedTrains state to reflect the changes
                props.setBookedTrains((prevBookedTrains) =>
                    prevBookedTrains.filter((booking) => booking.TRAIN_ID !== tripId)
                );
            }).then(() => {
            props.setUpdatedPage(prevState => !prevState);

        })
            .catch((error) => {
                console.error('Error:', error);
                // Handle error case (e.g., show an error message)
            });
    };

    const handleShowBookedTrains = () => {
        props.setShowBookedTrains(!props.showBookedTrains);
    };

    return <>
        <button className="btn btn-primary" onClick={handleShowBookedTrains}>
            {props.showBookedTrains ? 'Hide Booked Trains' : 'Show Booked Trains'}
        </button>

        {props.showBookedTrains && (
            <div className="mt-4">
                <h2>Booked Trains</h2>
                {props.bookedTrains.length > 0 ? (
                    <ul className="list-group">
                        {props.bookedTrains.map((booking) => (
                            <li
                                key={booking.TRIP_ID + booking.TIME}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <div>
                                    <strong>Train Name:</strong> {booking.TRAIN_NAME},{' '}
                                    <strong>Status:</strong> {booking.STATUS},{' '}
                                    <strong>Time:</strong> {booking.TIME},{' '}
                                    <strong>ID:</strong> {booking.TRIP_ID}
                                </div>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleCancelBooking(booking.TRIP_ID)}
                                >
                                    Cancel Trip
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No booked trains.</p>
                )}
            </div>
        )}
    </>

}
export default BookedTrains;
