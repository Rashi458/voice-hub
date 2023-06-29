import LoginForm from "./components/LoginForm";
import { Redirect, Route, Switch } from "react-router-dom";
import Profile from "./components/Profile";
import Feeds from "./components/Feeds";
import SignUp from "./components/SignUp";
import startScreen from "./components/startScreen"
import PasswordReset from "./components/PasswordReset";
import Userhandle from "./components/Userhandle";
import './style/index.css'
function App() {
  return (
    <Switch>
      <Route path="/start" component={startScreen}></Route>
      <Route path="/feeds" component={Feeds}></Route>
      <Route path="/profile" component={Profile}></Route>
      <Route path="/userhandle" component={Userhandle}></Route>
      <Route path="/resetpassword" component={PasswordReset}></Route>
      <Route path="/signup" component={SignUp}></Route>
      <Route path="/login" component={LoginForm}></Route>
      <Redirect to="/start" from="/"></Redirect>
      <Route exact="true" path="/"></Route>
    </Switch>
  );
}

export default App;
