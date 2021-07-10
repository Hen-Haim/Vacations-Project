import "./Settings.css";
import { UserDetails } from "./UserDetails/UserDetails";
import Axios, { AxiosError } from "axios";
import { useHistory } from "react-router-dom";
import { useState, useRef, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { triggeringModal, removeUser} from "../../../store/Actions/actions";
import ModalMessages from "../../AppArea/ModalMessages/ModalMessages";


const Settings = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const triggeringModalRef = useRef(null);

    const [dataBsTarget, setDataBsTarget] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    useEffect(() => {
        if (isSuccess === true) {
            setTimeout(() => {
                setDataBsTarget("#Success");
                triggeringModalRef?.current?.click();
                return setIsSuccess(false);
            }, 500);
        }
        if (isDelete === true) {
            triggeringModalRef?.current?.click();
            return setIsDelete(false)
        }
        if (isError === true) {
            setTimeout(() => {
                setDataBsTarget("#Error-Message");
                triggeringModalRef?.current?.click();
                return setIsError(false);
            }, 200)
        }
    }, [isError, isDelete, isSuccess])

    const deleteUser = async () => {
        try {
            const result = await Axios.delete<string>(`http://localhost:3001/users`);
            delete Axios.defaults.headers.common["Authorization"];
            openModalForSuccess(result.data)
        } catch (err) {
            openModalForError(err);
        }
    }

    const openModalForDelete = () => {
        const deleteMessage = ModalMessages("DELETE", "The Account?", () => deleteUser())
        dispatch(triggeringModal(deleteMessage));
        setDataBsTarget("#DELETE");
        setIsDelete(true);
    }

    const openModalForSuccess = (action: string) => {
        const successMessage = ModalMessages("Success", action, () => deletingUserAccount())
        dispatch(triggeringModal(successMessage));
        setIsSuccess(true);
        localStorage.removeItem("restOfDetails");
    }

    const deletingUserAccount = () => {
        history.push("/home");
        dispatch(removeUser());
    }

    const openModalForError = (error: AxiosError) => {
        const errorMessage = ModalMessages(error, "", () => { window.location.href = "http://localhost:3000/home" })
        dispatch(triggeringModal(errorMessage));
        setIsError(true);
    }

    return (
        <div className="Settings" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/upload/editing-user-pic.jpg'})` }}>
            <UserDetails />
            <div className="delete-user-div">
                <h6>To Delete This Account:</h6>
                <button type="button" className="btn btn-danger btn-delete-user" onClick={() => { openModalForDelete() }}>
                    <i className="far fa-trash-alt user-deleting-icon"></i>Delete User
                </button>
            </div>
            <button type="button" className="error-btn-modal" data-bs-toggle="modal"
                data-bs-target={dataBsTarget} ref={triggeringModalRef}>
            </button>
        </div>
    )
}

export default Settings
