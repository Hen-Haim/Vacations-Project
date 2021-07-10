import "./Navbar.css";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { useState, useRef, useEffect } from 'react';
import { triggeringModal, removeUser } from "../../../store/Actions/actions";
import ModalMessages from "../../AppArea/ModalMessages/ModalMessages"


const Navbar = () => {
    let userDetails = useSelector((state: RootStateOrAny) => state.restOfDetails);
    const [inputSearchTyping, setInputSearchTyping] = useState("");

    const dispatch = useDispatch()
    const history = useHistory();
    let isLogin: boolean = userDetails.isAdmin !== undefined ?  true : false;
    let isAdmin: boolean = userDetails.isAdmin === 1 ? true : false;
    let userName: string = isLogin ? userDetails.userName : "Unregistered User";

    const triggeringModalRef = useRef(null);
    const [isError, setIsError] = useState<boolean>(false);

    const gettingTheValue = (valueFromInput: string) => {
        setInputSearchTyping(valueFromInput);
    }

    const makeUserLogout = () => {
        dispatch(removeUser());
        delete Axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("restOfDetails");
        window.location.reload();
    }

    const openModalForError = () => {
        setIsError(true)
        const errorMessage = ModalMessages("Unregistered-User", '', () => history.push('/login'))
        dispatch(triggeringModal(errorMessage));
    }

    useEffect(() => {
        if (isError === true) {
            triggeringModalRef?.current?.click();
            return setIsError(false)
        }
    }, [isError])

    return (
        <div className="Navbar">
            <nav className="navbar navbar-expand-lg navbar-light navbar-main">
                <ul className="navbar-nav mr-auto my-btn-nav">
                    <li className="nav-item">
                        <Link className="btn my-btn" to="/home">Home</Link>
                    </li>
                    <button type="button" className='btn my-btn' onClick={!isLogin ? () => { openModalForError() }
                        : () => history.push('/top-followers')}>Top Followers
                    </button>
                    <button type="button" className='btn my-btn' onClick={!isLogin ? () => { openModalForError() }
                        : () => history.push('/recently-added')}>Recently Added
                    </button>
                    {isAdmin &&
                        <li className="nav-item mr-sm-1">
                            <Link className="btn my-btn" to="/statistics">Statistics</Link>
                        </li>
                    }
                    <li className="nav-item mr-sm-3 my-li-search">
                        <span className="fas fa-search icon"></span>
                        <input className="form-control input-search" onChange={(e) => gettingTheValue(e.target.value)}
                            type="search" placeholder="Search by resort name or country" aria-label="Search" />
                    </li>
                    <li className="nav-item">
                        <Link className="btn my-btn" type="submit" to={`/search/${inputSearchTyping}`}>Search</Link>
                    </li>
                </ul>
                <ul className="navbar-nav my-nav-drop">
                    <li className="nav-item dropdown nav-dropdown">
                        <button className="nav-link btn dropdown-toggle btn-drop-down" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            {userName}
                        </button>
                        <ul className={`my-btn-drop-ul dropdown-menu ${!isLogin && 'disabled'}`} aria-labelledby="navbarDropdown">
                            <li><button type="button" className='dropdown-item my-btn-drop'
                                onClick={!isLogin ? () => { openModalForError() }
                                    : () => history.push('/settings')} >Settings
                            </button></li>
                            {isLogin && <>
                                <li><hr className="dropdown-divider" /></li>
                                <li onClick={makeUserLogout}>
                                    <Link className="dropdown-item my-btn-drop" to="/home">Logout</Link>
                                </li>
                            </>}
                        </ul>
                    </li>
                </ul>
            </nav>
            <button type="button" className="error-btn-modal" data-bs-toggle="modal"
                data-bs-target="#Unregistered-User" ref={triggeringModalRef}>
            </button>
        </div>
    );
}

export default Navbar
