import { UserModel, RestOfDetailsModel } from "../../../store/Models/UserModel";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Axios, { AxiosError } from "axios";
import "./Register.css";
import { useState, useRef, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { triggeringModal, login } from "../../../store/Actions/actions";
import ModalMessages from "../../AppArea/ModalMessages/ModalMessages"


const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<UserModel>();
    const history = useHistory();
    const dispatch = useDispatch();

    const triggeringModalRef = useRef(null);
    const [dataBsToggle, setDataBsToggle] = useState<string>('');
    const [dataBsTarget, setDataBsTarget] = useState<string>('');
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isError, setIsError] = useState(false);

    const loginFunc = async (data: UserModel) => {
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

    const submit = async (data: UserModel) => {
        try {
            const result = await Axios.post<string>("http://localhost:3001/users", data);
            const loginDetails = { userName: data.userName, password: data.password }
            openModalForSuccess(result.data, loginDetails);
        } catch (err) {
            openModalForError(err);
        }
    };
    const openModalForSuccess = (action: string, loginDetails: UserModel) => {
        const successMessage = ModalMessages("Success", `${action}, You will now be automatically logged-in`, () => loginFunc(loginDetails))
        dispatch(triggeringModal(successMessage));
        setIsSuccess(true);
    }

    const openModalForError = (error: AxiosError) => {
        const errorMessage = ModalMessages(error, "", () => { window.location.href = "http://localhost:3000/home" })
        dispatch(triggeringModal(errorMessage));
        setDataBsTarget("#Error-Message");
        setDataBsToggle("modal");
        setIsError(true);
    }

    useEffect(() => {
        if (isError === true) {
            triggeringModalRef?.current?.click();
            return setIsError(false);
        }
        if (isSuccess === true) {
            setTimeout(() => {
                setDataBsTarget("#Success");
                setDataBsToggle("modal");
                triggeringModalRef?.current?.click();
                return setIsSuccess(false);
            }, 200);
        }
    }, [isSuccess, isError]);

    return (
        <div className="Register">
            <div className="register-main-content">
                <h3> Register </h3>
                <form className="form-submit" onSubmit={handleSubmit(submit)}>
                    <div className="form-groups">
                        <div className="form-group"> {/* input for userName */}
                            <input {...register("userName", { required: true })} placeholder="Username:" />
                            {errors.userName ? <span className="err-msg">Missing Username</span> : <span className="no-err"></span>}
                        </div>
                        <div className="form-group"> {/* input for First Name */}
                            <input {...register("firstName", { required: true })} placeholder="First Name:" />
                            {errors.firstName ? <span className="err-msg">Missing First Name</span> : <span className="no-err"></span>}
                        </div>
                        <div className="form-group"> {/* input for Last Name */}
                            <input {...register("lastName", { required: true })} placeholder="Last Name:" />
                            {errors.lastName ? <span className="err-msg">Missing Last Name</span> : <span className="no-err"></span>}
                        </div>
                        <div className="form-group"> {/* input for Password */}
                            <input {...register("password", { required: true })} placeholder="Password:" />
                            {errors.password ? <span className="err-msg">Missing Password</span> : <span className="no-err"></span>}
                        </div>
                    </div>
                    <button type="submit" className="btn users-btn">Join Me <i className="fas fa-user-plus users-icon"></i> </button>
                </form>
            </div>
            <div className="right-side-register">
                <div id="carouselExampleControls" className="carousel slide my-carousel" data-bs-ride="carousel">
                    <div className="carousel-inner my-carousel-inner">
                        <div className="carousel-item active">
                            <img src={process.env.PUBLIC_URL + '/upload/profile-pic.jpg'} alt="Profile-Pic" className="d-block w-100" />
                        </div>
                        <div className="carousel-item">
                            <img src={process.env.PUBLIC_URL + '/upload/profile-pic2.jpg'} alt="Profile-Pic" className="d-block w-100" />
                        </div>
                        <div className="carousel-item">
                            <img src={process.env.PUBLIC_URL + '/upload/profile-pic3.jpg'} alt="Profile-Pic" className="d-block w-100" />
                        </div>
                        <div className="carousel-item">
                            <img src={process.env.PUBLIC_URL + '/upload/profile-pic4.jpg'} alt="Profile-Pic" className="d-block w-100" />
                        </div>
                    </div>
                </div>
                <h1>Come Join Me!</h1>
                <h5>Already A User?</h5>
                <div className="form-buttons">
                    <Link to="/home" className="user-register">
                        <i className="fas fa-home user-register-icon"></i>
                        <p className="text-btn">Home</p>
                    </Link>
                    <Link to="/login" className="user-register">
                        <i className="fas fa-sign-in-alt user-register-icon"></i>
                        <p className="text-btn">Login</p>
                    </Link>
                </div>
            </div>
            <button type="button" className="error-btn-modal" data-bs-toggle={dataBsToggle}
                data-bs-target={dataBsTarget} ref={triggeringModalRef}>
            </button>
        </div>
    );
}

export default Register
