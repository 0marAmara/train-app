import React, {useState} from "react";

const EditTrain = (props) => {
    const [trainId, setTrainId] = useState('');
    const [trainName, setTrainName] = useState('');
    const [trainCapacity, setTrainCapacity] = useState('');
    if (props.trainIds[0] !== 'none') {
        props.trainIds.unshift('none')

    }
    const handleUpdateTrain = () => {
        // Create a payload object with the updated train details
        const trainData = {
            trainName: trainName,
            capacity: trainCapacity,
        };

        fetch(`http://localhost:3000/updatetrains/${trainId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(trainData),
        })
            .then((response) => response.json())
            .then((data) => {
                props.setUpdate(prev => !prev)
                setTrainCapacity('')
                setTrainId('')
                setTrainName('')
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (<div className="editTrain">
            <h4>Edit Train Details</h4>
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
            <button className="btn btn-primary mt-3" onClick={handleUpdateTrain}>
                Update Train
            </button>
        </div>
    )
}
export default EditTrain;
