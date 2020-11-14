import './App.css';
import { DashboardMainView } from './components/Dashboard';
import { ProductView } from './components/productView';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/productList" component={DashboardMainView}/>
          <Route path="/product" component={ProductView}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
