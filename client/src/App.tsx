import './App.css';
import Footer from './Components/AppArea/Footer/Footer';
import Header from './Components/AppArea/Header/Header';
import { BrowserRouter } from "react-router-dom";
import Main from './Components/AppArea/Main/Main';
import PopUpModel from "./Components/AppArea/PopUpModal/PopUpModal";


function App() {

  const imgStyle = () => {
    return `url(${process.env.PUBLIC_URL + '/upload/background-photo.jpg'})`
  }

  return (
    <BrowserRouter>
      <div style={{ backgroundImage: imgStyle() }} className="App">

        <header>
          <Header />
        </header>

        <main>
          <Main />
        </main>

        <footer>
          <Footer />
        </footer>
        
        <PopUpModel />

      </div>
    </BrowserRouter>
  );
}

export default App;
