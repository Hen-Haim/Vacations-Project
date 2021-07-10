import "./Main.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Statistics from "../../MainArea/Statistics/Statistics";
import Home from '../../MainArea/Home/Home';
import AddingLocation from '../../MainArea/AddingLocation/AddingLocation';
import EditingLocation from '../../MainArea/EditingLocation/EditingLocation';
import Login from '../../MainArea/Login/Login';
import Register from '../../MainArea/Register/Register';
import RecentlyAdded from '../../MainArea/RecentlyAdded/RecentlyAdded';
import Search from '../../MainArea/Search/Search';
import Settings from '../../MainArea/Settings/Settings';
import TopFollowers from '../../MainArea/TopFollowers/TopFollowers';
import { useSelector, RootStateOrAny } from "react-redux";


const Main = () => {
    let userDetails = useSelector((state: RootStateOrAny) => state.restOfDetails);
    let isLogin: boolean = userDetails.isAdmin !== undefined ?  true : false;
    let isAdmin: boolean = userDetails.isAdmin === 1 ? true : false;

    return (
        <div className="Main">
            <Switch>
                <Route exact path="/home"><Home /></Route>
                <Route exact path="/login"><Login /></Route>
                <Route exact path="/register"><Register /></Route>
                <Route exact path={isLogin ? "/location/add" : "/home"}><AddingLocation /></Route>
                <Route exact path={isLogin ? "/location/edit/:id" : "/home"}><EditingLocation /></Route>
                <Route exact path={isLogin ? "/recently-added" : "/home"}><RecentlyAdded /></Route>
                <Route exact path={isLogin ? "/top-followers" : "/home"}><TopFollowers /></Route>
                <Route exact path={isAdmin ? "/statistics" : "/home"}><Statistics /></Route>
                <Route exact path="/settings" ><Settings /></Route>
                <Route exact path="/search/:value"><Search /></Route>
                <Redirect from="/" to="/home" exact />
                <Route><Home /></Route>
            </Switch>
        </div>
    )
}

export default Main
