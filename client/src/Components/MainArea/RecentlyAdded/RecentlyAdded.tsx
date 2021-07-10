import "./RecentlyAdded.css"
import LocationCard from "../Home/LocationCard/LocationCard";
import { LocationModel } from "../../../store/Models/LocationAndFollowerModel";
import { useSelector, RootStateOrAny } from "react-redux";


const RecentlyAdded = () => {
    const locations = useSelector((state: RootStateOrAny) => state.locations);
    let newLocations = locations.sort(function (locationA: LocationModel, locationB: LocationModel) {
        return +locationB.id - +locationA.id;
    });

    return (
        <div className="location-cards">
            {newLocations?.map((location: LocationModel, index: number) => {
                return <LocationCard key={index} locations={newLocations} location={location} />
            })}
        </div>
    )
}

export default RecentlyAdded
