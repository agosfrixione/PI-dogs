import './App.css';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import Form from './vistas/Form';
import Home from './vistas/Home';
import Detail from './vistas/Detail';
import LandingPage from './vistas/LandingPage'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
     <Switch>
     <Route exact path='/' component={LandingPage}/>
     <Route path='/home' component={Home}/>
     <Route path='/create' component={Form}/>
     <Route path='/dogs/:id' component={Detail}/>
     </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
