import React from "react";

const ShowAllItems = (props) => {
    return <>
        <div>
            <h4>All Trips</h4>
            <ul className="list-group">
                {props.trips.map((trip) => (
                    <li
                        key={trip.TRIP_ID + trip.START_STATION_ID + Math.random()}
                        className="list-group-item"
                    >
                        Trip ID: {trip.TRIP_ID}, Start Station: {trip.START_STATION_ID}, End Station:{' '}
                        {trip.END_STATION_ID}, Time: {trip.TIME}
                    </li>
                ))}
            </ul>

            <h4>All Trains</h4>
            <ul className="list-group">
                {props.trains.map((train) => (
                    <li key={train.TRAIN_ID} className="list-group-item">
                        Train ID: {train.TRAIN_ID}, Train Name: {train.TRAIN_NAME}, Capacity: {train.CAPACITY}
                    </li>
                ))}
            </ul>

            <h4>All Fares</h4>
            <ul className="list-group">
                {props.fares.map((fare) => (
                    <li
                        key={fare.FARE_ID + fare.AMOUNT + Math.random()}
                        className="list-group-item"
                    >
                        Fare ID: {fare.FARE_ID}, Amount: {fare.AMOUNT}
                    </li>
                ))}
            </ul>

            <h4>All Workers</h4>
            <ul className="list-group">
                {props.workers.map((worker) => (
                    <li key={worker.WORKER_ID} className="list-group-item">
                        Worker ID: {worker.WORKER_ID}, Name: {worker.WORKER_NAME}, Phone Number: {worker.PHONE_NUMBER}
                    </li>
                ))}
            </ul>
        </div>

    </>
}
export default ShowAllItems
