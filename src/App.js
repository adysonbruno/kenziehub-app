import Routes from "./Routes";
import GlobalStyle from "./Styles/global"

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

const App = () => {
  return (
    <div className="App">
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
        <Routes/>
        <GlobalStyle/>
    </div>
  );
}

export default App;
