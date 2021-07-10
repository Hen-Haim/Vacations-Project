import "./EditingLocation.css";
import Axios, { AxiosError } from "axios";
import { LocationModel } from "../../../store/Models/LocationAndFollowerModel";
import { useForm } from "react-hook-form";
import { Link, useHistory, useParams } from "react-router-dom";
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { triggeringModal, removeUser } from "../../../store/Actions/actions";
import ModalMessages from "../../AppArea/ModalMessages/ModalMessages"


const EditingLocation = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  let locations: LocationModel[] = useSelector((state: RootStateOrAny) => state.locations);
  let location: LocationModel = locations.find(location => location.id === +id);

  const triggeringModalRef = useRef(null);
  const [dataBsTarget, setDataBsTarget] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [startDateValue, setStartDateValue] = useState<string>(location?.startDate.split("/").reverse().join("-"));

  useEffect(() => {
    if (isSuccess === true) {
      setTimeout(() => {
        setDataBsTarget("#Success");
        triggeringModalRef?.current?.click();
        return setIsSuccess(false);
      }, 400);
    }
    if (isDelete === true) {
      setDataBsTarget("#DELETE");
      triggeringModalRef?.current?.click();
      return setIsDelete(false)
    };
    if (isError === true) {
      setTimeout(() => {
        triggeringModalRef?.current?.click();
        return setIsError(false);
      }, 500);
    }
  }, [isDelete, isError, isSuccess]);

  const openModalForDelete = (idForDelete: number | string) => {
    const deleteMessage = ModalMessages("DELETE", "This Resort?", () => removeLocation(idForDelete))
    dispatch(triggeringModal(deleteMessage));
    setIsDelete(true);
  }
  const openModalForSuccess = (action: string) => {
    const successMessage = ModalMessages("Success", action, () => history.push("/home"))
    dispatch(triggeringModal(successMessage));
    setIsSuccess(true);
  }

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
    window.location.href = "http://localhost:3000/home";
  }

  const removeLocation = async (locationId: number | string) => {
    try {
      const result = await Axios.delete<string>(`http://localhost:3001/locations/${locationId}`);
      openModalForSuccess(result.data);
    } catch (err) {
      openModalForError(err);
    }
  }

  const submit = async (data: LocationModel) => {
    try {
      data.resortName = location.resortName;
      const result = await Axios.put<string>(`http://localhost:3001/locations/${id}`, data);
      openModalForSuccess(result.data);
      console.log(result.data)
    } catch (err) {
      openModalForError(err);
    }
  }

  return (
    <div className="edit-location">
      <form className="editing-location-form" onSubmit={handleSubmit(submit)}>
        <div className="editing-location-main-content">
          <div className="form-groups-editing-location">
            <h6>Resort Name:</h6>
            <h6>Destination:</h6>
            <h6>Description:</h6>
            <h6>Start Date:</h6>
            <h6>End Date:</h6>
            <h6>Image:</h6>
            <h6>Price:</h6>
          </div>
          <div className="form-groups-editing-location">
            <div className="form-group-editing-location"> {/* input for resortName */}
              <input defaultValue={location?.resortName} disabled {...register("resortName")} />
            </div>
            <div className="form-group-editing-location"> {/* input for destination */}
              <input defaultValue={location?.destination} {...register("destination", { required: true })} />
              {errors.destination ? <span className="err-msg">Missing Destination</span> : <span className="no-err"></span>}
            </div>
            <div className="form-group-editing-location"> {/* input for description */}
              <input defaultValue={location?.description} {...register("description", { required: true })} />
              {errors.description ? <span className="err-msg">Missing Description</span> : <span className="no-err"></span>}
            </div>
            <div className="form-group-editing-location"key={startDateValue}> {/* input for Start Date */}
              <input defaultValue={location?.startDate.split("/").reverse().join("-")} 
              onChange={(e)=>setStartDateValue(e.target.value)} {...register("startDate", { required: true })} type="date" />
              {errors.startDate ? <span className="err-msg">Missing Start Date</span> : <span className="no-err"></span>}
            </div>
            <div className="form-group-editing-location"> {/* input for End Date */}
              <input defaultValue={location?.endDate.split("/").reverse().join("-")} 
              {...register("endDate", { required: true })} type="date" min={startDateValue}/>
              {errors.endDate ? <span className="err-msg">Missing End Date</span> : <span className="no-err"></span>}
            </div>
            <div className="form-group-editing-location"> {/* input for image */}
              <input defaultValue={location?.image} {...register("image", { required: true })} />
              {errors.image ? <span className="err-msg">Missing Image</span> : <span className="no-err"></span>}
            </div>
            <div className="form-group-editing-location"> {/* input for price */}
              <input defaultValue={location?.price} {...register("price", { required: true })} type="number" min="1" max="999999" />
              {errors.price ? <span className="err-msg">Missing Price</span> : <span className="no-err"></span>}
            </div>
          </div>
        </div>
        <button type="submit" className="btn editing-btn" ><i className="fas fa-edit admin-editing-icon"></i>Update</button>
        <button type="button" className="btn btn-danger btn-delete" id={`${location?.id}`}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { openModalForDelete(e.currentTarget?.id) }}>
          <i className="far fa-trash-alt admin-deleting-icon"></i>Delete
        </button>
      </form>
      <div className="right-side-editing-location" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/upload/resorts/' + location?.image})` }}>
        <h1>Edit Location</h1>
        <div className="form-buttons-editing-location">
          <Link to="/home" className="admin-engaging-edit">
            <i className="fas fa-home admin-editing-icons"></i>
            <p className="text-btn">Home</p>
          </Link>
          <Link to="/location/add" className="admin-engaging-edit">
            <i className="fas fa-plus admin-editing-icons"></i>
            <p className="text-btn">Add</p>
          </Link>
        </div>
      </div>
      <button type="button" className="error-btn-modal" data-bs-toggle="modal"
        data-bs-target={dataBsTarget} ref={triggeringModalRef}>
      </button>
    </div>
  );

}

export default EditingLocation
