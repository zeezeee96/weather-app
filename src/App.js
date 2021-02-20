import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Weatherdetails from './pages/Weatherdetail';
import Home from './pages/Home';

 function App() {
   
  return (
    <Router>
      <div>
        <Switch>
        <Route exact path="/">
            <Home />
          </Route>
          <Route path="/details/:name/:id">
            <Weatherdetails/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
