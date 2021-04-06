import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import { CssBaseline } from '@material-ui/core';
import pageRoutes from './router';
import AppBarSys from './Componets/AppBar/appBarMaat';

const hist = createBrowserHistory();
const pathname = hist.location.pathname;

if (pathname === '/') {
  hist.replace('/maatdigital/home');
  hist.push('/maatdigital/home');
  window.location.reload();
};

function FilterRoutes(value) {
    if (pathname === (value.path)) {
        return value
    }
};

const rotasPaginas = pageRoutes.map( x => x).filter(FilterRoutes);

const Main = () => ( 
  <BrowserRouter>
    <Switch>
      {rotasPaginas.map((dados, chaves) => {
        return(
          <Route 
            key={chaves}
            exact
            children={<dados.children />}
            path={dados.path}
          />
        )
      })}
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
      <AppBarSys />
      <Main /> 
  </React.Fragment>,
  document.getElementById('root')
);