import './Home.css';
import Axios, { AxiosError } from "axios";
import { LocationModel } from "../../../store/Models/LocationAndFollowerModel";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import LocationCard from "./LocationCard/LocationCard";
import { useEffect, useState, useRef } from "react";
import { login, updateLocationsStore, removeUser, triggeringModal } from "../../../store/Actions/actions";
import { useHistory } from "react-router-dom";
import ModalMessages from "../../AppArea/ModalMessages/ModalMessages"


const Home = () => {
  let userDetails = useSelector((state: RootStateOrAny) => state.restOfDetails);
  const locations = useSelector((state: RootStateOrAny) => state.locations);
  const history = useHistory();
  const dispatch = useDispatch();

  let isLogin: boolean = userDetails.isAdmin !== undefined ?  true : false;
  let isAdmin: boolean = userDetails.isAdmin === 1 ? true : false;
  const [isError, setIsError] = useState(false);
  const triggeringModalRef = useRef(null);

  const openModalForError = (error: AxiosError) => {
    if (error.response.status === 619 || error.response.status === 605) {
      const errorMessage = ModalMessages(error, "", () => { functionForModalRightButton() }, error.response.status)
      dispatch(triggeringModal(errorMessage))
    } else {
      const errorMessage = ModalMessages(error, "", () => { window.location.href = "http://localhost:3000/home" })
      dispatch(triggeringModal(errorMessage));
    }
    setIsError(true);
  }

  const functionForModalRightButton = () => {
    localStorage.removeItem("restOfDetails");
    delete Axios.defaults.headers.common["Authorization"];
    dispatch(removeUser());
    window.location.href = "http://localhost:3000/home";
  }

  const takingFromLocalStorage = () => {
    const userDetailsFromStorage = JSON.parse(localStorage.getItem("restOfDetails"));
    Axios.defaults.headers.common['Authorization'] = `Bearer ${userDetailsFromStorage.token}`;
    dispatch(login(userDetailsFromStorage));
    allUserLocations();
  }

  const allUserLocations = async () => {
    try {
      const result = await Axios.get<LocationModel[]>(`http://localhost:3001/locations/profile`);
      dispatch(updateLocationsStore(result.data));
    } catch (err) {
      openModalForError(err);
    }
  }
  const allLocations = async () => {
    try {
      const result = await Axios.get<LocationModel[]>("http://localhost:3001/locations");
      dispatch(updateLocationsStore(result.data));
    } catch (err) {
      openModalForError(err);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('restOfDetails') !== null) {
      takingFromLocalStorage()
    } else if (!isLogin) {
      allLocations()
    }
  }, [])

  useEffect(() => {
    if (isError === true) {
      triggeringModalRef?.current?.click();
      return setIsError(false);
    }
  }, [isError])

  return (
    <div className="Home">
      {isAdmin &&
        <div className="adding-vacation-div">
          <button type="button" className="add-btn" onClick={() => history.push("/location/add")}>
            <i className="fas fa-plus "></i>
          </button>
          <h5>Add Vacation</h5>
        </div>
      }
      <div className="location-cards">
        {locations?.map((location: LocationModel, index: number) => {
          return <LocationCard key={index} locations={locations} location={location} />
        })}
      </div>
      <button type="button" className="error-btn-modal" data-bs-toggle="modal"
        data-bs-target="#Error-Message" ref={triggeringModalRef}>
      </button>
    </div>
  );
}

export default Home

