//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

// include your styles into the webpack bundle
import "../styles/index.css";

//import your own components
import Home from "./component/home.jsx";

//render your react application
ReactDOM.render(<Home username="Elizabeth"/>, document.querySelector("#app"));

const App=(props)=>{

    return (
        <div className="App">
            <span className="title">Todo</span> <br />
          <Home  />
        </div>
    )
}

export default App;