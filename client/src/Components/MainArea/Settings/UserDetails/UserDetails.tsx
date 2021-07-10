import "./UserDetails.css";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { UserModel } from "../../../../store/Models/UserModel";
import { useForm } from "react-hook-form";
import Axios, { AxiosError } from "axios";
import { useHistory } from "react-router-dom";
import { useState, useRef, useEffect } from 'react';
import { triggeringModal, removeUser, login, updateUser } from "../../../../store/Actions/actions";
import ModalMessages from "../../../AppArea/ModalMessages/ModalMessages"


export const UserDetails = () => {
    let user: UserModel = useSelector((state: RootStateOrAny) => state.user);
    const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch();
    const history = useHistory();

    const triggeringModalRef = useRef(null);
    const [dataBsTarget, setDataBsTarget] = useState<string>('');
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    useEffect(() => {
        takingFromLocalStorage();
        getUserDetails();
    }, [])

    const takingFromLocalStorage = () => {
        const userDetailsFromStorage = JSON.parse(localStorage.getItem("restOfDetails"));
        Axios.defaults.headers.common['Authorization'] = `Bearer ${userDetailsFromStorage.token}`;
        dispatch(login(userDetailsFromStorage));
    }

    useEffect(() => {
        if (isSuccess === true) {
            setTimeout(() => {
                setDataBsTarget("#Success");
                triggeringModalRef?.current?.click();
                return setIsSuccess(false);
            }, 400);
        }
        if (isError === true) {
            setTimeout(() => {
                triggeringModalRef?.current?.click();
                return setIsError(false);
            }, 400)
        }
    }, [isError, isSuccess])

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

    const openModalForSuccess = (action: string, data: UserModel) => {
        const successMessage = ModalMessages("Success", action, () => updatingUserSuccess(data))
        dispatch(triggeringModal(successMessage));
        setIsSuccess(true);
    }

    const updatingUserSuccess = (data: UserModel) => {
        dispatch(updateUser(data));
        history.push("/home");
    }

    const submit = async (data: UserModel) => {
        try {
            const result = await Axios.put<string>(`http://localhost:3001/users`, data);
            openModalForSuccess(result.data, data);
        } catch (err) {
            setDataBsTarget("#Error-Message");
            openModalForError(err);
        }
    }

    const getUserDetails = async () => {
        try {
            const result = await Axios.get<UserModel>(`http://localhost:3001/users`);
            dispatch(updateUser(result.data));

        } catch (err) {
            setDataBsTarget("#Error-Message");
            openModalForError(err);
        }
    }

    return (
        <div className="edit-user" >
            <div className="user-details-headline"><h4>Hello </h4><h3>{user?.userName}</h3></div>
            <form className="editing-user-form" onSubmit={handleSubmit(submit)}>
                <div className="editing-user-main-content">
                    <div className="form-groups-editing-user">
                        <h6>First Name:</h6>
                        <h6>Last Name:</h6>
                        <h6>Password:</h6>
                    </div>
                    <div className="form-groups-editing-user">
                        <div className="form-group-editing-user"> {/* input for First Name */}
                            <input defaultValue={user?.firstName} {...register("firstName", { required: true })} />
                            {errors.firstName ? <span className="err-msg">Missing First Name</span> : <span className="no-err"></span>}
                        </div>
                        <div className="form-group-editing-user"> {/* input for Last Name */}
                            <input defaultValue={user?.lastName} {...register("lastName", { required: true })} />
                            {errors.lastName ? <span className="err-msg">Missing Last Name</span> : <span className="no-err"></span>}
                        </div>
                        <div className="form-group-editing-user"> {/* input for Password */}
                            <input {...register("password", { required: true })} />
                            {errors.password ? <span className="err-msg">Missing Password</span> : <span className="no-err"></span>}
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn editing-user-btn">
                    <i className="fas fa-edit user-editing-icon"></i>Update
                </button>
            </form>
            <button type="button" className="error-btn-modal" data-bs-toggle="modal"
                data-bs-target={dataBsTarget} ref={triggeringModalRef}>
            </button>
        </div>
    );
}


