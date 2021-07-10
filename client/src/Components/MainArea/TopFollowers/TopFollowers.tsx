import "./TopFollowers.css";
import LocationCard from "../Home/LocationCard/LocationCard";
import { useSelector, RootStateOrAny } from "react-redux";
import { LocationModel } from "../../../store/Models/LocationAndFollowerModel";

const TopFollowers = () => {
    const locations = useSelector((state: RootStateOrAny) => state.locations);
    let newLocations = locations.sort(function (locationA: LocationModel, locationB: LocationModel) {
        return locationB.numOfFollowers - locationA.numOfFollowers
    });

    return (
        <div className="location-cards">
            {newLocations?.map((location: LocationModel, index: number) => {
                return <LocationCard key={index} locations={newLocations} location={location} />
            })}
        </div>
    )
}

export default TopFollowers
