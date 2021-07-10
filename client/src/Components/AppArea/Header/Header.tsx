import "./Header.css"
import Headline from "../../HeaderArea/Headline/Headline";
import Navbar from "../../HeaderArea/Navbar/Navbar";
import ProfilePic from "../../HeaderArea/ProfilePic/ProfilePic";


const Header = () => {
    return (
        <div className="Header">
            <Headline />
            <ProfilePic />
            <Navbar />
        </div>
    )
}

export default Header
