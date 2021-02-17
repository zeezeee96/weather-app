import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Weatherdetails from './components/Weatherdetails';
import Home from './components/Home';

 function App() {
   
  return (
    <Router>
      <div>
        <Switch>
        <Route exact path="/">
            <Home />
          </Route>
          <Route path="/weatherdetails">
            <Weatherdetails/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
