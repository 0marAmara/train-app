import React, {useEffect, useState} from 'react';
import AddTrain from "./AdminHomeCopmonents/AddTrain";
import EditTrain from "./AdminHomeCopmonents/EditTrain";
import AddTrip from "./AdminHomeCopmonents/AddTrip";
import EditTrip from "./AdminHomeCopmonents/EditTrip";
import ShowAllItems from "./AdminHomeCopmonents/ShowAllItems";
import ProfitableTripsReport from "./AdminHomeCopmonents/ProfitableTripsReport";

const AdminHome = () => {
    const [update, setUpdate] = useState(false);
    const [trains, setTrains] = useState([]);
    const [trips, setTrips] = useState([]);
    const [fares, setFares] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [trainIds, setTrainIds] = useState([]);
    const [tripIds, setTripIds] = useState([]);


    useEffect(() => {
        const url = new URL('http://localhost:3000/trips/all');
        url.searchParams.append('startStationId', '0');
        url.searchParams.append('endStationId', '0');
        url.searchParams.append('time', '0');
        url.searchParams.append('status', '0');

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setTrips(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [update]);

    useEffect(() => {
        const fetchTrains = async () => {
            try {
                const response = await fetch('http://localhost:3000/trains');
                const data = await response.json();
                setTrains(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchTrains();
    }, [update]);


    useEffect(() => {
        const fetchFares = async () => {
            try {
                const response = await fetch('http://localhost:3000/fares/all');
                const data = await response.json();
                setFares(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchFares();
    }, [update]);

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const response = await fetch('http://localhost:3000/workers/all');
                const data = await response.json();
                setWorkers(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchWorkers();
    }, [update]);

    useEffect(() => {
        const fetchTrains = async () => {
            try {
                const response = await fetch('http://localhost:3000/trains/all');
                const data = await response.json();
                setTrains(data);

                const sortedTrainIds = data.map((train) => train.TRAIN_ID).sort((a, b) => a - b);
                setTrainIds(sortedTrainIds);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchTrains();
    }, [update]);

    useEffect(() => {
        const url = new URL('http://localhost:3000/trips/all');
        url.searchParams.append('startStationId', '0');
        url.searchParams.append('endStationId', '0');
        url.searchParams.append('time', '0');
        url.searchParams.append('status', '0');

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setTrips(data);

                const sortedTripIds = data.map((trip) => trip.TRIP_ID).sort((a, b) => a - b);
                setTripIds(sortedTripIds);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [update]);


    return (

        <div className="container">
            <h3>Welcome, Admin</h3>

            <div className="row">
                <div className="col-md-6">
                    <AddTrain setUpdate={setUpdate}/>
                </div>
                <div className="col-md-6">
                    <EditTrain trainIds={trainIds} setUpdate={setUpdate}/>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-6">
                    <AddTrip setUpdate={setUpdate}/>
                </div>
                <div className="col-md-6">
                    <EditTrip setTrips={setTrips} tripIds={tripIds} trainIds={trainIds} setUpdate={setUpdate}/>
                </div>
            </div>

            <div className="mt-4">
                <ShowAllItems trains={trains} trips={trips} fares={fares} workers={workers}/>
            </div>
            <ProfitableTripsReport/>

        </div>
    );
};

export default AdminHome;
