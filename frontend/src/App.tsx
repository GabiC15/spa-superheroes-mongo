import Create from "./pages/Create";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <div>
        <Router>
          <Switch>
            <Route path="/superheroes/:id" component={Detail} />
            <Route path="/edicion/:id" component={Create} />
            <Route path="/marvel" component={Home} exact />
            <Route path="/dc" component={Home} exact />
            <Route path="/" component={Home} exact />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
