import "./ProfilePic.css";

const ProfilePic = () => {
    const img1 = '/upload/profile-pic.jpg';
    const img2 = '/upload/profile-pic2.jpg';
    const img3 = '/upload/profile-pic3.jpg';
    const img4 = '/upload/profile-pic4.jpg';
    let images = [img1, img2, img3, img4];
    const index = Math.floor(Math.random() * 4);

    return (
        <div className="ProfilePic">
            <img src={process.env.PUBLIC_URL + images[index]} alt="Profile-Pic"></img>
        </div>
    )
}

export default ProfilePic
