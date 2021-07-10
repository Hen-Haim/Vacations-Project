import "./Statistics.css";
import { useSelector, RootStateOrAny } from "react-redux";
import { LocationModel } from "../../../store/Models/LocationAndFollowerModel";
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';


const Statistics = () => {
    const [horizontalLineUpdate, setHorizontalLineUpdate] = useState([]);
    const [verticalLineUpdate, setVerticalLineUpdate] = useState([]);
    const locations = useSelector((state: RootStateOrAny) => state.locations);

    useEffect(() => {
        const onlyFollowedLocations = locations.filter((location: LocationModel) => location.numOfFollowers !== 0);
        let horizontalLine = onlyFollowedLocations.map((location: LocationModel) => location.resortName)
        let verticalLine = onlyFollowedLocations.map((location: LocationModel) => location.numOfFollowers)
        setVerticalLineUpdate(verticalLine);
        setHorizontalLineUpdate(horizontalLine);
    }, [locations])

    const data = {
        labels: horizontalLineUpdate,
        datasets: [{
            label: 'Followers',
            data: verticalLineUpdate,
            backgroundColor: [
                'rgba(1, 102, 94, 0.5)',
                'rgba(0, 60, 48, 0.5)',
                'rgba(84, 48, 5, 0.5)',
                'rgba(140, 81, 10, 0.5)',
                'rgba(191, 129, 45, 0.5)',
                'rgba(223, 194, 125, 0.5)',
                'rgba(246, 232, 195, 0.6)',
                'rgba(199, 234, 229, 0.8)',
                'rgba(128, 205, 193, 0.6)',
                'rgba(53, 151, 143, 0.5)',
            ],
            borderColor: [
                'rgba(1, 102, 94, 1)',
                'rgba(0, 60, 48, 1)',
                'rgba(84, 48, 5, 1)',
                'rgba(140, 81, 10, 1)',
                'rgba(191, 129, 45, 1)',
                'rgba(223, 194, 125, 1)',
                'rgba(223, 194, 125, 1)',
                'rgba(128, 205, 193, 1)',
                'rgba(128, 205, 193, 1)',
                'rgba(53, 151, 143, 1)',
            ],
            borderWidth: 1,
        },],
    };

    return (
        <div className="Statistics">
            <div className='header'>
                <h2 className='title'>Number Of Followers For Each Followed Vacation</h2>
            </div>
            <h6 className="num-of-followers-h6">Number Of Followers</h6>
            <h6 className="resorts-names">Resorts Names</h6>
            <Bar data={data} />
        </div>)
};

export default Statistics;
