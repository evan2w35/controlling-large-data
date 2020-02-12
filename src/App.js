import React from "react";
import logo from "./logo.svg";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Chunky from "./Chunking";
import Chunky2 from "./ChunkClass";


function App() {
  return (
    <div className="App">
      <ToastContainer
        closeButton={false}
        position="top-right"
        autoClose={false}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable={false}
        pauseOnHover
      />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Chunky />
        {/* <Chunky2 /> */}
      </header>
    </div>
  );
}

export default App;
