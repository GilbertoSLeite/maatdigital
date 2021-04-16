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
import MiniDrawerMaat from './Componets/AppBar/appBarMaat';
import IsAuthenticated from './Componets/Functions/Login/LocalStorage/isAuthenticated';
import FooterSite from './Componets/Footer/Footer';

const isAuth = IsAuthenticated();
const hist = createBrowserHistory();
const pathname = hist.location.pathname;

const home = () => hist.replace('/maatdi-gital/home') || hist.push('/maatdigital/home')|| window.location.reload();
const login = () => hist.replace('/maatdigital/login') || hist.push('/maatdigital/login') || window.location.reload();

if (pathname === '/') {
  ((isAuth) ? home() : login() )
}

const FilterRoutes = (arrayRoutes) => ((pathname === arrayRoutes.path) ? (hist.push(arrayRoutes.path) || arrayRoutes) : null)

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
      <MiniDrawerMaat Main={<Main />}/>         
      <FooterSite />
  </React.Fragment>,
  document.getElementById('root')
);