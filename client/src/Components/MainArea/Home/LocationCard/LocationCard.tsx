import "./LocationCard.css";
import { LocationModel, FollowerModel } from "../../../../store/Models/LocationAndFollowerModel";
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import Axios, { AxiosError } from "axios";
import { updateLocationsStore, triggeringModal, removeUser } from "../../../../store/Actions/actions";
import { useHistory } from "react-router-dom";
import ModalMessages from "../../../AppArea/ModalMessages/ModalMessages"

interface LocationCardProps {
    location: LocationModel;
    locations?: LocationModel[];
}

const LocationCard: React.FC<LocationCardProps> = ({ locations, location }) => {
    let userDetails = useSelector((state: RootStateOrAny) => state.restOfDetails);
    const triggeringModalRef = useRef(null);

    const history = useHistory();
    const dispatch = useDispatch();
    let isLogin: boolean = userDetails.isAdmin !== undefined ?  true : false;
    let isAdmin: boolean = userDetails.isAdmin === 1 ? true : false;

    function toggleFollowButton(locationId: number | string) {
        location.userId === 1 ? removeFollow(locationId) : addFollow(locationId)
    }

    const [dataBsTarget, setDataBsTarget] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);

    useEffect(() => {
        if (isSuccess === true ) {
            setTimeout(() => {
                setDataBsTarget("#Success");
                triggeringModalRef?.current?.click();
                return setIsSuccess(false)
            }, 500);
        }
        if (isDelete === true) {
            triggeringModalRef?.current?.click();
            return setIsDelete(false)
        }
        if (isError === true) {
            setTimeout(() => {
                triggeringModalRef?.current?.click();
                return setIsError(false);
            }, 200)
        }
    }, [isError, isDelete, isSuccess])

    const openModalForDelete = (idForDelete: number | string) => {
        const deleteMessage = ModalMessages("DELETE", "this Resort?", () => removeLocation(idForDelete))
        dispatch(triggeringModal(deleteMessage));
        setDataBsTarget("#DELETE");
        setIsDelete(true);
    }
    const openModalForSuccess = (action: string, idForDelete: number | string) => {
        const successMessage = ModalMessages("Success", action, () => deletingTheLocation(idForDelete))
        dispatch(triggeringModal(successMessage));
        setIsSuccess(true);
    }
    const deletingTheLocation = (idForDelete: number | string) => {
        let indexToDelete = locations.findIndex((location: LocationModel) => +location.id === +idForDelete);
        locations.splice(indexToDelete, 1);
        dispatch(updateLocationsStore(locations));
        history.push("/home");
    }

    const openModalForError = (error:AxiosError) => {
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

    const addFollow = async (locationId: number | string) => {
        try {
            await Axios.post<FollowerModel>(`http://localhost:3001/followers/${locationId}`);
            const IndexToDelete = locations.findIndex((location: LocationModel) => location.id === locationId);
            locations[IndexToDelete].userId = 1;
            locations[IndexToDelete].numOfFollowers = +locations[IndexToDelete].numOfFollowers + 1;
            sortLocation()
            dispatch(updateLocationsStore(locations));
        } catch (err) {
            setDataBsTarget("#Error-Message");
            openModalForError(err);
        }
    }

    const removeFollow = async (locationId: number | string) => {
        try {
            await Axios.delete<FollowerModel>(`http://localhost:3001/followers/${locationId}`);
            const IndexToDelete = locations.findIndex((location: LocationModel) => location.id === locationId);
            locations[IndexToDelete].userId = 0;
            locations[IndexToDelete].numOfFollowers = +(locations[IndexToDelete].numOfFollowers) - 1;
            sortLocation();
            dispatch(updateLocationsStore(locations));
        } catch (err) {
            setDataBsTarget("#Error-Message");
            openModalForError(err);
        }
    }

    const removeLocation = async (idForDelete: number | string) => {
        try {
            const result = await Axios.delete<string>(`http://localhost:3001/locations/${idForDelete}`);
            openModalForSuccess(result.data, idForDelete);
        } catch (err) {
            setDataBsTarget("#Error-Message");
            openModalForError(err);
        }
    };

    const sortLocation = () => {
        locations.sort((locationA: LocationModel, locationB: LocationModel) => {
            return locationB.userId - locationA.userId || locationB.numOfFollowers - locationA.numOfFollowers
        })
    }

    return (
        <div className="locations-item" key={location.id} style={{ position: 'relative' }}>
            <div style={{ display: location.userId === undefined ? 'none' : 'flex' }}>
                {isLogin && !isAdmin &&
                    <div className={location.userId === 1 ? "hover-content" : 'follow-hover-content'}
                        style={{ display: location.userId === undefined ? 'none' : 'flex' }}>
                        <button className={location.userId === 1 ? 'unfollow-btn' : 'follow-btn'}
                            onClick={() => toggleFollowButton(location.id)}>
                            <i className={`fas fa-heart ${location.userId === 1 ? "icon-heart" : "icon-heart-filled"}`}></i>
                        </button>
                    </div>
                }
                {isAdmin &&
                    <div className="hover-content-admin">
                        <button className="edit-and-remove-btns" id={`${location.id}`}
                            onClick={() => history.push(`/location/edit/${location.id}`)}>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button type="button" className="edit-and-remove-btns" id={`${location.id}`}
                            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { openModalForDelete(e.currentTarget.id) }}>
                            <i className="far fa-trash-alt"></i>
                        </button>
                    </div>
                }
            </div>
            <h3 >{location.resortName}</h3>
            <div className="resorts-image" >
                <img src={process.env.PUBLIC_URL + '/upload/resorts/' + location.image} alt="resort" />
            </div>
            <h6 className="destination" style={{ position: 'absolute', top: '170px', left: '6px' }}>
                {location.destination}
            </h6>
            <div className="dates-card">
                <h6>Start Date</h6>
                <h6>End Date</h6>
            </div>
            <div className="dates-card">
                <h6>{location.startDate}</h6>
                <h6>{location.endDate}</h6>
            </div>
            <div className="bottom-card">
                <button className="btn my-btn-description" type="button" data-bs-toggle="collapse"
                    data-bs-target={`#${location.image.replace('.', '-')}`} aria-expanded="false"
                    aria-controls={`${location.image.replace('.', '-')}`}>
                    <i className="fas fa-sort-down"></i>
                </button>
                <p className="price">{location.price}$</p>
                <span className="num-of-followers">{location.numOfFollowers}</span>
            </div>
            <div className="collapse" id={`${location.image.replace('.', '-')}`}>
                <div className="card card-body my-collapse">
                    <p>{location.description}</p>
                </div>
            </div>
            <button type="button" className="error-btn-modal" data-bs-toggle="modal" 
                data-bs-target={dataBsTarget} ref={triggeringModalRef}>
            </button>
        </div>
    );
};

export default LocationCard
