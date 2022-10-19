import './App.css';
import {BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import Home from "./components/Home.jsx";
import DogCreate from "./components/DogCreate.jsx"; 
import Detail from "./components/Detail.jsx";


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= "/" component= {LandingPage}/>
        <Route exact path= "/home" component= {Home}/>
        <Route exact path= "/dog" component= {DogCreate} />
        <Route exact path= '/home/detail/:id' component= {Detail} />
        
      </Switch>
    
    </div>
    </BrowserRouter>
  );
}

export default App;
