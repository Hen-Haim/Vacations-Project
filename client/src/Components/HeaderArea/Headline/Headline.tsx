import "./Headline.css";
import { Link } from "react-router-dom";
import { useSelector, RootStateOrAny } from "react-redux";


const Headline = () => {
    let userDetails = useSelector((state: RootStateOrAny) => state.restOfDetails);
    let isLogin: boolean = userDetails.isAdmin !== undefined ?  true : false;

    return (
        <div className="Headline">
            <h1>Travl'Wid'U</h1>
            {!isLogin &&
                <div>
                    <Link className="login-link" to="/login">Login</Link>
                    <Link className="register-link" to="/register">Register</Link>
                </div>
            }
        </div>
    )

}

export default Headline
