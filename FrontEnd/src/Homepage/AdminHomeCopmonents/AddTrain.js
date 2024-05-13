import React, {useState} from "react";

const AddTrain = (props) => {
    const [trainName, setTrainName] = useState('');
    const [trainCapacity, setTrainCapacity] = useState('');

    const handleAddTrain = () => {
        const trainData = {
            trainName: trainName,
            capacity: trainCapacity,
        };

        fetch('http://localhost:3000/trains', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(trainData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Train Added Succesfully')
            }).then(() => {
            setTrainName('');
            setTrainCapacity('')
            props.setUpdate(prev => !prev)
        })
            .catch((error) => {
                console.error('Error:', error);
                // Handle the error scenario
            });
    };


    return (<div className="addTrain">
            <h4>Add a Train</h4>
            <div className="form-group">
                <label>Train Name:</label>
                <input
                    type="text"
                    className="form-control"
                    value={trainName}
                    onChange={(e) => setTrainName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Train Capacity:</label>
                <input
                    type="text"
                    className="form-control"
                    value={trainCapacity}
                    onChange={(e) => setTrainCapacity(e.target.value)}
                />
            </div>
            <button className="btn btn-primary mt-3" onClick={handleAddTrain}>Add Train</button>
        </div>
    )


}
export default AddTrain;
