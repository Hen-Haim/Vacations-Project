import "./AddingLocation.css";
import { LocationModel } from "../../../store/Models/LocationAndFollowerModel";
import Axios, { AxiosError } from "axios";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { triggeringModal, removeUser } from "../../../store/Actions/actions";
import ModalMessages from "../../AppArea/ModalMessages/ModalMessages"


const AddingLocation = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LocationModel>();
    let history = useHistory();
    const dispatch = useDispatch();

    const triggeringModalRef = useRef(null);
    const [dataBsTarget, setDataBsTarget] = useState<string>('');
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [startDateValue, setStartDateValue] = useState<string>('');

    useEffect(() => {
        if (isError === true) {
            setDataBsTarget("#Error-Message");
            triggeringModalRef?.current?.click();
            return setIsError(false);
        }
        if (isSuccess === true) {
            setTimeout(() => {
                setDataBsTarget("#Success");
                triggeringModalRef?.current?.click();
                return setIsSuccess(false);
            }, 200);
        }
    }, [isSuccess, isError]);

    const openModalForError = (error: AxiosError) => {
        if (error.response.status === 619 || error.response.status === 605) {
            const errorMessage = ModalMessages(error, "", () => { functionForModalRightButton() }, error.response.status)
            dispatch(triggeringModal(errorMessage))

        } else {
            const errorMessage = ModalMessages(error, "", () => { window.location.href = "http://localhost:3000/home" })
            dispatch(triggeringModal(errorMessage));
        }
        setDataBsTarget("#Error-Message");
        setIsError(true);
    }

    const functionForModalRightButton = () => {
        localStorage.removeItem("restOfDetails");
        delete Axios.defaults.headers.common["Authorization"];
        dispatch(removeUser());
    }

    const openModalForSuccess = (action: string) => {
        const successMessage = ModalMessages("Success", action, () => history.push("/home"))
        dispatch(triggeringModal(successMessage));
        setIsSuccess(true);
    };

    const submit = async (data: LocationModel) => {
        try {
            const result = await Axios.post<string>("http://localhost:3001/locations", data);
            openModalForSuccess(result.data);
        } catch (err) {
            openModalForError(err);
        }
    };

    return (
        <div className="add-location">
            <form className="adding-location-form" onSubmit={handleSubmit(submit)}>
                <div className="adding-location-main-content">
                    <div className="form-groups-adding-location">
                        <h6>Resort Name:</h6>
                        <h6>Destination:</h6>
                        <h6>Description:</h6>
                        <h6>Start Date:</h6>
                        <h6>End Date:</h6>
                        <h6>Image:</h6>
                        <h6>Price:</h6>
                    </div>
                    <div className="form-groups-adding-location"> {/* input for resortName */}
                        <div className="form-group-adding-location">
                            <input {...register("resortName", { required: true })} />
                            {errors.resortName ? <span className="err-msg">Missing Resort Name</span> : <span className="no-err"></span>}
                        </div>
                        <div className="form-group-adding-location"> {/* input for destination */}
                            <input {...register("destination", { required: true })} />
                            {errors.destination ? <span className="err-msg">Missing Destination</span> : <span className="no-err"></span>}
                        </div>
                        <div className="form-group-adding-location"> {/* input for description */}
                            <input {...register("description", { required: true })} />
                            {errors.description ? <span className="err-msg">Missing Description</span> : <span className="no-err"></span>}
                        </div>
                        <div className="form-group-adding-location"> {/* input for Start Date */}
                            <input {...register("startDate", { required: true })} type="date" onChange={(e)=>setStartDateValue(e.target.value)}/>
                            {errors.startDate ? <span className="err-msg">Missing Start Date</span> : <span className="no-err"></span>}
                        </div>
                        <div className="form-group-adding-location"> {/* input for End Date */}
                            <input {...register("endDate", { required: true })} type="date" min={startDateValue}/>
                            {errors.endDate ? <span className="err-msg">Missing End Date</span> : <span className="no-err"></span>}
                        </div>
                        <div className="form-group-adding-location"> {/* input for image */}
                            <input {...register("image", { required: true })} />
                            {errors.image ? <span className="err-msg">Missing Image</span> : <span className="no-err"></span>}
                        </div>
                        <div className="form-group-adding-location"> {/* input for price */}
                            <input {...register("price", { required: true })} type="number" min="1" max="999999" />
                            {errors.price ? <span className="err-msg">Missing Price</span> : <span className="no-err"></span>}
                        </div>
                    </div>
                </div>
                <button className="btn adding-btn"><i className="fas fa-plus admin-adding-icon"></i>Add</button>
            </form>
            <div className="right-side-adding-location" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/upload/adding-location-pic.jpg'})` }}>
                <div className="right-side-adding">
                    <h1>A New Location</h1>
                    <div className="form-buttons-adding-location">
                        <Link to="/home" className="admin-engaging-add">
                            <i className="fas fa-home admin-to-add-icon"></i>
                            <p className="text-btn-home">Home</p>
                        </Link>
                    </div>
                </div>
            </div>
            <button type="button" className="error-btn-modal" data-bs-toggle="modal"
                data-bs-target={dataBsTarget} ref={triggeringModalRef}>
            </button>
        </div>
    );

}

export default AddingLocation
