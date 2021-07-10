import "./Footer.css";
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { triggeringModal } from "../../../store/Actions/actions";
import ModalMessages from "../../AppArea/ModalMessages/ModalMessages"


const Footer = () => {
    let userDetails = useSelector((state: RootStateOrAny) => state.restOfDetails);
    let isLogin: boolean = userDetails.isAdmin !== undefined ?  true : false;
    
    const dispatch = useDispatch();
    const history = useHistory();
    const triggeringModalRef = useRef(null);
    const [isError, setIsError] = useState<boolean>(false);

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
        <div className="Footer">
            <div className="footer-main-content">
                <div>
                    <h5>My Other Projects:</h5>
                    <h6>My Notes Memory</h6>
                    <h6>Coins Around The World</h6>
                    <h6>Others</h6>
                </div>
                <div>
                    <h5>Quotes Of The Day:</h5>
                    <h6>Don't Forget To Love Yourself</h6>
                    <h6>Be Happy Even If It's Hard</h6>
                </div>
                <div>
                    <h5 className="other-links">Other Links:</h5>
                    <div>
                        <button type="button" className='my-footer-btn footer-btn' onClick={!isLogin ? () => { openModalForError() }
                                : () => history.push('/settings')} >Settings
                        </button>
                    </div>
                    <div>
                        <button type="button" className='my-footer-btn footer-btn' onClick={!isLogin ? () => { openModalForError() }
                                : () => history.push('/top-followers')}>Top Followers
                        </button>
                    </div>
                    <div>
                        <button type="button" className='my-footer-btn footer-btn' onClick={!isLogin ? () => { openModalForError() }
                                : () => history.push('/recently-added')}>Recently Added
                        </button>
                    </div>
                </div>
                <div className="contact-me">
                    <h4>Contact Me</h4>
                    <div className="footer-inputs">
                        <i className="far fa-envelope contact-icons"></i>
                        <input type="text" placeholder="Enter Email" />
                        <i className="far fa-comment contact-icons"></i>
                        <textarea placeholder="Message"></textarea>
                    </div>
                </div>
            </div>
            <hr />
            <div className="container-for-icons">
                <Link className="link-for-footer-icons" target='_blank' to="https://github.com/Hen-Haim">
                    <i className="fab fa-github footer-icons"></i>
                </Link>
                <Link className="link-for-footer-icons" target='_blank' to="https://www.facebook.com/Henushnush">
                    <i className="fab fa-facebook footer-icons"></i>
                </Link>
                <Link className="link-for-footer-icons" target='_blank' to="https://www.instagram.com/Henushnush">
                    <i className="fab fa-instagram footer-icons"></i>
                </Link>
                <Link className="link-for-footer-icons" target='_blank' to="https://www.linkedin.com/in/hen-haim-51569315a">
                    <i className="fab fa-linkedin footer-icons"></i>
                </Link>
            </div>
            <div className="div-for-all-rights">
                <i className="far fa-copyright all-rights"></i>
                <h6>All Rights Reserved</h6>
            </div>
            <button type="button" className="error-btn-modal" data-bs-toggle="modal"
                data-bs-target="#Unregistered-User" ref={triggeringModalRef}>
            </button>
        </div>
    )
}

export default Footer
