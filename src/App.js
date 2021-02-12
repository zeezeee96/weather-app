import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Weatherdetails from './components/Weatherdetails';
import Fetchapi from './components/fetchapi';

 function App() {
   const [weatherdata, setWeatherData]=useState(""); 
  return (
    <Router>
      <div>
        <Switch>
        <Route exact path="/">
            <Home />
          </Route>
          <Route path="/weatherdetails">
            <Weatherdetails
            weatherdata={weatherdata}
            />
            <Fetchapi 
            onDetailsClick={(x)=>setWeatherData(x)}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
