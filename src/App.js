import React from 'react';
import SignUp from "./componentes/signUp";
import SignIn from "./componentes/signIn";
import MainMenu from "./componentes/mainMenu";
import PrivateRoute from "./componentes/privateRoute";
import ForgotPassword from "./componentes/forgotPassword";
import { AuthProvider } from "./fb_auth/fbAuthContext";
import { BrowserRouter as Router , Switch , Route , Redirect} from "react-router-dom";

function App(){
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/"> <Redirect to="/app" /> </Route>
            <PrivateRoute exact path="/app" component={MainMenu}/>
            <Route path="/signin" component={SignIn}/>
            <Route path="/signup" component={SignUp} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;