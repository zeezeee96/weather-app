import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Weatherdetails from './components/Weatherdetails';
import Fetchapi from './components/fetchapi';

 function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/weatherdetails">Weatherdetails</Link>
            </li>
          </ul>
        </nav>

        <Switch>
        <Route exact path="/">
            <Home />
          </Route>
          <Route path="/weatherdetails">
            <Weatherdetails />
            <Fetchapi />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>This is the routing app. Switching two apps</h2>;
}
export default App;
