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
import MiniDrawerMaat from './componets/appBar/appBarMaat';
import IsAuthenticated from './functions/localstorage/isAuthenticated';
import FooterSite from './componets/footer/Footer';
import Login from './pages/login/login';

const isAuth = IsAuthenticated();
const hist = createBrowserHistory();
const pathname = hist.location.pathname;

if (pathname === '/') {
  ((isAuth) ? hist.replace('/maatdi-gital/home') || hist.push('/maatdigital/home') || window.location.reload() : hist.replace('/maatdigital/acessar') || hist.push('/maatdigital/acessar') || window.location.reload() )
}

const FilterRoutes = (arrayRoutes) => ((pathname === arrayRoutes.path) ? (hist.push(arrayRoutes.path) || hist.replace(arrayRoutes.path)  || arrayRoutes) : [])


const rotasPaginas = pageRoutes.map( x => x).filter(FilterRoutes);

const Main = () => ( 
  !isAuth ? <Login />  :
  <BrowserRouter>
    <Switch>
      {rotasPaginas.map((dados, chaves) => {
        if((!dados.loginPage) && (dados.private)){
        return(
          <Route 
            key={chaves}
            exact
            children={<dados.children />}
            path={dados.path}
          />              
        )}
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