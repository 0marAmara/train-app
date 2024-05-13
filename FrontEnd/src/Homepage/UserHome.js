import React, {useState} from 'react';
import BookedTrains from "./UserHomeComponents/BookedTrains";
import SearchTrips from "./UserHomeComponents/SearchTrips";
import EditUserDetails from "./UserHomeComponents/EditUserDetails";
import AvailableSeats from "./UserHomeComponents/AvailableSeats";

const UserHome = (props) => {
    const {userId} = props;
    const [bookedTrains, setBookedTrains] = useState([]);
    const [showBookedTrains, setShowBookedTrains] = useState(false);

    const [updatedPage, setUpdatedPage] = useState(false);


    const handleShowBookedTrains = () => {
        setShowBookedTrains(!showBookedTrains);
    };


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
                    return;
                }

                setBookedTrains((prevBookedTrains) =>
                    prevBookedTrains.filter((booking) => booking.TRAIN_ID !== tripId)
                );
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    return (

        <div className="container m-5">
            <h3>Hello, {props.user.username}</h3>

            <div className="mt-4">
                <EditUserDetails userId={userId} user={props.user} setUser={props.setUser}/>
            </div>

            <div className="mt-4">
                <SearchTrips userId={userId} updatedPage={updatedPage} setUpdatedPage={setUpdatedPage}/>
            </div>

            <div className="mt-4">
                <BookedTrains
                    userId={userId}
                    setBookedTrains={setBookedTrains}
                    setShowBookedTrains={setShowBookedTrains}
                    bookedTrains={bookedTrains}
                    showBookedTrains={showBookedTrains}
                    updatedPage={updatedPage}
                    setUpdatedPage={setUpdatedPage}
                />
            </div>
            <AvailableSeats userId={props.userId}/>
        </div>
    );
};

export default UserHome;
