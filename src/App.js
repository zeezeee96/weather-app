import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Weatherdetails from "./pages/Weatherdetail";
import Home from "./pages/Home";
import { SearchBar } from "./components/Searchbar";
import { Container } from "@material-ui/core";

function App() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Container>
        <Router>
          <SearchBar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/details/:name/:id">
              <Weatherdetails />
            </Route>
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
