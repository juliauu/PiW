import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import MainPage from "./components/MainPage";
import HotelPage from "./components/HotelPage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/hotel/:id" component={HotelPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
