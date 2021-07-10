import "./PopUpModal.css";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { triggeringModal } from "../../../store/Actions/actions";
import { useState, useEffect } from 'react';


const PopUpModel = () => {
    let modalMessage = useSelector((state: RootStateOrAny) => state.modalMessage);
    const [isMessageSpacial, setIsMessageSpacial] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        if (modalMessage) {
            if (modalMessage.title === "Success" || modalMessage.httpCode === 619 || modalMessage.httpCode === 605) {
                return setIsMessageSpacial(true);
            }
        }
    }, [modalMessage])

    const removingErrorFromStore = () => {
        dispatch(triggeringModal({}));
        setIsMessageSpacial(false)
    }

    return (
        <div className="PopUpModal" >
            <div className="modal fade" id={`${modalMessage?.title}`} tabIndex={-1} aria-labelledby={`${modalMessage?.title}-Label`} aria-hidden="true">
                <div className="modal-dialog my-modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className={`modal-title ${modalMessage?.title==="Success" && "h5-success"}`} id={`${modalMessage?.title}-Label`}>{modalMessage?.title}</h5>
                            {!isMessageSpacial && <button type="button" className="btn-close btn-x" data-bs-dismiss="modal" aria-label="Close" onClick={removingErrorFromStore}>
                                <i className={`fas fa-times ${modalMessage?.title==="Success" ? "icon-x-success":"icon-x"}`}></i>
                            </button>}
                        </div>
                        <div className="modal-body my-modal-body">
                            {modalMessage?.message}
                        </div>
                        <div className="modal-footer">
                            {!isMessageSpacial && <button type="button" className="btn pop-left-btn"
                                data-bs-dismiss="modal" onClick={removingErrorFromStore}>{modalMessage?.buttonLeftText}
                            </button>}
                            <div onClick={removingErrorFromStore}>
                                <button type="button" className={`btn ${modalMessage?.title==="Success" ? "pop-right-btn-success":"pop-right-btn"}`} data-bs-dismiss="modal"
                                    onClick={modalMessage?.buttonRightFunc}>{modalMessage?.buttonRightText}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopUpModel