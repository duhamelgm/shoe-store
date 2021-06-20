import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Stores from "./Pages/Stores";
import Store from "./Pages/Store";
import Events from "./Pages/Events";
import Header from "./Components/Layout/Header";

function App() {
  return (
    <Router>
      <div className="bg-gray-200 min-h-screen">
        <Header />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/stores">
            <Stores />
          </Route>
          <Route exact path="/stores/:id">
            <Suspense fallback={<h2>Loading...</h2>}>
              <Store />
            </Suspense>
          </Route>
          <Route exact path="/events">
            <Suspense fallback={<h2>Loading...</h2>}>
              <Events />
            </Suspense>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
