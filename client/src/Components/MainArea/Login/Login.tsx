import "./Login.css";
import Axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { UserModel, RestOfDetailsModel } from "../../../store/Models/UserModel";
import { Link, useHistory } from "react-router-dom";
import { useState, useRef, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { triggeringModal, login } from "../../../store/Actions/actions";
import ModalMessages from "../../AppArea/ModalMessages/ModalMessages"


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const history = useHistory();
    const dispatch = useDispatch();

    const triggeringModalRef = useRef(null);
    const [isError, setIsError] = useState(false);

    const submit = async (data: UserModel) => {
        try {
            const result = await Axios.post<RestOfDetailsModel>(`http://localhost:3001/users/login`, data);
            dispatch(login(result.data));
            Axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;
            localStorage.setItem("restOfDetails", JSON.stringify(result.data));
            history.push("/home");
        } catch (err) {
            openModalForError(err);
        }
    }

    const openModalForError = (error: AxiosError) => {
        const errorMessage = ModalMessages(error, "", () => { window.location.href = "http://localhost:3000/home" })
        dispatch(triggeringModal(errorMessage));
        setIsError(true);
    }

    useEffect(() => {
        if (isError === true) {
            triggeringModalRef?.current?.click();
            return setIsError(false)
        }
    }, [isError])

    return (
        <div className="Login" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/upload/login-pic2.jpg'})` }}>
            <div className="login-main-content" >
                <h3>Login</h3>
                <form className="form-submit-login" onSubmit={handleSubmit(submit)}>
                    <div className="form-groups-login">
                        <div className="form-group-login"> {/* input for userName */}
                            <input {...register("userName", { required: true })} placeholder="Username:" />
                            {errors.userName ? <span className="err-msg">Missing Username</span> : <span className="no-err"></span>}
                        </div>
                        <div className="form-group-login"> {/* input for password */}
                            <input {...register("password", { required: true })} placeholder="Password:" />
                            {errors.password ? <span className="err-msg">Missing Password</span> : <span className="no-err"></span>}
                        </div>
                    </div>
                    <button type="submit" className="btn login-btn"><i className="fas fa-sign-in-alt logging-in-icon"></i>Login</button>
                </form>
            </div>
            <div className="right-side-login">
                <h1>Start Your Vacation!</h1>
                <p>{`It's Fun :)`}</p>
                <h5>Not Register Yet?</h5>
                <div className="form-buttons-login">
                    <Link to="/home" className="admin-engaging-login">
                        <i className="fas fa-home admin-login-icon"></i>
                        <p className="text-btn">Home</p>
                    </Link>
                    <Link to="/register" className="admin-engaging-login">
                        <i className="fas fa-user-plus admin-login-icon"></i>
                        <p className="text-btn">Register</p>
                    </Link>
                </div>
            </div>
            <button type="button" className="error-btn-modal" data-bs-toggle="modal"
                data-bs-target="#Error-Message" ref={triggeringModalRef}>
            </button>
        </div>
    );

}

export default Login
