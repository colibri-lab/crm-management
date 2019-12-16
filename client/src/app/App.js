import React from "react";
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from "../reducers";
import { Switch, Route } from "react-router-dom";
import Home from "./home/homeContainer/Home";
import NotFound from "./home/NotFound/NotFound";
import LoginContainer from "./home/authentification/loginContainer/LoginContainer";
import RegisterContainer from "./home/authentification/registerContainer/RegisterContainer";


const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={LoginContainer} />
          <Route path="/register" component={RegisterContainer} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App
