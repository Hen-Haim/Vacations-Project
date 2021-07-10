import { useEffect, useState } from "react";
import "./Search.css";
import { useParams } from "react-router-dom";
import LocationCard from "../Home/LocationCard/LocationCard";
import { useSelector, RootStateOrAny } from "react-redux";
import { LocationModel } from "../../../store/Models/LocationAndFollowerModel";

const Search = () => {
    const { value } = useParams<{ value: string }>();
    let locations = useSelector((state: RootStateOrAny) => state.locations);
    const [filter, setFilter] = useState<LocationModel[]>();

    useEffect(() => {
        searching(value);
    }, [value])

    const searching = (value: string) => {
        let afterSearchLocations: LocationModel[] = locations.filter((location: LocationModel) => {
            if (location.resortName.toLowerCase().includes(`${value}`) ||
                location.destination.toLowerCase().includes(`${value}`) === true) {
                return location
            }
        })
        setFilter(afterSearchLocations)
    }

    return (
        <div className="location-cards">
            {filter?.map((location: LocationModel, index: number) => {
                return <LocationCard key={index} locations={locations} location={location} />
            })}
        </div>
    )
}

export default Search
