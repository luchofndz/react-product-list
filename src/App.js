import './App.css';
import { DashboardMainView } from './components/DashboardMainView';
import { ProductView } from './components/ProductView';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/home" component={DashboardMainView}/>
          <Route path="/product/:id" component={ProductView}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
