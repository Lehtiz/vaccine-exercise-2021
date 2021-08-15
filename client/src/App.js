import {
  React, lazy, Suspense,
} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';

const Home = lazy(() => import('./pages/home'));
const Orders = lazy(() => import('./pages/orders'));
const Vaccinations = lazy(() => import('./pages/vaccinations'));

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="bg-background-under pt-12 text-textcolor">Loading...</div>
        }
      >
        <Switch>
          <Route exact path={ROUTES.HOME} component={Home} />
          <Route path={ROUTES.ORDERS} component={Orders} />
          <Route path={ROUTES.VACCINATIONS} component={Vaccinations} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
